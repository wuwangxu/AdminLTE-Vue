<!--
 *
 *  新增和修改都将跳转到该组件,在beforeMount(组件挂载之前),通过路由参数去判断是新增还是修改
 *
 -->
<template>
  <div id="tableTest2" class="content-wrapper container" style="min-height:auto">
    <div class="row">
      <div class="col-md-6">
        <!-- Horizontal Form -->
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">{{viewType}}</h3>
          </div>
          <!-- /.box-header -->
          <!-- form start -->
          <form class="form-horizontal">
            <div class="box-body">
              <div class="form-group">
                <label for="code" class="col-sm-3 control-label">编号</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="code" placeholder="请输入编号" v-model="table2Form.code">
                </div>
              </div>
              <div class="form-group">
                <label for="name" class="col-sm-3 control-label">名称</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="name" placeholder="请输入名称" v-model="table2Form.name">
                </div>
              </div>
              <div class="form-group">
                <label for="sdollar" class="col-sm-3 control-label">当前美元</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="sdollar" placeholder="请输入名称" v-model="table2Form.sdollar">
                </div>
              </div>
              <div class="form-group">
                <label for="srmb" class="col-sm-3 control-label">当前人民币</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="srmb" placeholder="请输入名称" v-model="table2Form.srmb">
                </div>
              </div>
              <div class="form-group">
                <label for="ddollar" class="col-sm-3 control-label">目标美元</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="ddollar" placeholder="请输入名称" v-model="table2Form.ddollar">
                </div>
              </div>
              <div class="form-group">
                <label for="drmb" class="col-sm-3 control-label">目标人民币</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="drmb" placeholder="请输入名称" v-model="table2Form.drmb">
                </div>
              </div>
              <div class="form-group">
                <label for="sort" class="col-sm-3 control-label">排序</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="sort" placeholder="请输入排序号" v-model="table2Form.seq">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">推荐</label>
                <div class="col-sm-9 radio">
                  <label>
                    <input type="radio" name="optionsRadios" v-model="table2Form.isTj" value="1">是
                  </label>
                  <label style="margin-left:1rem">
                    <input type="radio" name="optionsRadios" v-model="table2Form.isTj" value="0">否
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">备注</label>
                <div class="col-sm-9">
                  <textarea class="form-control" rows="3" placeholder="请输入备注" v-model="table2Form.remarks"></textarea>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
            <div class="box-footer">
              <a class="btn btn-info pull-right" @click="save">保 存</a>
              <a type="reset" class="btn btn-default pull-right" style="margin-right:5px" @click="cancel">取 消</a>
            </div>
            <!-- /.box-footer -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "table-test",
    data(){
      return {
        table2Form:{
          code:'',
          name:'',
          sdollar:'',
          srmb:'',
          ddollar:'',
          drmb:'',
          isTj:'1',
          remarks:'',
          seq:''
        },
        viewType:''
      }
    },
    methods:{
      //获取数据
      getData(){
        const loading = this.$loading({
          lock: true,
          text: '正在读取数据...',
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255, 0.5)',
        });
        this.adminUtil.ajaxGetUtil('bgoodsitem/detail/'+this.$route.params.goodsId,{
          id:this.$route.params.goodsId
        },res=>{
          loading.close();
          if (res.code===200){
            if (res.data===''){
              this.$confirm('数据未找到!', '错误', {
                confirmButtonText: '关闭',
                cancelButtonText: '返回',
                showCancelButton:false,
                showClose:false,
                type: 'error'
              }).then(() => {
                this.$router.push({
                  'path':'/Table2'
                });
              }).catch(() => {
                //无此操作
              });
            }else{
              let t = this.table2Form;
              let r = res.data;
              t.code = r.code;
              t.name = r.name;
              t.sdollar = r.priceSdollar;
              t.srmb = r.priceSrmb;
              t.ddollar = r.priceDdollar;
              t.drmb = r.priceDrmb;
              t.isTj = r.isTj;
              t.remarks = r.remarks;
              t.seq = r.seq;
            }
          }else{
            this.$notify.warning({
              title:'警告',
              message:'数据读取失败',
              duration:2000
            });
          }
        },err=>{
          loading.close();
          this.$notify.error({
            title:'错误',
            message:'网络错误',
            duration:2000
          });
        });
      },
      //保存
      save() {
        const loading = this.$loading({
          lock: true,
          text: '正在保存...',
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255, 0.5)',
        });
        let t = this.table2Form;
        //类型
        let type = this.$route.params.type;
        //新增
        if (type==='Add'){
          this.adminUtil.ajaxPostUtil('bgoodsitem/add',{
            code:t.code,
            name:t.name,
            priceSdollar:t.sdollar,
            priceSrmb:t.srmb,
            priceDdollar:t.ddollar,
            priceDrmb:t.drmb,
            isTj:t.isTj,
            remarks:t.remarks,
            goodsId:this.$route.params.id,
            seq:t.seq
          },res=>{
            if (res.code===200){
              loading.close();
              this.$notify.success({
                title: '提示',
                message: '保存成功!'
              });
              this.formReset();
              this.$router.push({
                name:'Table2Maintain',
                params:{
                  id:this.$route.params.id
                }
              });
            }else{
              loading.close();
              this.$notify({
                title: '警告',
                message: res.message,
                type: 'warning'
              });
            }
          },err=>{
            loading.close();
            this.$notify.error({
              title: '错误',
              message: '网络错误',
            });
          })
        }else if (type==='Edit'){
          //修改
          this.adminUtil.ajaxPutUtil('bgoodsitem/update/'+this.$route.params.goodsId,{
            businessId:this.$route.params.goodsId,
            code:t.code,
            name:t.name,
            priceSdollar:t.sdollar,
            priceSrmb:t.srmb,
            priceDdollar:t.ddollar,
            priceDrmb:t.drmb,
            isTj:t.isTj,
            remarks:t.remarks,
            seq:t.seq
          },res=>{
            if (res.code===200){
              loading.close();
              this.$notify.success({
                title: '提示',
                message: '保存成功!'
              });
              this.formReset();
              this.$router.push({
                name:'Table2Maintain',
                params:{
                  id:this.$route.params.id
                }
              });
            }else{
              loading.close();
              this.$notify({
                title: '警告',
                message: res.message,
                type: 'warning'
              });
            }
          },err=>{
            loading.close();
            this.$notify.error({
              title: '错误',
              message: '网络错误',
            });
          })
        }
      },
      //取消
      cancel(){
        this.formReset();
        this.$router.push({
          name:'Table2Maintain',
          params:{
            id:this.$route.params.id
          }
        });
      },
      //表单重置
      formReset(){
        let f = this.table2Form;
        f.code = '';
        f.name = '';
        f.sdollar = '';
        f.srmb = '';
        f.ddollar = '';
        f.drmb = '';
        f.isTj = '1';
        f.remarks = '';
        f.seq = '';
      }
    },
    beforeMount(){
      let type = this.$route.params.type;
      switch(type){
        case 'Add':
          this.viewType = '维护页 新增';
          break;
        case 'Edit':
          this.viewType= '维护页 编辑';
          this.getData();
          break;
      }
    }
  }
</script>

<style>

</style>

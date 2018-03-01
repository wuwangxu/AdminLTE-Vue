<template>
  <div id="tableTest2" class="content-wrapper container" style="min-height:auto">
    <div class="row">
      <div class="col-md-6">
        <!-- Horizontal Form -->
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">新 增</h3>
          </div>
          <!-- /.box-header -->
          <!-- form start -->
          <form class="form-horizontal">
            <div class="box-body">
              <div class="form-group">
                <label for="code" class="col-sm-2 control-label">编号</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="code" placeholder="请输入编号" v-model="table2Form.code">
                </div>
              </div>
              <div class="form-group">
                <label for="name" class="col-sm-2 control-label">名称</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="name" placeholder="请输入名称" v-model="table2Form.name">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">类型名称</label>
                <div class="col-sm-10">
                  <select class="form-control" v-model="table2Form.typeId">
                    <option v-for="(item,index) in typeName" :value="item.businessId">{{item.name}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">推荐</label>
                <div class="col-sm-10 radio">
                  <label>
                    <input type="radio" name="optionsRadios" v-model="table2Form.isTj" value="1">是
                  </label>
                  <label style="margin-left:1rem">
                    <input type="radio" name="optionsRadios" v-model="table2Form.isTj" value="0">否
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">图片</label>
                <div class="col-sm-10">
                  <label>
                    <input type="file" value="上传图片" @change="pushimage" ref="file" id="image">
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">备注</label>
                <div class="col-sm-10">
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
      <div class="col-md-6">
        <div class="previewImg">
          <span v-show="imageUrl===''">暂无图片</span>
          <img :src="imageUrl" title="图片预览" v-show="imageUrl!==''">
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
          typeId:'',
          isTj:1,
          remarks:'',
          image:''
        },
        typeName:[], //所有的类型名称
        imageUrl:''
      }
    },
    methods:{
      //获取全部数据
      getAllData(){
        this.adminUtil.ajaxGetUtil('bgoodstype/queryBGoodsTypeByPaginationWithoutAuth',{
            //params
            rows:999,
            page:this.pageNu
          },res=>{
            this.typeName = [];
            for (let i=0;i<res.rows.length;i++){
              if (res.rows[i].isTop ==="0"){
                this.typeName.push(res.rows[i]);
              }
            }
          },err=>{
            this.$notify.error({
              title: '错误',
              message: '网络错误',
            });
          }
        )
      },
      //上传图片
      pushimage(){
        const loading = this.$loading({
          lock: true,
          text: '正在读取图片...',
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255, 0.5)',
        });

        let image = this.$refs.file.files[0];
        this.adminUtil.ajaxPostUtil('upload',{
          file:image
        },res=>{
          if (res.code===200){
            this.table2Form.image = res.data;
            this.image = res.data;
            this.imageUrl = this.preUrl.assetsUrl + res.data;
            loading.close();
          }else{
            this.$notify.warning({
              title: '警告',
              message: res.message,
            });
            loading.close();
          }
        },err=>{
          this.$notify.error({
            title: '错误',
            message: '网络错误',
          });
          loading.close();
        })
      },
      //保存
      save() {
        const loading = this.$loading({
          lock: true,
          text: '正在保存...',
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255, 0.5)',
        });
        this.adminUtil.ajaxPostUtil('bgoods/add',{
          code:this.table2Form.code,
          name:this.table2Form.code,
          typeId:this.table2Form.typeId,
          isTj:this.table2Form.isTj,
          imageUrl:this.table2Form.image,
          remarks:this.table2Form.remarks
        },res=>{
          if (res.code===200){
            this.formReset();
            this.$emit('table2DetailEvent',2);
            this.$notify({
              title: '提示信息',
              message: res.message,
              type: 'success'
            });
            loading.close();
          }else{
            this.$notify({
              title: '警告',
              message: res.message,
              type: 'warning'
            });
            loading.close();
          }
        },err=>{
          this.$notify.error({
            title: '错误',
            message: '网络错误',
          });
          loading.close();
        })
      },
      //取消
      cancel(){
        this.formReset();
        this.$emit('table2DetailEvent',3);
      },
      //表单重置
      formReset(){
        let f = this.table2Form;
        f.code = '';
        f.name = '';
        f.typeId = '';
        f.isTj = 1;
        f.remarks = '';
        f.iamge = '';
        this.typeName = [];
      }
    },
    mounted(){
      this.getAllData();
    }
  }
</script>

<style>
  .previewImg{
    width:200px;
    height:200px;
    background:#AAA;
    display:flex;
    justify-content:center;
    align-items:center;
    color:#FFF;
  }
  .previewImg img{
    width:100%;
    height:100%;
  }
</style>

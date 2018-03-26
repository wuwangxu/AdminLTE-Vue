<template>
  <div id="tableTest2" style="min-height:auto">
    <div class="row">
      <div class="col-md-6">
        <!-- Horizontal Form -->
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">新 增{{this.table2Form.name}}</h3>
          </div>
          <!-- /.box-header -->
          <!-- form start -->
          <form class="form-horizontal">
            <div class="box-body">
              <div class="form-group">
                <label for="loginName" class="col-sm-2 control-label">登录名</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="loginName" placeholder="请输入登录名" v-model="table2Form.loginName">
                </div>
              </div>
              <div class="form-group">
                <label for="name" class="col-sm-2 control-label">姓名</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="name" placeholder="请输入名称" v-model="table2Form.name">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">性别</label>
                <div class="col-sm-10">
                  <select class="form-control" v-model="table2Form.sex">
                    <option disabled="disabled" selected="selected" value="">请选择您的性别</option>
                    <option v-for="(item,index) in sexName" :value="item.sexId">{{item.sexName}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="phone" class="col-sm-2 control-label">联系电话</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="phone" placeholder="请输入手机号" v-model="table2Form.phone">
                </div>
              </div>
              <div class="form-group">
                <label for="email" class="col-sm-2 control-label">邮箱</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="email" placeholder="请输入邮箱" v-model="table2Form.email">
                </div>
              </div>
              <div class="form-group">
                <label for="weixinName" class="col-sm-2 control-label">微信号</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="weixinName" placeholder="请输入微信号" v-model="table2Form.weixinName">
                </div>
              </div>

              <!--<div class="form-group">-->
              <!--<label class="col-sm-2 control-label">电话</label>-->
              <!--<div class="col-sm-10 radio">-->
              <!--<label>-->
              <!--<input type="radio" name="optionsRadios" v-model="table2Form.isTj" value="1">是-->
              <!--</label>-->
              <!--<label style="margin-left:1rem">-->
              <!--<input type="radio" name="optionsRadios" v-model="table2Form.isTj" value="0">否-->
              <!--</label>-->
              <!--</div>-->
              <!--</div>-->
              <!--<div class="form-group">-->
              <!--<label class="col-sm-2 control-label">图片</label>-->
              <!--<div class="col-sm-10">-->
              <!--<label>-->
              <!--<input type="file" value="上传图片" @change="pushimage" ref="file" id="image">-->
              <!--</label>-->
              <!--</div>-->
              <!--</div>-->
              <!--<div class="form-group">-->
                <!--<label class="col-sm-2 control-label">备注</label>-->
                <!--<div class="col-sm-10">-->
                  <!--<textarea class="form-control" rows="3" placeholder="请输入备注" v-model="table2Form.remarks"></textarea>-->
                <!--</div>-->
              <!--</div>-->
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
          loginName:'',
          name:'',
          email:'',
          phone:'',
          sex:'',
          weixinName:''
        },
        sexName:[{"sexName":"男","sexId":"0"},{"sexName":"女","sexId":"1"}], //所有的性别
        imageUrl:''
      }
    },
    methods:{
      //获取全部数据
      // getAllData(){
      //   this.adminUtil.ajaxGetUtil('bgoodstype/queryBGoodsTypeByPaginationWithoutAuth',{
      //       //params
      //       rows:999,
      //       page:1
      //     },res=>{
      //       this.typeName = [];
      //       for (let i=0;i<res.rows.length;i++){
      //         if (res.rows[i].isTop ==="0"){
      //           this.typeName.push(res.rows[i]);
      //         }
      //       }
      //     },err=>{
      //       this.$notify.error({
      //         title: '错误',
      //         message: '网络错误',
      //       });
      //     }
      //   )
      // },
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
        this.adminUtil.ajaxPostUtil('user/addUser',{
          loginName:this.table2Form.loginName,
          name:this.table2Form.name,
          email:this.table2Form.email,
          phone:this.table2Form.phone,
          sex:this.table2Form.sex,
          weixinName:this.table2Form.weixinName
        },res=>{
          if (res.code===200){
            loading.close();
            this.$notify.success({
              title: '提示',
              message: '保存成功!',
            });
            this.formReset();
            this.$emit('usersInfoDetailEvent',2);
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
      },
      //取消
      cancel(){
        this.formReset();
        this.$emit('usersInfoDetailEvent',3);
      },
      //表单重置
      formReset(){
        let f = this.table2Form;
        f.loginName = '';
        f.name = '';
        f.sex = '';
        f.email = '';
        f.phone = '';
        f.weixinName = '';
      }
    },
    mounted(){

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

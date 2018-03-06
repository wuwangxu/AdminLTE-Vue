<template>
  <div id="login" @keyup.enter="login">
    <div class="col-md-6 col-md-offset-3">
      <!-- Horizontal Form -->
      <div class="box box-info">
        <div class="box-header with-border">
          <h3 class="box-title">登 录</h3>
        </div>
        <!-- /.box-header -->
        <!-- form start -->
        <form class="form-horizontal">
          <div class="box-body">
            <div class="form-group">
              <label for="username" class="col-sm-2 control-label">用户名</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="username" placeholder="请输入用户名" v-model="username" :disabled="isLogining===true">
              </div>
            </div>
            <div class="form-group">
              <label for="password" class="col-sm-2 control-label">密&nbsp;&nbsp;&nbsp;&nbsp;码</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" id="password" placeholder="请输入密码" v-model="password" :disabled="isLogining===true">
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <div class="checkbox">
                  <label>
                    <input type="checkbox"> Remember me
                  </label>
                </div>
              </div>
            </div>
          </div>
          <!-- /.box-body -->
          <div class="box-footer" v-show="isLogining===false">
            <a class="btn btn-info pull-right" @click="login">登 录</a>
            <a class="btn btn-default pull-right" style="margin-right:20px">重置</a>
          </div>

          <div class="box-footer box-footer-loading" v-show="isLogining===true">
            <a class="btn btn-info pull-right" disabled @click="login"><i class="fa fa-spinner fa-pulse"></i> 登录中</a>
            <a class="btn btn-default pull-right disabled" disabled style="margin-right:20px">重置</a>
          </div>
          <!-- /.box-footer -->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data(){
      return {
        username:'',
        password:'',
        isLogining:false
      }
    },
    methods:{
      login(){
        if (this.username!==''&&this.password!==''){
          this.isLogining = true;
          let formData=new FormData();
          formData.append('username',this.username);
          formData.append('password',this.password);
          formData.append('userType',"1");
          this.axios.post(
            this.preUrl.interfaceUrl+'auth/login',formData,{
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          ).then((res)=> {
            if (res.data.code===200){
              let token = 'Bearer '+ res.data.data;
              sessionStorage.setItem("token",token);
              sessionStorage.setItem("user",this.username);
              this.isLogining = false;
              this.$notify.success({
                title:'提示',
                message:'登录成功!',
                duration:2000
              });
              this.$router.push({'path':'/'});
            }else{
              this.isLogining = false;
              this.$notify.warning({
                title:'警告',
                message:'用户名或密码不正确!',
                duration:2000
              });
            }
          }).catch((err)=>{
            this.isLogining = false;
            this.$notify.error({
              title:'错误',
              message:'网络错误',
              duration:2000
            });
          })
        }else{
          this.$notify.warning({
            title:'警告',
            message:'用户名和密码不能为空!',
            duration:2000
          });
        }
      }
    }
  }
</script>

<style scoped>
  #login{
    width:100%;
    height:100% !important;
    background:#ECF0F5;
  }
  #login>div{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
</style>

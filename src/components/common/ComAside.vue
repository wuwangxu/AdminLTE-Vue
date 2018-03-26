<template>
  <!-- 公共侧边栏(导航) -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img src="../../../static/images/user2-160x160.jpg" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>用户名</p>
          <a href="#"><i class="fa fa-circle text-success"></i> 在线</a>
        </div>
      </div>
      <!-- search form -->
      <form action="" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="Search...">
          <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
          </span>
        </div>
      </form>
      <!-- 导航 -->
      <ul class="sidebar-menu">
        <li class="header">导航</li>
        <li class="active treeview">
          <router-link to="/">
            <i class="fa fa-home"></i><span>主页</span>
          </router-link>
        </li>

        <li class="treeview">
          <a>
            <i class="fa fa-table"></i> <span>Tables</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><router-link to="/Table1"><i class="fa fa-circle-o"></i> 表格1</router-link></li>
            <li><router-link to="/Table2"><i class="fa fa-circle-o"></i> 表格2</router-link></li>
          </ul>
        </li>

        <li class="treeview">
          <a>
            <i class="fa fa-table"></i> <span>用户管理</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><router-link to="/UsersInfo"><i class="fa fa-circle-o"></i> 用户管理</router-link></li>
            <li><router-link to="/"><i class="fa fa-circle-o"></i> 预留页面</router-link></li>
          </ul>
        </li>

        <li class="treeview">
          <a>
            <i class="fa fa-table"></i> <span>订单管理</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><router-link to="/OrderInfo"><i class="fa fa-circle-o"></i> 订单管理</router-link></li>
            <li><router-link to="/"><i class="fa fa-circle-o"></i> 预留页面</router-link></li>
          </ul>
        </li>
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
  export default {
    name: "com-aside",
    data(){
      return {

      }
    },
    methods: {

    },
    mounted(){
      //导航
      $('.treeview').click(function(){
        $(this).children('.treeview-menu').slideToggle();
      });

      $('.treeview-menu').click(function(e){
        e.stopPropagation();
      })
    }
  }
</script>

<style>
  .main-sidebar{
    user-select:none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
  }
</style>

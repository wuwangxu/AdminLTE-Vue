import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'*',
      redirect:'/Login'
    },
    {
      path:'/',
      redirect:'/Home'
    },
    {
      path:'/Home',
      component:Home,
      meta: { requireAuth: true },
      children:[
        {
          path: '/',
          component:resolve => require(['../components/pages/Index'], resolve),
          meta: { requireAuth: true }
        }
      ]
    },
    /***********************  login  ************************/
    {
      path:'/Login',
      name:'login',
      component:Login
    },
    /***********************  table  ************************/
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/Table1',
          component: resolve => require(['../components/pages/tables/Table1'], resolve),
          meta: { requireAuth: true }
        },
        {
          path: '/Table2',
          component:resolve => require(['../components/pages/tables/Table2'], resolve),
          meta: { requireAuth: true }
        },
        {
          path: '/Table2/edit/:id',
          name: 'Table2Edit',
          component:resolve => require(['../components/pages/tables/TableComponents/Table2Edit'], resolve),
          meta: { requireAuth: true }
        },
        {
          path: '/Table2/maintain/:id',
          name: 'Table2Maintain',
          component:resolve => require(['../components/pages/tables/TableComponents/Table2Maintain'], resolve),
          meta: { requireAuth: true }
        },
        {
          path: '/Table2/maintain/:id/:goodsId?/:type?',
          name: 'Table2MaintainAdd',
          component:resolve => require(['../components/pages/tables/TableComponents/Table2MaintainAdd'], resolve),
          meta: { requireAuth: true }
        },
      ]
    }
  ]
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  //获取登录状态
  function isLogin(){
    return sessionStorage.getItem('token')
  }

  let _null = null;
  if (to.meta.requireAuth&&isLogin()===_null){
    router.push({
      'path':'/Login'
    });
  }else{
    next();
  }

  if (to.name === 'login'){
    if (isLogin() !== _null){
      router.push({
        'path':'/'
      });
    }
  }
});
export default router;

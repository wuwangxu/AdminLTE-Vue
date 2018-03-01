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
      children:[
        {
          path: '/',
          component:resolve => require(['../components/pages/Index'], resolve)
        }
      ]
    },
    /***********************  login  ************************/
    {
      path:'/Login',
      component:Login
    },
    /***********************  table  ************************/
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/Table1',
          component: resolve => require(['../components/pages/tables/Table1'], resolve)
        },
        {
          path: '/Table2',
          component:resolve => require(['../components/pages/tables/Table2'], resolve)
        },
        {
          path: '/Table2/edit/:id',
          name: 'Table2Edit',
          component:resolve => require(['../components/pages/tables/TableComponents/Table2Edit'], resolve)
        },
        {
          path: '/Table2/maintain/:id',
          name: 'Table2Maintain',
          component:resolve => require(['../components/pages/tables/TableComponents/Table2Maintain'], resolve)
        },
        {
          path: '/Table2/maintain/:id/:goodsId?/:type?',
          name: 'Table2MaintainAdd',
          component:resolve => require(['../components/pages/tables/TableComponents/Table2MaintainAdd'], resolve)
        },
      ]
    }
  ]
});

// 全局路由守卫
// router.beforeEach((to, from, next) => {
//   // to: Route: 即将要进入的目标 路由对象
//   // from: Route: 当前导航正要离开的路由
//   // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
//   const nextRoute = [ 'index', 'login', 'table'];
//   let isLogin = localStorage.getItem('token');
//   if (nextRoute.indexOf(to.name) >= 0){
//     if (isLogin === null){
//       router.push({
//         'path':'/Login'
//       });
//     }
//   }
//   if (to.name === 'login'){
//     if (isLogin !== null){
//
//     }
//   }
// });
export default router;

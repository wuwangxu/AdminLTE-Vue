创建日期:2018-02-24

1.执行npm install安装依赖包 自动生成node_modules目录

2.执行bower install安装依赖包 自动生成bower_components目录

3.公共文件,在main.js中用import的方法引入




路由使用方法:

  1.在router文件夹下index.js配置路由,格式如下
      {
        path:'/',       ------------- 根路径
        component:Home, ------------- 主页组件
        children:[      ------------- 子路由
          {
            path: '/',  ------------- 子路由路径
            component:resolve => require(['../components/pages/Index'], resolve)  ------ resolve方法为懒加载
                                                                                         也可以用components:组件名
                                                                                         如果直接用组件名,需要在index.js里引入组件
          }
        ]
      },
  2.我们操作的主要是子路由,Home组件作为一个container载着头部,导航栏,视图窗口等
  3.路由配置完成后,跳转路由只需要把我们原来跳转的<a href="#"></a>改为<router-link to="路由地址"></router-link>

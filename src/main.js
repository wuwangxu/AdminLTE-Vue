import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.prototype.axios = axios;

/************************************[样式类]************************************/
// Bootstrap 3.3.7
import '../bower_components/bootstrap/dist/css/bootstrap.min.css'
import '../bower_components/bootstrap/dist/js/bootstrap.min'
// Font Awesome
import '../bower_components/font-awesome/css/font-awesome.min.css'
Vue.config.productionTip = false
// Ionicons
import '../bower_components/Ionicons/css/ionicons.min.css'
// Theme style
import '../static/css/AdminLTE.min.css'
// AdminLTE Skins. Choose a skin from the css/skins folder instead of downloading all of them to reduce the load.
import '../static/css/skins/_all-skins.min.css'
// Date Picker
import '../bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css'
// Daterange picker
import '../bower_components/bootstrap-daterangepicker/daterangepicker.css'
// bootstrap wysihtml5 - text editor
import '../static/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css'
// DataTables
import "../bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css"

/************************************[js类]************************************/
// jQuery
import $ from 'jquery'
//jQuery UI
import '../static/plugins/jQueryUI/jquery-ui.min'
// datepicker
import '../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'
// FastClick
import '../bower_components/fastclick/lib/fastclick.js'
// AdminLTE App
import '../static/js/adminlte.min'
// AdminLTE for demo purposes
import '../static/js/demo.js'
// table
import '../bower_components/datatables.net/js/jquery.dataTables.min.js'
import '../bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js'

// 初始化
window.onload = function () {
  $.widget.bridge('uibutton', $.ui.button);
};
// adminUtils
Vue.prototype.adminUtil = require('../build/adminUtils');
// 引入url配置文件
const preUrl = require('../config/preUrl');
// 全局地址
Vue.prototype.preUrl = preUrl;
Vue.prototype.globalUrl = preUrl.serverUrl;
  new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

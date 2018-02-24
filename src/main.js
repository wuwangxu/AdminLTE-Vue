import Vue from 'vue'
import App from './App'
import router from './router'

/************************************[样式类]************************************/
// Bootstrap 3.3.7
import '../bower_components/bootstrap/dist/css/bootstrap.min.css'
// Font Awesome
import '../bower_components/font-awesome/css/font-awesome.min.css'
Vue.config.productionTip = false
// Ionicons
import '../bower_components/Ionicons/css/ionicons.min.css'
// Theme style
import '../static/css/AdminLTE.min.css'
// AdminLTE Skins. Choose a skin from the css/skins folder instead of downloading all of them to reduce the load.
import '../static/css/skins/_all-skins.min.css'
// Morris chart
import '../bower_components/morris.js/morris.css'
// jvectormap
import '../bower_components/jvectormap/jquery-jvectormap.css'
// Date Picker
import '../bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css'
// Daterange picker
import '../bower_components/bootstrap-daterangepicker/daterangepicker.css'
// bootstrap wysihtml5 - text editor
import '../static/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css'

/************************************[js类]************************************/
// jQuery
import $ from 'jquery'
// bootstrap
import 'bootstrap'
//jQuery UI
import '../static/plugins/jQueryUI/jquery-ui.min'

// Morris.js charts
// import '../bower_components/raphael'
// import '../bower_components/raphael/raphael.min.js'
// import '../bower_components/morris.js'
// import '../bower_components/morris.js/morris.min.js'

// Sparkline
import '../bower_components/jquery-sparkline/dist/jquery.sparkline.min.js'
// jQuery Knob Chart
import '../bower_components/jquery-knob/dist/jquery.knob.min.js'
// jvectormap
// import '../static/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js'
// import '../static/plugins/jvectormap/jquery-jvectormap-world-mill-en.js'
// daterangepicker
// import '../bower_components/moment/min/moment.min.js'
// import '../bower_components/bootstrap-daterangepicker/daterangepicker.js'
// datepicker
import '../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'
// Bootstrap WYSIHTML5
// import '../static/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min'
// Slimscroll (jquery未定义)
// import '../bower_components/jquery-slimscroll/jquery.slimscroll.min.js'
// FastClick
import '../bower_components/fastclick/lib/fastclick.js'
// AdminLTE App(jquery未定义)
// import '../static/js/adminlte.min'
// AdminLTE dashboard demo (This is only for demo purposes)(jquery未定义)
// import '../static/js/pages/dashboard.js'
// AdminLTE for demo purposes(jquery未定义)
// import '../static/js/demo.js'

// 初始化
window.onload = function () {
  $.widget.bridge('uibutton', $.ui.button);
};
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

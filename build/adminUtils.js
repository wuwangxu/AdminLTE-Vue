const axios = require('axios')
const preUrl = require('../config/preUrl')

/**
 * @description: 将键值对集合转换为FormData对象，以便axios传参；
 * @param: data ：形如{param1:"",param2:""}
 * @return   {FormData}
 * @author:
 * @date:
 */

var formData = function(data){
  let _formData = new FormData();
  for(var i in data){
    _formData.append(i, data[i]);
  }
  return _formData;
};
module.exports = {
  /**
   * @description: 对axios的POST请求方法的封装(已加header)
   * @param: url  -> String
   * @param: param  -> 形如{param1:"",param2:""}
   * @param: thenFun  -> 请求成功（200）的回调函数
   * @param: exeFun  -> 请求失败（非200）的回调函数
   * @return
   * @author:
   * @date:
   */
  ajaxPostUtil (url,param,thenFun,exeFun){
    var _formData = formData(param);
    axios.defaults.headers.common['Authorization']=sessionStorage.getItem("token")||localStorage.getItem("token")
    axios.post(preUrl.interfaceUrl+url,_formData).then(function (res) {
      thenFun.call(this,res.data);
    }).catch(function (error) {
      exeFun.call(this,error);
    });
  },

  /**
   * @description: 对axios的GET请求方法的封装（已加header）
   * @param: url  -> String
   * @param: param  -> 形如{param1:"",param2:""}
   * @param: thenFun  -> 请求成功（200）的回调函数
   * @param: exeFun  -> 请求失败（非200）的回调函数
   * @return
   * @author:
   * @date:
   */
  ajaxGetUtil (url,param,thenFun,exeFun){
    axios.defaults.headers.common['Authorization']=sessionStorage.getItem("token")||localStorage.getItem("token")
    axios({
      method: 'get',
      url: preUrl.interfaceUrl+url,
      params: param
    }).then(function (res) {
      thenFun.call(this,res.data);
    }).catch(function (error) {
      exeFun.call(this,error);
    });
  },

  /**
   * @description: 对axios的DELETE请求方法的封装（已加header）
   * @param: url  -> String
   * @param: param  -> 形如{param1:"",param2:""}
   * @param: thenFun  -> 请求成功（200）的回调函数
   * @param: exeFun  -> 请求失败（非200）的回调函数
   * @return
   * @author:
   * @date:
   */
  ajaxDeleteUtil (url,param,thenFun,exeFun){
    axios.defaults.headers.common['Authorization']=sessionStorage.getItem("token")||localStorage.getItem("token")
    axios({
      method: 'delete',
      url: preUrl.interfaceUrl+url,
      params: param
    }).then(function (res) {
      thenFun.call(this,res.data);
    }).catch(function (error) {
      exeFun.call(this,error);
    });
  },

  /**
   * @description: 对axios的DELETE请求方法的封装（已加header）
   * @param: url  -> String
   * @param: param  -> 形如{param1:"",param2:""}
   * @param: thenFun  -> 请求成功（200）的回调函数
   * @param: exeFun  -> 请求失败（非200）的回调函数
   * @return
   * @author:
   * @date:
   */
  ajaxPutUtil (url,param,thenFun,exeFun){
    axios.defaults.headers.common['Authorization']=sessionStorage.getItem("token")||localStorage.getItem("token")
    axios({
      method: 'put',
      url: preUrl.interfaceUrl+url,
      params: param
    }).then(function (res) {
      thenFun.call(this,res.data);
    }).catch(function (error) {
      exeFun.call(this,error);
    });
  }
}

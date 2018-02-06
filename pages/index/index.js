//index.js
//获取应用实例
const app = getApp()
Page({
  data: {},
  onShow:function(){
  	wx.request({
  		url: "http://127.0.0.1:8000/category/list",
  		dataType: "json",
  		method: "post",
  		success: function(res){
  			console.log(res)
  		},
  		fail: function(error){
  			console.log(error);
  		}
  	})
  }
})

/*-----------导入微信相关模块------------*/
import { wxUserInfo } from "utils/wechat.js";
/*-----------导入缓存相关模块-----------*/
import { WxUserInfoStorage } from "utils/storage.js";
App({
  onLaunch: function () {
	this.getUserInfoStorage();
  },
  /*----------从网络获取微信用户信息----------*/
  getUserInfo: function(){
	wxUserInfo().then(data=>{
		let userInfoStorage = new WxUserInfoStorage(data);
		userInfoStorage.set().then(()=>{
			this.globalData.userInfo = data;
		});
	});
  },
  /*----------从缓存中获取微信用户信息---------*/
  getUserInfoStorage: function(){
	WxUserInfoStorage.get().then(data=>{
		if(data){
			this.globalData.userInfo = data;
		}else{
			this.getUserInfo();
		};
	});
  },
  globalData: {
    userInfo: null
  }
})
/*-----------导入存储模块------------*/
import { SubjectStorage } from "../../utils/storage.js";
/*-----------导入微信相关模块----------*/
import { modal } from "../../utils/wechat.js";
Page({
	data:{
		subject: "",
		back_url: ""
	},
	onLoad:function(options){
		console.log(options);
		let back_url = options.back_url;
		console.log(back_url);
		if(back_url) this.setData({back_url});
	},
	onShow: function(){
		this.getSubject();
	},
	handleSelected: function(e){
		let value = e.currentTarget.dataset.value;
		let name = e.currentTarget.dataset.name;
		modal(`确定将科目更改为${name}？`, ()=>{
			this.setSubject(value);
		});
	},
	/*------------获取科目--------------*/
	getSubject: function(){
		SubjectStorage.get().then(data=>{
			this.setData({subject: data});
		}).catch(err=>{
			console.log(err);
		})
	},
	/*------------存储科目----------*/
	setSubject: function(value){
		this.setData({subject: value});
		let subject = new SubjectStorage(value);
		subject.set().then(()=>{
			console.log("------存储成功-------");
			console.log(this.data.back_url);
			if(this.data.back_url){
				wx.navigateTo({url: this.data.back_url});
			}else{
				wx.navigateBack();
			};
		});
	}
});
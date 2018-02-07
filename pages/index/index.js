import { SubjectStorage } from "../../utils/storage.js";
Page({
	data: {
		subject: ""
	},
	onShow:function(){
		this.getSubject();
	},
	handleSelected: function(e){
		let url = e.currentTarget.dataset.url;
		console.log(this.data.subject);
		url = this.data.subject ? url : `../subject/subject?back_url=${url}`;
		wx.navigateTo({url});
	},
	getSubject: function(){
		SubjectStorage.get().then(data=>{
			this.setData({subject: data});
		});
	}
});
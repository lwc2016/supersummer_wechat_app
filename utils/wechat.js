/*-------微信相关模块---------*/
export const modal = (content, callback) => {
    wx.showModal({
        title: "提示",
        content: content,
        cancelText: "取消",
        confirmText: "确认",
        cancelColor: "#909399",
        confirmColor: "#409EFF",
        success: (res)=>{
			if(res.confirm) callback && callback();
        }
    })
};
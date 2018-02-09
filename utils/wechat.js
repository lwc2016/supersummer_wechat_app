/*-------微信相关模块---------*/
export const modal = (content, callback) => {
    wx.showModal({
        title: "提示",
        content: content,
        cancelText: "取消",
        confirmText: "确认",
        cancelColor: "#909399",
        confirmColor: "#409EFF",
        success: (res) => {
            if (res.confirm) callback && callback();
        }
    })
};
export const toast = (title) => {
    wx.showToast({
        title: title,
        icon: "success",
        duration: 2000
    })
};
export const wxUserInfo = () => {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            lang: "en",
            success: (res)=>{
                resolve(res.userInfo);
            },
            fail: (err)=>{
                reject(err);
            }
        })
    });
};
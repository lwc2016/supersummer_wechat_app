/*----------导入微信相关的模块-----------*/
import { modal } from "../../utils/wechat.js";
Page({
    data: {
        currentSize: ""
    },
    onShow: function() {
        console.log("------获取缓存信息-------");
        this.getStorageInfo();
    },
    /*--------获取缓存信息---------*/
    getStorageInfo: function() {
        wx.getStorageInfo({
            success: (res) => {
                console.log(res);
                this.setData({ currentSize: res.currentSize });
            }
        });
    },
    handleClearStorage: function() {
        modal("确认需要清除缓存？", this.clearStorage);
    },
    clearStorage: function() {
        wx.clearStorage();
        this.getStorageInfo();
        wx.showToast({
            title: '清理缓存成功！',
            icon: 'success',
            duration: 2000
        })
    },
    handleLogout: function() {
        modal("确认需要退出本账号?");
    }
});
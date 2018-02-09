/*-------导入存储模块--------*/
import { SubjectStorage, UserStorage } from "../../utils/storage.js";
/*-------导入网络请求模块------*/
import { user_info } from "../../utils/api.js";
const app = getApp();
Page({
    data: {
        isLogined: false,
        subject: "",
        user: {},
        wxUserInfo: {}
    },
    onLoad: function() {
        let wxUserInfo = app.globalData.userInfo;
        this.setData({wxUserInfo});
    },
    onShow: function() {
        this.getSubject();
        this.getUserStorage();
    },
    /*-------获取科目-------*/
    getSubject: function() {
        SubjectStorage.get().then(data => {
            let subject = data;
            this.setData({ subject });
        });
    },
    demo: function() {
        return "ok";
    },
    /*-------获取用户信息-----*/
    getUserInfo: function() {
        user_info().then(data => {
            if (data.code == "0") {
                let userStorage = new UserStorage(data.result);
                userStorage.set().then(() => {
                    this.setData({ user: data.result });
                });
            };
        });
    },
    getUserStorage: function() {
        UserStorage.get().then(data => {
            if (data) {
                this.setData({ user: data });
            } else {
                this.getUserInfo();
            }
        });
    }
});
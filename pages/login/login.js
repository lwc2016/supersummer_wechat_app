/*---------导入接口api---------*/
import { user_register, user_login } from "../../utils/api.js";
/*---------导入util-----------*/
import { isPhoneValid } from "../../utils/utils.js";
/*---------导入微信相关模块------*/
import { toast } from "../../utils/wechat.js";
/*---------导入储存模块---------*/
import { AuthStorage } from "../../utils/storage.js";
Page({
    data: {
        isLogin: false,
        phone: "",
        password: "",
        confirmPassword: "",
        phoneValid: false,
        passwordValid: false,
        confirmPasswordValid: false,
        back_url: ""
    },
    onLoad: function(options) {
        if (options.back_url) {
            this.setData({ back_url: options.back_url });
        };
    },
    handleChange: function() {
        this.setData({ isLogin: !this.data.isLogin });
    },
    handleSubmit: function() {
        let phone = this.data.phone;
        let password = this.data.password;
        let phoneValid = this.data.phoneValid;
        let passwordValid = this.data.passwordValid;
        let confirmPasswordValid = this.data.confirmPasswordValid;
        if (!phoneValid) return toast("请输入合法手机号");
        if (!passwordValid) return toast("密码不能少于6位");
        if (this.data.isLogin) {
			this.login();
        } else {
            if (!confirmPasswordValid) return toast("两次密码不一致");
            this.register();
        }
    },
    login: function() {
        let phone = this.data.phone;
        let password = this.data.password;
        console.log({username:phone, password});
        user_login({username:phone, password}).then(data => {
            if (data.code == "0") {
                let auth = data.result;
                let authStorage = new AuthStorage(auth);
                authStorage.set().then(() => {
					this.back();
                });
            }else{
            	toast(data.errorMsg);
            }
        });
    },
    back: function() {
        if (this.data.back_url) {
			wx.navigateTo({url: this.data.url});
        } else {
			wx.switchTab({url: "../personal/personal"});
        };
    },
    register: function() {
        let phone = this.data.phone;
        let password = this.data.password;
        user_register({ phone, password }).then(data => {
            if (data.code == "0") {
                toast("注册成功");
                this.setData({ isLogin: true, phone: "", password: "" });
            } else {
                toast(data.errorMsg);
            };
        })
    },
    handleInputPhone: function(e) {
        let phone = e.detail.value;
        let phoneValid = this.data.phoneValid;
        if (isPhoneValid(phone)) {
            phoneValid = true;
        } else {
            phoneValid = false;
        }
        this.setData({ phone, phoneValid });
    },
    handleInputPassword: function(e) {
        let password = e.detail.value;
        let passwordValid = this.data.passwordValid;
        if (password.length >= 6) {
            passwordValid = true;
        } else {
            passwordValid = false;
        };
        this.setData({ password, passwordValid });
    },
    handleInputConfirmPassword: function(e) {
        let password = this.data.password;
        let confirmPassword = e.detail.value;
        let confirmPasswordValid = this.data.confirmPasswordValid;
        if (confirmPassword.length >= 6 && password == confirmPassword) {
            confirmPasswordValid = true;
        } else {
            confirmPasswordValid = false;
        };
        this.setData({ confirmPassword, confirmPasswordValid });
    }
})
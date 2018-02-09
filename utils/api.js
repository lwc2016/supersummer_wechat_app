/*---------导入配置模块----------*/
const config = require("./config.js");
/*---------导入缓存模块--------*/
import { AuthStorage } from "./storage.js";
const request = (path, postData) => {
    return new Promise((resolve, reject) => {
        AuthStorage.get().then(data => {
            let auth = data || {};
            let url = config.base_url + path;
            wx.request({
                url: url,
                data: postData,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    token: auth.token || "",
                    uid: auth.uid || "",
                },
                method: "post",
                dataType: "json",
                success: (res) => {
                     resolve(res.data);
                },
                fail: (err) => {
                    console.log(err);
                    resolve(err);
                }
            })
        });
    });
};



/*----------注册接口-----------*/
export const user_register = (data = {}) => {
    return request("/user/register", data);
};
/*----------登录接口-----------*/
export const user_login = (data = {}) => {
    console.log(data);
    return request("/user/login", data);
};
/*----------获取用户信息--------*/
export const user_info = () => {
    return request("/user/info", {});
};
/*----------获取全部分类-------*/
export const category_all = (subject)=>{
    return request("/category/all", {subject});
};
/*----------随机获取题目-------*/
export const question_random = (subject)=>{
    return request("/question/random", {subject});
};
/*----------提交答题接口---------*/
export const answer_commit = (data={})=>{
    return request("/answer/commit", data);
};


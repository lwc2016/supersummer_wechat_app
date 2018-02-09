/*--------导入网络请求模块---------*/
import { category_all } from "../../utils/api.js";
/*--------导入缓存模块----------*/
import { SubjectStorage, CategoryStorage } from "../../utils/storage.js";
Page({
    data: {
        list: [],
        subject: ""
    },
    onLoad: function() {},
    onShow: function() {
        this.getSubject();
    },
    /*-------获取科目--------*/
    getSubject: function() {
        SubjectStorage.get().then(data => {
            this.setData({ subject: data });
            this.getCategoryStorage(data);
        });
    },
    /*------获取全部分类------*/
    getCategoryAll: function(subject) {
        category_all(subject).then(data => {
            if (data.code == "0") {
                let category = {};
                category[subject] = data.result;
                let categoryStorage = new CategoryStorage(category);
                categoryStorage.set().then(() => {
                    this.setData({ list: data.result });
                })
            };
        });
    },
    getCategoryStorage: function(subject) {
        CategoryStorage.get().then(res=>{
            let result = res || {};
            if(result[subject]){
                this.setData({list: result[subject]});
            }else{
                this.getCategoryAll(subject);
            }
        });
    }
});
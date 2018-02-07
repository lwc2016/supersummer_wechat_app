/*-------导入存储模块--------*/
import { SubjectStorage } from "../../utils/storage.js";
/*-------导入过滤器----------*/
import { formatSubject } from "../../utils/filter.js";
Page({
    data: {
        isLogined: false,
        subjectName: ""
    },
    onLoad: function() {
        console.log("-------personal onLoad--------");
    },
    onShow: function() {
        console.log("-------personal onShow-------");
        this.getSubject();
    },
    /*-------获取科目-------*/
    getSubject: function() {
        SubjectStorage.get().then(data => {
        	let subjectName = formatSubject(data);
            this.setData({subjectName});
        });
    }
});
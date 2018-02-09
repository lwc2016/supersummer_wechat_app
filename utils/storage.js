class Storage {
    set() {
        let expiredTime = null;
        /*---------判断是否有过期时间-------*/
        if (this.expiredTime) {
            expiredTime = Date.now() + this.expiredTime;
        };
        let data = { result: this.value, expiredTime: expiredTime };
        return new Promise((resolve, reject) => {
            wx.setStorage({
                key: this.key,
                data: data,
                success: () => {
                    resolve();
                },
                fail: (err) => {
                    //reject(err);
                    resolve();
                }
            })
        });
    }
    static get() {
        return new Promise((resolve, reject) => {
            wx.getStorage({
                key: this.key,
                success: (res)=>{
                	let result = res.data.result;
                	let now = Date.now();
                	/*-------------判断是否过期------------*/
                	if(res.data.expiredTime && now >= res.data.expiredTime){
						result = null;
                	};
					resolve(result);
                },
                fail: (err) => {
                    resolve(null);
                    //reject(err);
                }
            })
        });
    }
}

/*-----------存储科目--------------*/
export class SubjectStorage extends Storage{
	constructor(value){
		super();
		this.key = "subject";
		this.value = value;
	}
};
SubjectStorage.key = "subject";
/*----------储存登录信息-----------*/
export class AuthStorage extends Storage{
    constructor(value){
        super();
        this.key = "auth";
        this.value = value;
    }
};
AuthStorage.key = "auth";
/*----------储存用户信息----------*/
export class UserStorage extends Storage{
    constructor(value){
        super();
        this.key = "user";
        this.value = value;
        this.expiredTime = 24 * 60 * 60 * 1000;
    }
};
UserStorage.key = "user";
/*---------储存分类---------*/
export class CategoryStorage extends Storage{
    constructor(value){
        super();
        this.key = "category";
        this.value = value;
        this.expiredTime = 24 * 60 * 60 * 1000;
    }
};
CategoryStorage.key = "category";
/*--------储存微信用户信息------*/
export class WxUserInfoStorage extends Storage{
    constructor(value){
        super();
        this.key = "wxUserInfo";
        this.value = value;
        this.expiredTime = 24 * 60 * 60 * 1000;
    }
};
WxUserInfoStorage.key = "wxUserInfo";



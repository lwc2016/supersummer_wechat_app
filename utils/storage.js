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
    	console.log("-------get--------");
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
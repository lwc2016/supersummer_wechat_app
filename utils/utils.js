/*------------验证手机号是否正确-------------*/
export const isPhoneValid = (phone)=>{
	let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	if(reg.test(phone)) return true;
	return false;
};

/*------------从小到大排序-------*/
export const smallToBig = (a, b)=>{
	if(a > b){
		return 1;
	}else if(a < b){
		return -1;
	}else{
		return 0;
	}
};
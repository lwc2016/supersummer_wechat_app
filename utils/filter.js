/*-------过滤器----------*/
export const formatSubject=(subject)=>{
	switch(subject){
		case "kuaiji":
			return "会计";
		case "jingji":
			return "经济法";
		case "shuifa":
			return "税法";
		case "shenji":
			return "审计";
		case "caiwu":
			return "财务管理";
		case "fengkong":
			return "公司成本与风险管理";
		default:
			return subject;
	}
};
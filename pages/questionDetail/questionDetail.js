/*---------导入网络请求模块--------*/
import { question_random, answer_commit } from "../../utils/api.js";
/*---------导入缓存模块-----------*/
import { SubjectStorage } from "../../utils/storage.js";
/*---------导入公共模块----------*/
import { smallToBig } from "../../utils/utils.js";
/*---------导入微信模块----------*/
import { toast, modal } from "../../utils/wechat.js";
Page({
	data:{
		isModal: false,
		effect: 1,
		subject: "",
		question: {},
		answerSelected: [],
		answer: {}
	},
	onShow(){
		this.getSubject();
	},
	/*-------获取科目-------*/
	getSubject(){
		SubjectStorage.get().then(data=>{
			this.setData({subject: data},()=>{
				this.getQuestion();
			});
		});
	},
	getQuestion(){
		let subject = this.data.subject;
		question_random(subject).then(data=>{
			console.log(data);
			if(data.code == "0"){
				this.setData({question: data.result});
			}
		});
	},
	handleSelectAnswer(e){
		let value = e.currentTarget.dataset.value;
		console.log(value);
		let answerSelected = this.data.answerSelected;
		if(this.data.question.type == "single"){
			answerSelected[0] = value;
		}else if(this.data.question.type == "double"){
			let index = answerSelected.indexOf(value);
			if(index >= 0){
				answerSelected.splice(index, 1);
			}else{
				answerSelected.push(value);
			};
		};
		answerSelected.sort(smallToBig);
		this.setData({answerSelected},()=>{
			console.log(this.data.answerSelected);
		});
	},
	handleCloseModal(e){
		console.log(e);
		console.log("-----ok----");
		this.setData({isModal: false});
	},
	handleSelectedEffect(e){
		console.log("-----选择----");
		let value = e.target.dataset.value;
		console.log(value);
		this.setData({effect: value});
	},
	handleClickModalContent(){
		console.log("-----点击模态窗------");
	},
	handleOpenModal(){
		this.setData({isModal: true});
	},
	handleConfirmEffect(){
		this.setData({isModal: false});
	},
	handleSubmit(){
		let user_answer = this.data.answerSelected;
		if(user_answer.length == 0){
			return toast("请选择答题");
		}else{
			user_answer = user_answer.join("、");
			return modal(`确定选择${user_answer}?`, this.answerCommit);
		}
	},
	answerCommit(){
		let question_id = this.data.question.id;
		let user_answer = this.data.answerSelected.join(",");
		answer_commit({question_id, user_answer}).then(data=>{
			console.log(data);
			if(data.code == "0"){
				this.setData({answer: data.result});
			}
		});
	}
});
/**
 * Created by luojie on 2017/10/12.
 * 全局公用js
 */
import {
	StyleSheet,
	Platform,
	Dimensions,
	AsyncStorage
} from "react-native";
import portal from "../config/serverAddress";
import * as Storage from "./storage";
import Pubsub from "../util/pubsub";
import tipWords from "../config/tipWords";
const timeout = 40;

global.createStyle = (className)=>StyleSheet.create(className);
global.isIos=Platform.OS !== "android";
global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;
global.hairlineWidth = StyleSheet.hairlineWidth;
global.deepCopy = (obj)=>{
	let str = JSON.stringify(obj);
	return JSON.parse(str);
};

global.ajax =  (opts)=>{
	return Storage.getItem("Authorization").then((Authorization)=>{
		opts = Object.assign({
			method:'get',
			type:'json',
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json;charset=utf-8',
				Authorization:Authorization
			},
			credentials: 'include'//send cookies in a cross-origin resource sharing (CORS) request
		},opts);
		opts.method = opts.method.toLocaleLowerCase();
		if(typeof opts.body != 'undefined') {
			if(opts.method == 'get') {
				let paramsArray = [];
				Object.keys(opts.body).forEach(key => paramsArray.push(key + '=' + opts.body[key]));
				opts.url = (opts.url.indexOf("http")>=0?opts.url : portal.baseUrl+opts.url);
				if (opts.url.search(/\?/) === -1) {
					opts.url +=  '?' + paramsArray.join('&')
				} else {
					opts.url +=  '&' + paramsArray.join('&')
				}
				opts.body = undefined;
				delete opts.body;
			}
			if(opts.method == 'post') {
				// if(typeof(opts.body)=="object"){
				// 	opts.body.format="json";
				// }
				opts.url = portal.baseUrl + opts.url;
				opts.body = typeof opts.body == 'string' ? opts.body : JSON.stringify(opts.body);
			}
		}
		console.log(opts)
		let p1 = new Promise((resolve,reject)=>{
			// Pubsub.publish("showLoading");
			fetch(opts.url,opts).then((response)=>{
				// Pubsub.publish("closeLoading");

				console.log(response)
				if(!response.ok) {
					let error = new Error();
					error.name = response.status;
					error.data = response;
					reject(error);
					return;
				}
				response.text().then(function(text) {
					if(opts.type == 'json') {
						resolve(JSON.parse(text));
					}
					else {
						resolve(text);
					}
				});
			}).catch((e)=>{
				console.log(e,"eror")
				if(e.message == "Network request failed"){
					Pubsub.publish("closeLoading");
					// Pubsub.publish("showToast",{
					// 	content:"网络异常"
					// });
					reject({status:0,message:tipWords.network_error})
				}
			});
		});
		let p2 = requestTimeout();
		return Promise.race([p1,p2])
	})
}


/// 设置超时的方法
function requestTimeout(){
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			let error = new Error();
			error.name = "timeout";
			error.message = "timeout";
			Pubsub.publish("closeLoading");
			reject({status:0,message:tipWords.network_timeout});//reject依然会执行then方法，返回undefined。所以用resolve。
		},timeout * 1000);
	})
}


global.upload =  async(opts)=>{
	return Storage.getItem("Authorization").then((Authorization)=>{
		opts = Object.assign({
			method:'get',
			type:'json',
			headers:{
				'Accept': 'application/json',
				'Content-Type':'multipart/form-data',
				Authorization:Authorization
			},
			credentials: 'include'//send cookies in a cross-origin resource sharing (CORS) request
		},opts);
		let formData = new FormData();
		let file = {uri: opts.body.uri, type: 'multipart/form-data', name: opts.body.name};
		formData.append("images",file);
		opts.url = portal.baseUrl + opts.url;
		opts.body = formData;
		console.log(opts)
		let p1 = new Promise((resolve,reject)=>{
			Pubsub.publish("showLoading");
			fetch(opts.url,opts).then((response)=>{
				Pubsub.publish("closeLoading");
				console.log(response)
				if(!response.ok) {
					let error = new Error();
					error.name = response.status;
					error.data = response;
					resolve(error);
					return;
				}
				response.text().then(function(text) {
					if(opts.type == 'json') {
						resolve(JSON.parse(text));
					}
					else {
						resolve(text);
					}
				});
			});
		});
		let p2 = requestTimeout();
		return Promise.race([p1,p2])
	})
}
/**
 * Created by luojie on 2017/9/12.
 */
import portal from "../config/serverAddress";
import Pubsub from "../util/pubsub";
const timeOutInterval = 20;
// const requestStatusSuccess = 1;
// export default function(opts){
// 	// 设置accessToken
// 	opts.Authorization = '';
// 	if (opts['url'].indexOf('http')<0) {
// 		opts.url = portal + opts.url;
// 	}
// 	if (opts['method'].toLocaleLowerCase() === 'get'){
// 		return getData(opts);
// 	} else if (opts['method'].toLocaleLowerCase() == 'post') {
//         return postData(opts);
//     }
// }
//
// ///  Post请求
// function postData(opts) {
// 	var parame=opts['body'] ? opts['body'] : {};
//     let p1 = new Promise((reject,resolve)=>{
//         fetch(opts['url'],{
//             method:'POST',
//             ///请求头参数
//             headers:{
//                 'Content-Type': 'application/json',
//                 'Authorization': opts['Authorization']
//             },
//             /// 请求参数
//             body:JSON.stringify(parame)
//
//         })
//             .then((response)=>response.json())
//             .then((responseJson)=>{
//                 /// 拿到数据可以在此同意处理服务器返回的信息
// 				if (responseJson.status == requestStatusSuccess) {
// 					resolve(responseJson.data);
// 				} else {
// 					dealError(responseJson, reject);
// 				}
//
//             })
//             .catch((error)=>{
//                 dealError(error, reject);
//             })
//     })
//
//     let p2 = requestTimeout();
//     /// 因为fetch网络请求没有超时时间设置，所以使用Promise实现请求超时
//     return Promise.race([p1,p2])
// }
//
// /// Get请求
// function getData(opts){
// 	var url =  opts['url'];
// 	var body = opts['body'];
// 	console.log(url)
//     if (body) {
//         url+='?';
//         Object.keys(body).forEach(key => {
//             url=url+key+'='+body[key]+'&';
//         })
//         url = url.substr(0, url.length - 1);
//     }
//     console.log(url)
//     let p1= new Promise((reject,resolve)=>{
//         fetch(url,{
//             method:'GET',
// 			 ///请求头参数
//            	 headers:{
// 				  'Content-Type': 'application/json',
// 				  'Authorization': opts['Authorization']
//             	},
// 			})
//             .then((response)=>response.json())
//             .then((responseJson)=>{
//         	console.log(responseJson)
//                 /// 拿到数据可以在此同意处理服务器返回的信息
// 				if (responseJson.status === requestStatusSuccess) {
// 					resolve(responseJson.data);
// 				} else {
// 					dealError(responseJson, reject);
// 				}
//             })
//             .catch((error)=>{
//                 dealError(error, reject);
//             })
//     })
//     let p2 = requestTimeout();
//     return Promise.race([p1,p2]);
// }



function dealError(error, reject) {
	reject(error.errmsg ? error.errmsg : error.message);
}

export default function(opts){
	opts = Object.assign({
		method:'get',
		type:'json',
		headers:{
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		credentials: 'include'//send cookies in a cross-origin resource sharing (CORS) request
	},opts);
	opts.method = opts.method.toLocaleLowerCase();
	if(typeof opts.body != 'undefined') {
		if(opts.method == 'get') {
			let paramsArray = [];
			Object.keys(opts.body).forEach(key => paramsArray.push(key + '=' + opts.body[key]));
			opts.url = (opts.url.indexOf("http")>=0?opts.url : portal.baseUrl);
			if (opts.url.search(/\?/) === -1) {
				opts.url +=  '?' + paramsArray.join('&')
			} else {
				opts.url +=  '&' + paramsArray.join('&')
			}
			opts.body = undefined;
			delete opts.body;
		}
		if(opts.method == 'post') {
			if(typeof(opts.body)=="object"){
				opts.body.format="json";
			}
			opts.url = portal.baseUrl + opts.url;
			opts.body = typeof opts.body == 'string' ? opts.body : JSON.stringify(opts.body);
		}
	}
	console.log(opts.url,opts)
	let p1 = new Promise((resolve,reject)=>{
		Pubsub.publish("showLoading");
		fetch(opts.url,opts).then((response)=>{
			Pubsub.publish("closeLoading");
			if(!response.ok) {
				let error = new Error();
				error.name = response.status;
				error.data = response;
				reject(error)
			}
			response.text().then(function(text) {
				if(opts.type == 'json') {
					resolve(JSON.parse(text));
				}
				else {
					resolve(text);
				}
			});
		})
	});
	let p2 = requestTimeout();
	return Promise.race([p1,p2]);
}

/// 设置超时的方法
function requestTimeout(){
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			let error = new Error();
			error.name = "timeout";
			error.message = "timeout";
			reject({status:0,message:"网络超时，请稍后再试"});//reject依然会执行then方法，返回undefined。所以用resolve。
		},100000);
	})
}
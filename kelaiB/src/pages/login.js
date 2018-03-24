/**
 * Created by luojie on 2017/11/9.
 */
import React from "react";
import {
	View,
	Text,
	Image,
	AsyncStorage
} from "react-native";
import *as WeChat from 'react-native-wechat';
import wxConfig from "../config/wxConfig";
import tipWords from "../config/tipWords";
import GlobalData from "../util/globalData";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Storage from "../util/storage";

import {
	weChatLogin
} from "../actions/loginAction";

import {
	Header,
	DefaultButton,
} from "../components"

const closeIcon = require("../images/components/close-icon.png");
const logoIcon = require("../images/components/logo.png");
const wxIcon = require("../images/components/wx-icon.png");
import SplashScreen from 'react-native-splash-screen';


 class Login extends React.PureComponent{
	constructor(props){
		super(props);
		this.login = this.login.bind(this);
		WeChat.registerApp(wxConfig.appId);
	}
	componentDidMount (){
		// Storage.setItem("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA5LzA5L2lkZW50aXR5L2NsYWltcy95c3QvYWNjb3VudC9zZWN1cml0eXN0YW1wIjoiM0Q1MEMxODI2RTkxNDA4MEExMkFEOTRCODMxRTg4Q0YiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA5LzA5L2lkZW50aXR5L2NsYWltcy95c3QvYWNjb3VudC90eXBlIjoiU1lTVEVNIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS9hY2Nlc3Njb250cm9sc2VydmljZS8yMDEwLzA3L2NsYWltcy9pZGVudGl0eXByb3ZpZGVyIjoiQVNQLk5FVCBJZGVudGl0eSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDkvMDkvaWRlbnRpdHkvY2xhaW1zL2plcnJ5c2hhdy9hcHBsaWNhdGlvbi9hY2NvdW50aWQiOiIyNmFmYjM4Yi0wOGEwLTQyODMtYTVjNC1lYjQxMWY5ODE5MmQiLCJuYmYiOjE1MTM1MzE5MDcsImV4cCI6MTUxNDc0MTUwNywiaXNzIjoiWVNGSXNzdWVyIiwiYXVkIjoiWVNGQXVkaWVuY2UifQ.UXULx-GrsMVJXOs42q1S9bCcOJt44vH8ksPt9a79tt0");
		// Storage.setItem("isLogin","1");
		SplashScreen.hide();//处理启动页白屏过度跳转
	}
	// getAccessToken1(code){
	// 	let {fetch} = this.props.network;
	// 	let {weChatLogin} = this.props;
	// 	let p1 = fetch({
	// 		url:"https://api.weixin.qq.com/sns/oauth2/access_token",
	// 		method:"get",
	// 		body:{
	// 			appid:wxConfig.appId,
	// 			secret:wxConfig.appSecret,
	// 			code,
	// 			grant_type:"authorization_code"
	// 		}
	// 	}).then((result)=>{
	// 		return new Promise((resolve,reject)=>{
	// 			resolve(result);
	// 		})
	// 	});
	// 	p1.then((result)=>{
	// 		fetch({
	// 			url:"https://api.weixin.qq.com/sns/userinfo",
	// 			body:{
	// 				access_token:result.access_token,
	// 				openid:result.openid,
	// 			}
	// 		}).then((data)=>{
	// 			let param = {
	// 				openId:data.openid,
	// 				nickName:data.nickname,
	// 				gender:data.sex,
	// 				province:data.province,
	// 				city:data.city,
	// 				country:data.country,
	// 				avatar:data.headimgurl,
	// 				unionid:data.unionid,
	// 			};
	// 			weChatLogin(param,(result)=>{
	// 				let {accessToken,tokenType} = result.data;
	// 				Storage.setItem("Authorization",tokenType + " " +accessToken);
	// 			});
	// 		})
	// 	})
	// }
	 async login(){
		try {
			let isInstall = await this.isWXAppInstalled();//检查是否安装微信
			console.log("isInstall")
			if(isInstall){
				let codeResult = await this.getCode();//获取微信code
				console.log(codeResult,"1")
				let tokenResult = await this.getAccessToken(codeResult.code);//获取微信access_token
				console.log(tokenResult,"2")
				let userResult = await this.getUserInfo(tokenResult.access_token,tokenResult.openid);//获取微信用户信息
				console.log(userResult,"3")
				this.weLogin(userResult);
			}else{
				this.props.modal.toast({
					content:tipWords.not_install_wechat
				})
			}
		} catch(e){
			this.props.modal.toast({
				content:tipWords.server_system_error
			})
		}

		// WeChat.isWXAppInstalled()
		// 	.then((isInstalled) => {
		// 		if (isInstalled) {
		// 			WeChat.sendAuthRequest(scope,state).then((result)=>{
		// 				this.getAccessToken(result.code);
		// 			})
		// 		}
		// 	})
	}
	 isWXAppInstalled(){
		 return WeChat.isWXAppInstalled();
	 }
	 getCode(){
		 let scope = 'snsapi_userinfo';
		 let state = 'wechat_sdk_demo';
		return WeChat.sendAuthRequest(scope,state)
	 }
	 getAccessToken(code){

		 return ajax({
					url:"https://api.weixin.qq.com/sns/oauth2/access_token",
					method:"get",
					body:{
						appid:wxConfig.appId,
						secret:wxConfig.appSecret,
						code,
						grant_type:"authorization_code"
					}
				})
	 }
	 getUserInfo(access_token,openid){
	 	return  ajax({
					url:"https://api.weixin.qq.com/sns/userinfo",
					body:{
						access_token,
						openid,
					}
				})
	 }
	 weLogin(data){
		 let param = {
			 openId:data.openid,
			 nickName:data.nickname,
			 gender:data.sex,
			 province:data.province,
			 city:data.city,
			 country:data.country,
			 avatar:data.headimgurl,
			 unionid:data.unionid,
		 };
		 ajax({
			 url:"/Merchant/WeChatAuthorization",
			 method:"post",
			 body: param
		 }).then((result)=>{
		 	console.log(result)
		 	if(result.status === 1){
				let {accessToken,tokenType,isBindPhone} = result.data;
				let {navigate} = this.props.navigation;
				Storage.setItem("Authorization",tokenType + " " +accessToken);

				if(isBindPhone){
					Storage.getItem("shopId").then((result)=>{
						if(result){
							GlobalData.userInfo.shopId = result;
							navigate("index");
						}else{
							navigate("shopApply");
						}
					});
				}else{
					navigate("bindPhone");
				}

				// Storage.setItem("isLogin","1");
			}
		 });
	 }
	render(){
		return(
			<View style = {styles.wrapper}>
				<Header
					{...this.props}
					iconStyle = {styles.closeIconStyle}
					icon = {closeIcon}
					title = "登录"/>
				<View style = {styles.content}>
					<Image style={styles.logoIcon} source={logoIcon}/>
					<Text style={styles.isMoreText}>账号太多记不住？</Text>
					<Text style={styles.wxLoginTips}>微信一键登录，更安全，更方便</Text>
					<View style = {styles.loginBtnWrapper}>
						<DefaultButton onPress = {this.login} style = {styles.loginBtn}>
							<Image source={wxIcon}/>
							<Text style={styles.loginBtnText}>微信一键登录</Text>
						</DefaultButton>
					</View>

				</View>
			</View>
		)
	}
}

export default connect(
	(state)=>{
		return{
			loginInfo:state.LoginReducer
		}
	},
	(dispatch)=>{
		return{
			weChatLogin:bindActionCreators(weChatLogin, dispatch)
		}
	}
)(Login)

const styles = createStyle({
	wrapper:{
		flex:1,
		backgroundColor:"#fff",
	},
	closeIconStyle:{
		height:16,
		width:16
	},
	content:{
		flex:1,
		alignItems:"center",
		paddingHorizontal:27,
	},
	logoIcon:{
		marginTop:130/667 * screenHeight
	},
	isMoreText:{
		marginTop:20,
		fontSize:12,
		color:"#666"
	},
	wxLoginTips:{
		marginTop:8,
		fontSize:12,
		color:"#666"
	},
	loginBtnWrapper:{
		height:45,
		flexDirection:"row",
		marginTop:130/667 * screenHeight
	},
	loginBtn:{
		flex:1,
		flexDirection:"row",
		backgroundColor:"#FF5940",
		borderRadius:45,
		justifyContent:"center",
		alignItems:"center"
	},
	loginBtnText:{
		marginLeft:10,
		fontSize:18,
		color:"#fff",
		fontWeight:"bold"
	}
});
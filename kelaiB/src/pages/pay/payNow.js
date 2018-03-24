/**
 * Created by luojie on 2017/11/11.
 */
import React from "react";
import {
	View,
	Text,
	Image,
	ImageBackground
} from "react-native";

import {
	Header,
	DashLine,
	SubmitButton,
	DefaultButton
} from "../../components";

import Alipay from 'react-native-payment-alipay';
import * as WeChat from "react-native-wechat";

import wxConfig from "../../config/wxConfig";
import Api from "../../config/Api";


const payIcon = require("../../images/pay/pay-icon.png");
const bgImg = require("../../images/pay/bg.png");
const checkedIcon = require("../../images/pay/checked.png");
const unCheckedIcon = require("../../images/pay/un-checked.png");
const WXIcon = require("../../images/pay/wx-pay.png");
const aliIcon = require("../../images/pay/ali-pay.png");

export default class PayNow extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			select:true,
		};
		this.payNow = this.payNow.bind(this);
	}
	componentDidMount(){
		WeChat.registerApp(wxConfig.appId);
	}
	select(flag){
		this.setState({
			select:flag
		})
	}
	async payNow(){
		let {select} = this.state;
		let {orderInfo,balanceAmount} = this.props.navigation.state.params;
		let {orderNo} = orderInfo;
		let paymentType = 1;
		if(select){  //微信支付
			if(paymentType>0){  //余额大于0表示有余额支付
				type = 5;  //  微信及余额支付
			}else{
				paymentType = 1;  //微信支付
			}
		}else{ //支付宝支付
			if(balanceAmount>0){
				paymentType = 4 ; // 支付宝及余额支付
			}else{
				paymentType = 2;  //支付宝支付
			}
		}
		let param = {
			orderCode:orderNo,
			paymentType,
		};
		try {
			let signObj = await this.getSign(param);
			console.log(signObj)
			if(select){
				let {wechatCredential} = signObj.data;
				WeChat.pay({
					partnerId:wechatCredential.partnerId+"",
					prepayId:wechatCredential.prepayId+"",
					nonceStr:wechatCredential.nonceStr+"",
					timeStamp:wechatCredential.timeStamp+"",
					package:wechatCredential.package+"",
					sign:wechatCredential.sign+"",
				}).then((result)=>{
					console.log(result)
					if(result.errCode === 0 ){
						this.props.navigation.navigate("withDrawSuccess")
					}
				})
			}else{
				let {alipayCredential} = signObj.data;
				Alipay.pay(alipayCredential).then((r)=>{
					let payResult = r.split(";")[0];
					console.log(payResult)
					let code = this.getValue(payResult,"resultStatus");
					console.log(code);
					if(code == 9000){
						this.props.navigation.navigate("withDrawSuccess")
					}
				},(err)=>{
					console.log(err)
				})
			}
		} catch(err) {
			console.log(err);
		}
	}
	getValue(content, key) {
		let prefix = key + "={";
		return content.substring(content.indexOf(prefix) + prefix.length,content.lastIndexOf("}"));
	}
	getSign(param){
		return ajax({
			url:Api.getPaySign,
			body:param,
			method:"post"
		});
	}
	async Test(){
		try {
			let a = await this.test1();
			let b = await this.test2(43);
		} catch(err) {
			console.log(err);
		}
	}
	test1(){

		return	ajax({
			url:"aa/bb",
			body:{
				shopId:"",
			},
		})
	}
	test2(num){
		return	ajax({
			url:Api.getShopLicense,
			body:{
				shopId:"46",
			},
		})
	}
	render() {
		let {select} = this.state;
		let {orderInfo,des} = this.props.navigation.state.params;
		return (
			<View style = {styles.wrapper}>
				<Header {...this.props} title = "立即支付"/>
				<ImageBackground
					source={bgImg}
					style = {styles.imgOutWrapper}>
					<View>
						<Image style = {styles.payIcon} source={payIcon}/>
					</View>
					<View style = {styles.rightViewWrapper}>
						<View style = {styles.amountRowWrapper}>
							<View >
								<Text style = {styles.amountText}>￥{orderInfo.paymentAmount.toFixed(2)}</Text>
								<DashLine/>
							</View>
							<View style = {{flex:1}}/>
							<View>
								<Text style = {styles.numText}>{des}</Text>
								<DashLine/>
							</View>
						</View>
						<View style = {styles.orderWrapper}>
							<View>
								<Text style = {styles.numText}>订单号-{orderInfo.orderNo}</Text>
								<DashLine/>
							</View>
							<View style = {{flex:1}}/>
						</View>
					</View>
				</ImageBackground>
				<View style = {styles.payWayWrapper}>
					<DefaultButton onPress = {this.select.bind(this,true)} style = {styles.payWayRow}>
						<View style = {styles.payWayLeftRow}>
							<Image style={styles.payWayIcon} source={WXIcon}/>
							<Text>微信支付</Text>
						</View>
						<Image source={select?checkedIcon:unCheckedIcon}/>
					</DefaultButton>
					<DefaultButton onPress = {this.select.bind(this,false)} style = {styles.payWayRow}>
						<View style = {styles.payWayLeftRow}>
							<Image style={styles.payWayIcon}  source={aliIcon}/>
							<Text>支付宝</Text>
						</View>
						<Image source={!select?checkedIcon:unCheckedIcon}/>
					</DefaultButton>
				</View>
				<View style = {styles.submitBtn}>
					<SubmitButton onPress = {this.payNow}>立即支付</SubmitButton>
				</View>
			</View>
		)
	}
}

const styles = createStyle({
	wrapper:{
		flex:1,
		backgroundColor:"#f4f4f4"
	},
	imgOutWrapper:{
		// backgroundColor:"#FF5940",
		height:100,
		flexDirection:"row",
		width:screenWidth,
		paddingHorizontal:15,
	},
	payIconWrapper:{
		height:66,
		width:66,
		borderRadius:33,
		backgroundColor:"#fff"
	},
	payIcon:{
		marginTop:16,
		marginRight:10
	},
	rightViewWrapper:{
		flex:1
	},
	amountRowWrapper:{
		flexDirection:"row",
		justifyContent:"space-between",
		alignItems:"flex-end",
		backgroundColor:"transparent",
		marginTop:25
	},
	amountText:{
		fontSize:20,
		color:"#fff",
		fontWeight:"bold"
	},
	numText:{
		fontSize:12,
		color:"#fff",
	},
	orderWrapper:{
		marginTop:6,
		backgroundColor:"transparent",
		flexDirection:'row'
	},
	payWayWrapper:{
		marginTop:8
	},
	payWayRow:{
		backgroundColor:"#fff",
		paddingHorizontal:15,
		flexDirection:"row",
		justifyContent:"space-between",
		paddingTop:19,
		paddingBottom:18,
		marginTop:10,
		alignItems:"center"
	},
	payWayLeftRow:{
		flexDirection:"row",

	},
	payWayIcon:{
		marginRight:10
	},
	submitBtn:{
		height:44,
		paddingHorizontal:15,
		marginTop:20
	}
})
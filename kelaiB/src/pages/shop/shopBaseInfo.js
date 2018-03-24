/**
 * Created by luojie on 2017/11/10.
 */
import React from "react";
import {
	View,
	Image,
	Text,
	ScrollView,
	TextInput
} from "react-native";

import {
	Header,
	DefaultButton
} from "../../components";

import RowLine from "../../components/shop/rowLine";

const closeIcon = require("../../images/components/close-icon.png");
const logoIcon = require("../../images/components/logo.png");
import Api from "../../config/Api";

export default class Info extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			info:{
				shopAddress:"高新区大数据大数据肯定假萨克雷弹尽粮绝",
				category:"餐饮",
				businessHours:"10：00~20：00",
				shopName:"有一个店铺",
			}
		}
	}
	componentDidMount(){
		let shopId = {shopId:1};
		ajax({
			url:Api.getShopBaseInfo,
			body:shopId,
			method:'get'
		}).then((result)=>{
			console.log(result)
		})

	}
	render(){
		let {shopAddress,category,businessHours,shopName} = this.state.info;
		return(
			<View style = {styles.wrapper}>
				<Header title={"基本信息"}/>
				<View style = {styles.logoWrapper}>
					<Image style = {styles.logoImg} source={logoIcon}/>
				</View>
				<RowLine
					leftText = "店铺名称"
					rightText = {shopName}/>
				<RowLine
					leftText = "经营品类"
					rightText = {category}/>
				<RowLine
					leftText = "店铺地址"
					rightText = {shopAddress}/>
				<RowLine
					leftText = "营业时间"
					rightText = {businessHours}/>
				<RowLine
					leftText = "详细地址"
					rightText = {shopAddress}/>
				<RowLine
					leftText = "人均消费"
					rightText = {10} />

			</View>
		)
	}
}

const styles = createStyle({
	wrapper:{
		flex:1,
		backgroundColor:"#f4f4f4"
	},
	nextBtn:{
		color:"#FF5940",
		fontSize:16,
	},
	logoWrapper:{
		justifyContent:"center",
		alignItems:"center",
		paddingVertical:24
	},
	logoImg:{
		height:70,
		width:70,
		borderRadius:35,
	},
});
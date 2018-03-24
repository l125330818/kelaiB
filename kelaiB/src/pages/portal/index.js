/**
 * Created by luojie on 2017/10/11.
 */
import React,{PureComponent} from "react";

import {StyleSheet,Image} from "react-native";

import {TabNavigator} from "react-navigation";
import Enhance from "../../components/mixin/Enhance";

import HomePage from "./homePage";
import Wallet from "./wallet";
import Shop from "./shop";
import Setting from "./setting";

const homeDefaultIcon = require("../../images/portal/home-default.png");
const homeSelectIcon = require("../../images/portal/home-select.png");
const walletDefaultIcon = require("../../images/portal/wallet-default.png");
const walletSelectIcon = require("../../images/portal/wallet-select.png");
const shopDefaultIcon = require("../../images/portal/shop-default.png");
const shopSelectIcon = require("../../images/portal/shop-select.png");
const settingDefaultIcon = require("../../images/portal/setting-default.png");
const settingSelectIcon = require("../../images/portal/setting-select.png");

const Index = TabNavigator({
	homePage: {
		screen:  Enhance(require("./homePage").default),
		navigationOptions:{
			tabBarLabel:"首页",
			showLabel:false,
			tabBarIcon: ({tintColor,focused}) => {
				let imgSource = focused?homeSelectIcon:homeDefaultIcon
				return (<Image source={imgSource} />)
			},
		}
	},
	wallet: {
		screen:  Enhance(require("./wallet").default),
		navigationOptions:{
			tabBarLabel:"钱包",
			showLabel:false,
			tabBarIcon: ({tintColor,focused}) => {
				let imgSource = focused?walletSelectIcon:walletDefaultIcon
				return (<Image source={imgSource} />)
			},
		}
	},
	shop: {
		screen:  Enhance(require("./shop").default),
		navigationOptions:{
			tabBarLabel:"店铺",
			showLabel:false,
			tabBarIcon: ({tintColor,focused}) => {
				let imgSource = focused?shopSelectIcon:shopDefaultIcon
				return (<Image source={imgSource} />)
			},
		}
	},
	setting: {
		screen:  Enhance(require("./setting").default),
		navigationOptions:{
			tabBarLabel:"设置",
			showLabel:false,
			tabBarIcon: ({tintColor,focused}) => {
				let imgSource = focused?settingSelectIcon:settingDefaultIcon
				return (<Image source={imgSource} />)
			},
		}
	},
}, {
	tabBarPosition: 'bottom',
	header:null,
	animationEnabled:true,
	swipeEnabled:false,
	tabBarOptions:{
		showIcon:true,
		labelStyle: {
			fontSize: 10,
			color:"#333",
			paddingTop:0,
			marginTop:0

		},
		style:{
			backgroundColor:"#f7f7f7",
			height:49,
			borderTopWidth:StyleSheet.hairlineWidth,
		},

		pressOpacity:0.6,
		indicatorStyle:{
			height:0
		},
		scrollEnabled:false,
	}
});
export default Index;
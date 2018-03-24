/**
 * Created by luojie on 2017/12/20.
 * 启动页
 */
import React from "react";
import {
	View,
	Image,
	ImageBackground,
	Text
} from "react-native";

import {NavigationActions} from "react-navigation";
import * as Storage from "../util/storage";
import GlobalData from "../util/globalData";

const bgImg = require("../images/portal/start-bg.png");
const logo = require("../images/portal/start-logo.png");

export default class Demo extends React.PureComponent {
	constructor(props) {
		super(props);
	}
	componentWillMount(){
		Storage.getItem("shopId").then((result)=>{
			if(result){
				GlobalData.userInfo.shopId = result;
			}
		});
		Storage.getItem("isLogin").then((result)=>{
			let {dispatch} = this.props.navigation;
			setTimeout(()=>{
				if(result === "1"){
					dispatch(this.resetAction("index"));
				}else{
					dispatch(this.resetAction("login"));
				}
			},0)

		});

	}
	resetAction(route){
		return NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({routeName: route, params: { foo: 'bar' }})
			]

		})
	}
	test(){
		{/*<View style = {styles.wrapper}>*/}
			{/*<ImageBackground source = {bgImg} style = {styles.imgBackground}>*/}
				{/*<View style = {styles.content}>*/}
					{/*<Image source={logo}/>*/}
					{/*<Text style = {styles.desText}>实体店铺营销工具——客多客</Text>*/}
				{/*</View>*/}
				{/*<View style = {styles.bottomRow}>*/}
					{/*<Text style = {styles.bottomText}>Copyright© 2017 成都易叁科技有限公司</Text>*/}
				{/*</View>*/}
			{/*</ImageBackground>*/}
		{/*</View>*/}
	}
	render() {
		return (
			null
		)
	}
}

const styles = createStyle({

	wrapper:{
		flex:1
	},
	imgBackground:{
		flex:1
	},
	bottomRow:{
		height:60,
		justifyContent:"center",
		alignItems:"center"
	},
	bottomText:{
		backgroundColor:"transparent",
		color:"#666",
		fontSize:12
	},
	content:{
		flex:1,
		justifyContent:"center",
		alignItems:"center"
	},
	desText:{
		color:"#FF5940",
		fontSize:18,
		marginTop:30,
		backgroundColor:"transparent",
		fontWeight:"bold"
	}
});
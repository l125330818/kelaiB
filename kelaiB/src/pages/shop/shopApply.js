/**
 * Created by luojie on 2017/10/11.
 * 店铺申请
 */

import React from "react";
import {
	View,
	Text,
	TouchableOpacity
} from "react-native";
import ScrollableTabView,{DefaultTabBar} from "react-native-scrollable-tab-view";
import {
	Header,
	SubmitButton
} from "../../components"
import ShopApplyList from "../../components/shop/shopApplyList";
import GlobalData from "../../util/globalData";
import SplashScreen from 'react-native-splash-screen';
export default class Apply extends React.PureComponent{
	constructor(props){
		super(props);
		this.tab = [
			{name:"已完成",type:3},
			{name:"审核中",type:2},
			{name:"待处理",type:1},
		];
		this.onChangeTab = this.onChangeTab.bind(this);
		this.createNewShop = this.createNewShop.bind(this);
	}
	componentDidMount(){
		SplashScreen.hide();//处理启动页白屏过度跳转
	}
	onChangeTab(obj){
		console.log(obj)
	}
	createNewShop(){
		GlobalData.userInfo.shopId = "";
		let {navigate} = this.props.navigation;
		navigate("shopApplyBaseInfo",{shopId:""});
	}
	render(){
		return(
			<View style = {styles.wrapper}>
				<Header {...this.props} title = {"店铺申请"}/>
				<ScrollableTabView
					tabBarBackgroundColor = "#fff"
					tabBarTextStyle = {{fontSize:15,fontWeight:"bold"}}
					tabBarActiveTextColor = "#FD6141"
					tabBarInactiveTextColor = "#999"
					onChangeTab = {this.onChangeTab}
					renderTabBar={() => <DefaultTabBar tabStyle = {{paddingBottom:0}} style={{borderWidth:0,height:40}}/>}
					tabBarUnderlineStyle={{backgroundColor:"#FD6141",height:2}}>
					{
						this.tab.map((item,index)=>{
							return(
								<ShopApplyList {...this.props} key = {index} type = {item.type} tabLabel = {item.name}/>
							)
						})
					}
				</ScrollableTabView>
				<View style = {styles.bottomRow}>
					<SubmitButton onPress = {this.createNewShop}>新建店铺</SubmitButton>
				</View>
			</View>
		)
	}
}

const styles = createStyle({
	wrapper:{
		flex:1,
		backgroundColor:"#f4f4f4",
		position:"relative"
	},
	bottomRow:{
		position:"absolute",
		bottom:0,
		backgroundColor:"#fff",
		height:60,
		flexDirection:"row",
		paddingVertical:10,
		paddingHorizontal:15,
		width:screenWidth
	}
})
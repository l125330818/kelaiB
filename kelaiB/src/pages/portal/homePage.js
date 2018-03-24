/**
 * Created by luojie on 2017/10/11.
 */
import React,{PureComponent} from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
	Dimensions,
	ScrollView,
	FlatList,
	RefreshControl,
	ImageBackground
} from "react-native";

import {
	DefaultButton,
	CustomHeader,
	YScrollView
} from "../../components";
import PercentageCircle from "../../components/ysUI/progress/circleProgress";
import Swipeout from 'react-native-swipeout';

const homeDefaultIcon = require("../../images/portal/home.png");
const scanIcon = require("../../images/portal/scan-code.png");
const historyIcon = require("../../images/portal/history-icon.png");
const tipIcon = require("../../images/portal/tip-icon.png");
const outerCircleIcon = require("../../images/portal/outer-circle.png");
const innerCircleIcon = require("../../images/portal/inner-circle.png");
import SplashScreen from 'react-native-splash-screen';

const bg1 = require("../../images/portal/home-bg1.png");
const bg2 = require("../../images/portal/home-bg2.png");
const bg3 = require("../../images/portal/home-bg3.png");
const bg4 = require("../../images/portal/home-bg4.png");


class Home extends PureComponent{
	// static navigationOptions={
	// 	header: null,
	// 	tabBarLabel:"首页",
	// 	showLabel:false,
	// 	tabBarIcon: ({tintColor,focused}) => {
	// 		let imgSource = focused?homeSelectIcon:homeDefaultIcon
	// 		return (<Image source={imgSource} />)
	// 	},
	//
	// }
	constructor(props){
		super(props);
		this.renderRight = this.renderRight.bind(this);
		this.renderLeft = this.renderLeft.bind(this);
		this.renderItem = this.renderItem.bind(this);
		this.state = {
			dataList:[
				{key:1,time:"15:17:18",num:"1次"},
				{key:2,time:"15:17:18",num:"2次"},
				{key:3,time:"15:17:18",num:"3次"},
			],
			leftButton:[
				{
					backgroundColor:'#FFBB44',
					color:'white',
					text:'标记员工',
					height:60,
					width:60,
					onPress:()=>{this.aaaa()}
				},
			]
		}
		this.aaaa = this.aaaa.bind(this);

	}
	aaaa(){
		console.log(1111)
	}
	componentDidMount(){
		SplashScreen.hide();//处理启动页白屏过度跳转
	}
	jump(){
		this.props.navigation.navigate("shopApply");
	}
	alert(){
console.log(this.props.modal.alert())
	}
	leftPress(){
	}
	renderLeft(){

		return(
			<DefaultButton onPress={this.leftPress.bind(this)}>
				<Image source={scanIcon}/>
			</DefaultButton>
		)
	}

	renderRight(){
		return(
			<View style = {styles.renderRightView}>
				<DefaultButton style = {styles.historyIconStyle}>
					<Image source={historyIcon}/>
				</DefaultButton>
				<DefaultButton>
					<Image source={tipIcon}/>
				</DefaultButton>
			</View>

		)
	}
	renderItem(){
		return(
			<View style = {[styles.row]}>
				<View style = {styles.cell1}>
					<Image style = {styles.logo} source={homeDefaultIcon}/>
					<Text >昵称昵称昵称昵称昵称</Text>
				</View>
				<View style = {styles.nav2}>
					<Text style={styles.color999}>在店时长</Text>
				</View>
				<View style = {styles.nav2}>
					<Text style={styles.color999}>第几次来</Text>
				</View>
			</View>
		)
	}
	swipeScroll(e){
		console.log(e)
	}
	render(){
		let {dataList,leftButton} = this.state;
		return(
			<View style = {styles.container}>
				<CustomHeader
					renderLeft = {this.renderLeft}
					renderRight = {this.renderRight}
					barColor = "#fff"
					title="客流分析"/>
				<YScrollView>
					<View style = {styles.content}>
						<PercentageCircle
							progress={0.6}
							size = {235}
							color = "#FF5940"
							thickness = {26}
							indeterminate={false}
						>
							<ImageBackground source = {outerCircleIcon} style = {styles.outerCircle}>
								<ImageBackground  style = {styles.outerCircleWrapper} source = {innerCircleIcon}>
									<View style = {styles.innerCircle}>
										<Text style = {styles.todayTip}>今日进店人数</Text>

										<Text style = {styles.num}>139</Text>
										<Text style = {styles.yesterdayTip}>昨日进店 {20000}</Text>
									</View>
								</ImageBackground>
							</ImageBackground>

						</PercentageCircle>
					</View>
					{/* <View style = {styles.statisticsContainer}>
						<View style = {styles.statisticsCell}>
							<ImageBackground source = {bg1} style = {styles.bgCell1}>
								<Text style = {styles.enterNum}>{28}人</Text>
								<Text style = {styles.labelText}>今日进店人数</Text>
							</ImageBackground>
							<View style = {styles.fillView}/>
							<ImageBackground source = {bg2} style = {styles.bgCell1}>
								<Text style = {styles.enterNum}><Text style={styles.moneyTag}>￥</Text>{9999.00}</Text>
								<Text style = {styles.labelText}>今日成交额</Text>
							</ImageBackground>
						</View>
						<View style = {[styles.statisticsCell,styles.mt5]}>
							<ImageBackground source = {bg3} style = {styles.bgCell1}>
								<Text style = {styles.enterNum}>{28}个</Text>
								<Text style = {styles.labelText}>今日发放个数</Text>
							</ImageBackground>
							<View style = {styles.fillView}/>
							<ImageBackground source = {bg4} style = {styles.bgCell1}>
								<Text style = {styles.enterNum}><Text style={styles.moneyTag}>￥</Text>{(9999).toFixed(2)}</Text>
								<Text style = {styles.labelText}>今日发放总额</Text>
							</ImageBackground>
						</View>
					</View> */}
					<View style = {styles.customerRow}>
						<View style = {styles.dataRow}>
							<View style = {styles.cellWrapper}>
								<View style = {[styles.cell,styles.borderRight]}>
									<Text style = {styles.customerNum}>111</Text>
									<Text style={styles.customerTip}>新顾客</Text>

								</View>
								<View style = {[styles.cell,styles.borderRight]}>
									<Text style = {styles.customerNum}>801</Text>
									<Text style = {styles.customerTip}>老顾客</Text>

								</View>
								<View style = {[styles.cell,styles.borderRight]}>
									<Text style = {styles.customerNum}>434min</Text>
									<Text style = {styles.customerTip}>平均在店时长</Text>
								</View>
								<View style = {styles.cell}>
									<Text style = {styles.customerNum}>20%</Text>
									<Text style = {styles.customerTip}>购买率</Text>
								</View>
							</View>
						</View>
					</View>
					<View style = {styles.list}>
						<View style = {styles.nav}>
							<View style = {styles.nav1}>
								<Text style={styles.color999}>今日顾客</Text>
							</View>
							<View style = {styles.nav2}>
								<Text style={styles.color999}>在店时长</Text>
							</View>
							<View style = {styles.nav2}>
								<Text style={styles.color999}>第几次来</Text>
							</View>
						</View>
						<Swipeout right = {leftButton}>
							<View style = {[styles.row]}>
								<View style = {styles.cell1}>
									<Image style = {styles.logo} source={homeDefaultIcon}/>
									<Text >昵称昵称昵称昵称昵称</Text>
								</View>
								<View style = {styles.nav2}>
									<Text style={styles.color999}>12分钟</Text>
								</View>
								<View style = {styles.nav2}>
									<Text style={styles.color999}>1次</Text>
								</View>
							</View>
						</Swipeout>
						<Swipeout right = {leftButton}>
							<View style = {[styles.row]}>
								<View style = {styles.cell1}>
									<Image style = {styles.logo} source={homeDefaultIcon}/>
									<Text >昵称昵称昵称昵称昵称</Text>
								</View>
								<View style = {styles.nav2}>
									<Text style={styles.color999}>12分钟12分钟12分钟</Text>
								</View>
								<View style = {styles.nav2}>
									<Text style={styles.color999}>1次</Text>
								</View>
							</View>
						</Swipeout>
						<Swipeout scroll = {this.swipeScroll.bind(this)} right = {leftButton}>
							<View style = {[styles.row]}>
								<View style = {styles.cell1}>
									<Image style = {styles.logo} source={homeDefaultIcon}/>
									<Text >昵称昵称昵称昵称昵称</Text>
								</View>
								<View style = {styles.nav2}>
									<Text style={styles.color999}>12分钟</Text>
								</View>
								<View style = {styles.nav2}>
									<Text style={styles.color999}>1次</Text>
								</View>
							</View>
						</Swipeout>


					</View>
					{/*<FlatList*/}
						{/*renderItem = {this.renderItem}*/}
						{/*data = {dataList}/>*/}
				</YScrollView>
			</View>
		)
	}
}
export default Home
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:"#f4f4f4",
	},
	num:{
		color:"#333",
		fontSize:40,
		marginVertical:5
	},
	todayTip:{
		fontSize:14,
		color:"#999"
	},
	yesterdayTip:{
		fontSize:12,
		color:"#999"
	},
	content:{
		paddingVertical:68,
		// paddingLeft:15,
		// backgroundColor:"#fff",
		flexDirection:"row",
		// marginVertical:10,
		flex:1,
		justifyContent:"center",
		alignItems:"center"
	},
	dataRow:{
		marginLeft:14,
		flex:1
	},
	fleRow:{
		flexDirection:"row"
	},
	circle:{
		height:11,
		width:11,
		borderRadius:11/2,
		marginRight:5
	},
	bgRed:{
		backgroundColor:"#FD6141"
	},
	bgGray:{
		backgroundColor:"#ececec"
	},
	mt5:{
		marginTop:5,
	},
	cellWrapper:{
		flex:1,
		flexDirection:"row"
	},
	cell:{
		flex:1,
		justifyContent:"center",
		alignItems:"center"
	},
	customerTip:{
		fontSize:12,
		color:"#999",
		// marginTop:8
	},
	borderRight:{
		borderRightWidth:hairlineWidth,
		borderColor:"#ECECEC"
	},
	minute:{
		color:"#333",
		fontSize:16
	},
	customerRow:{
		marginBottom:10,
		height:78,
		paddingVertical:15,
		backgroundColor:"#fff"
	},
	customerNum:{
		color:"#333",
		fontSize:18
	},
	list:{
		// backgroundColor:"#fff",
		// paddingLeft:15,

	},
	inShopTitle:{
		paddingVertical:13,
		backgroundColor:"#fff",
		paddingLeft:15,
	},
	shopWrapper:{
		// borderLeftWidth:2,
		// borderColor:"#FD6141",
		// paddingLeft:10
	},
	color999:{
		color:"#999"
	},
	nav:{
		flex:1,
		flexDirection:"row",
		height:40,
		borderBottomWidth:hairlineWidth,
		borderColor:"#ECECEC",
		backgroundColor:"#fff"
	},
	nav1:{
		flex:2,
		justifyContent:"center",
		width:0
	},
	nav2:{
		flex:1,
		justifyContent:"center",
		alignItems:"center",
		width:0
	},
	cell1:{
		flex:2,
		flexDirection:"row",
		paddingVertical:10,
		overflow:"hidden",
		width:0
	},
	logo:{
		height:40,
		width:40,
		borderRadius:20,
		marginRight:10
	},
	row:{
		flex:1,
		flexDirection:"row",
		borderBottomWidth:hairlineWidth,
		borderColor:"#ECECEC",
		height:60,
		backgroundColor:"#fff",
		paddingLeft:15,
	},
	font11:{
		fontSize:11
	},
	innerCircle:{
		height:160,
		width:160,
		borderRadius:80,
		backgroundColor:"#fff",
		alignItems:"center",
		justifyContent:"center"
		// shadowColor:"#333",
		// shadowOpacity:.23,
		// shadowOffset:{h:10,w:10},
		// elevation:4
	},
	outerCircle:{
		height:182,
		width:182,
		borderRadius:85,
		// height:182,
		// width:182,
		// borderRadius:92,
		alignItems:"center",
		justifyContent:"center",
		// shadowColor:"#333",
		// shadowOpacity:.23,
	},
	outerCircleWrapper:{
		height:170,
		width:170,
		alignItems:"center",
		justifyContent:"center",
	},
	renderRightView:{
		flexDirection:"row",
	},
	historyIconStyle:{
		marginRight:20
	},
	statisticsContainer:{
		backgroundColor:"#f4f4f4",
		padding:15,
	},
	statisticsCell:{
		flexDirection:"row",
		justifyContent:"space-between",

	},
	bgCell1:{
		height:110/667 * screenHeight,
		flex:1,
		paddingLeft:15,
		paddingTop:18/667 * screenHeight,
		width:0,
		borderRadius:5
	},
	fillView:{
		width:4
	},
	enterNum:{
		fontSize:28,
		color:"#fff",
		backgroundColor:"transparent"
	},
	labelText:{
		color:"rgba(255,255,255,.6)",
		fontSize:11,
		backgroundColor:"transparent"
	},
	moneyTag:{
		fontSize:12
	}
});
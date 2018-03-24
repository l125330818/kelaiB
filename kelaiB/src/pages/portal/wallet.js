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
	LeftBorderRow,
	IconRow
} from "../../components";

const homeDefaultIcon = require("../../images/portal/home.png");
const homeSelectIcon = require("../../images/portal/home-select.png");
const shadowImg1 = require("../../images/activity/activity-shadow1.png");
const shadowImg2 = require("../../images/activity/activity-shadow2.png");
const redPacketIcon = require("../../images/activity/red-packet-detail-icon.png");
const receiptIcon = require("../../images/activity/receipt-detail-icon.png");
const scanIcon = require("../../images/activity/activity-scan-icon.png");
const discountIcon = require("../../images/activity/discount-coupon.png");


export default class Wallet extends PureComponent{
	static navigationOptions={
		header: null,
		tabBarLabel:"活动",
		showLabel:false,
		tabBarIcon: ({tintColor,focused}) => {
			let imgSource = focused?homeSelectIcon:homeDefaultIcon
			return (<Image source={imgSource} />)
		},

	}
	constructor(props){
		super(props);
		this.state = {
			isRefreshing:false,
		}
		this.letPress = this.letPress.bind(this);
		this.hideRedPacket = this.hideRedPacket.bind(this);
		this._onRefresh = this._onRefresh.bind(this);
		this.withdraw = this.withdraw.bind(this);
		this.hideConsumeRedPacket = this.hideConsumeRedPacket.bind(this);
	}
	componentDidMount(){
	}
	letPress(){

	}
	renderLeft(){

		return(
			<DefaultButton onPress={this.leftPress}>
				<Image source={scanIcon}/>
			</DefaultButton>
		)
	}

	renderRight(){
		return(
			<DefaultButton>
				<Text style = {styles.white}>明细</Text>
			</DefaultButton>
		)
	}

	/// 藏红包
	hideRedPacket(){
		this.props.navigation.navigate('hideARRedPacket');
	}
	_onRefresh(){
		this.setState({
			isRefreshing:true
		})
	}
	withdraw(){
		this.props.navigation.navigate('withDraw');
	}
	hideConsumeRedPacket(){
		this.props.navigation.navigate("hideConsumeRedPacket");
	}
	render(){
		return(
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={this.state.isRefreshing}
						onRefresh={this._onRefresh}
						title="加载中..."
						colors={['#fff']}
						progressViewOffset = {5}
						progressBackgroundColor={"rgba(0,0,0,.4)"}
					/>
				}
				style = {styles.container}>
				<CustomHeader
					renderLeft = {this.renderLeft}
					style = {styles.headerColor}
					barColor = "#FF5940"
					titleStyle = {styles.titleStyle}
					renderRight = {this.renderRight}
					title="活动"/>
				<View style = {styles.accountWrapper}>
					<Text style = {[styles.white,styles.font12]}>账户余额</Text>
					<View style = {styles.accountRow}>
						<View style = {styles.flexRow}>
							<Text style = {[styles.white,styles.font20]}>￥</Text>
							<Text style = {[styles.white,styles.font40]}>1190.99</Text>
						</View>
						<View style = {[styles.flexRow,styles.tun]}>
							<DefaultButton onPress = {this.withdraw}>
								<Text style = {[styles.white,styles.font16]}>提现</Text>
							</DefaultButton>
						</View>
					</View>
				</View>
				<View style = {styles.itemWrapper}>
					<ImageBackground
						source = {shadowImg1}
						resizeMode = "stretch"
						style = {styles.shadowImg1}>
						<View style = {styles.itemInnerWrapper}>
							<View  style = {styles.itemBtnWrapper}>
								<DefaultButton onPress={this.hideRedPacket} style = {styles.itemTitleWrapper}>
									<Text style = {styles.itemTitle}>藏红包</Text>
								</DefaultButton>
								<DefaultButton style = {styles.detailBtn}>
									<Text style={styles.arDetailText}>详情</Text>
								</DefaultButton>
							</View>
							<View style = {styles.detailCell}>
								<View style = {styles.detailCell1}>
									<View style = {styles.detailInnerCell}>
										<Text style = {styles.smallTipText}>已领</Text>
										<Text style = {styles.color333}>
											<Text style = {styles.moneyTag}>￥</Text>
											8491.88
										</Text>
									</View>
								</View>
								<View style = {[styles.detailCell1,styles.borderRightNone]}>
									<View style = {styles.detailInnerCell}>
										<Text style = {styles.color333}>
											{100}个
											<Text style = {styles.numText}>(￥{1.45}元/个)</Text>
										</Text>
									</View>
								</View>
							</View>
							<View style = {styles.detailCell}>
								<View style = {styles.detailCell1}>
									<View style = {styles.detailInnerCell}>
										<Text style = {styles.smallTipText}>剩余</Text>
										<Text style = {styles.color333}>
											<Text style = {styles.moneyTag}>￥</Text>
											81.88
										</Text>
									</View>
								</View>
								<View style = {[styles.detailCell1,styles.borderRightNone]}>
									<View style = {styles.detailInnerCell}>
										<Text style = {styles.color333}>
											{100}个
										</Text>
									</View>
								</View>
							</View>

						</View>
					</ImageBackground>
				</View>
				<View style = {styles.itemWrapper}>
					<ImageBackground
						source = {shadowImg1}
						resizeMode = "stretch"
						style = {[styles.shadowImg1,{marginTop:8}]}>
						<View style = {styles.itemInnerWrapper}>
							<View style = {styles.itemBtnWrapper}>
								<DefaultButton
									onPress = {this.hideConsumeRedPacket}
									style =  {[styles.itemTitleWrapper,styles.consumeBg]}>
									<Text style = {styles.itemTitle}>设置消费返现</Text>
								</DefaultButton>
								<DefaultButton style = {styles.detailBtn}>
									<Text style = {styles.conDetailText}>详情</Text>
								</DefaultButton>
							</View>

							<View style = {styles.detailCell}>
								<View style = {styles.detailCell1}>
									<View style = {styles.detailInnerCell}>
										<Text style = {styles.smallTipText}>已领</Text>
										<Text style = {styles.color333}>
											<Text style = {styles.moneyTag}>￥</Text>
											999.00
										</Text>
									</View>
								</View>
								<View style = {[styles.detailCell1,styles.borderRightNone]}>
									<View style = {styles.detailInnerCell}>
										<Text style = {styles.color333}>
											{100}个

										</Text>
									</View>
								</View>
							</View>
							<View style = {styles.detailCell}>
								<View style = {styles.detailCell1}>
									<View style = {styles.detailInnerCell}>
										<Text style = {styles.smallTipText}>剩余</Text>
										<Text style = {styles.color333}>
											<Text style = {styles.moneyTag}>￥</Text>
											81.88
										</Text>
									</View>
								</View>
								<View style = {[styles.detailCell1,styles.borderRightNone]}>
									<View style = {styles.detailInnerCell}>
										<Text style = {styles.color333}>
											{10}%
											<Text style = {styles.numText}>(返现比例)</Text>
										</Text>
									</View>
								</View>
							</View>
						</View>
					</ImageBackground>
				</View>
				<View style = {styles.itemWrapper}>
					<ImageBackground
						source = {shadowImg2}
						resizeMode = "stretch"
						style = {[styles.shadowImg1,{marginTop:8}]}>
						<View style = {styles.itemInnerWrapper}>
							<View style = {styles.itemBtnWrapper}>
								<DefaultButton
									onPress = {this.hideConsumeRedPacket}
									style = {[styles.itemTitleWrapper,styles.discountBg]}>
									<Text style = {styles.itemTitle}>优惠券：满100减50</Text>
								</DefaultButton>
								{/*<DefaultButton style = {styles.detailBtn}>*/}
									{/*<Text style = {styles.disMoreText}>更多</Text>*/}
								{/*</DefaultButton>*/}

							</View>
							<View style = {styles.detailCell}>
								<View style = {styles.detailCell1}>
									<View style = {styles.detailInnerCell}>
										<Text style = {styles.smallTipText}>已领</Text>
										<Text style = {styles.color333}>
											{999}张
										</Text>
									</View>
								</View>
								<View style = {[styles.detailCell1,styles.borderRightNone]}>
									<View style = {styles.detailInnerCell}>
										<Text style = {styles.smallTipText}>已用</Text>
										<Text style = {styles.color333}>
											{999}张
										</Text>
									</View>
								</View>
							</View>
						</View>
					</ImageBackground>
				</View>


			</ScrollView>
		)
	}
}
const styles = StyleSheet.create({

	container: {
		flex: 1,
		backgroundColor:"#F7F7F7",
	},
	color333:{
		color:"#333"
	},
	numText:{
		fontSize:12,
		color:"#999"
	},
	flex1:{
		flex:1,
		justifyContent:"center",
		alignItems:"center"
	},
	white:{
		color:"#fff",
		fontSize:16,
	},
	headerColor:{
		backgroundColor:"#FF5940"
	},
	titleStyle:{
		color:"#fff",
		fontSize:18
	},
	accountWrapper:{
		paddingHorizontal:15,
		paddingTop:13,
		paddingBottom:4,
		backgroundColor:"#FF5940",
		// height:118/667 * screenHeight
	},
	font12:{
		fontSize:12
	},
	font16:{
		fontSize:16
	},
	font20:{
		fontSize:20,
		marginBottom:5
	},
	font40:{
		fontSize:36,
	},
	accountRow:{
		flexDirection:"row",
		marginTop:20,
		justifyContent:"space-between",
	},
	flexRow:{
		flexDirection:"row",
		alignItems:"flex-end",
	},
	tun:{
		marginBottom:7
	},
	ml25:{
		marginLeft:25
	},
	itemWrapper:{
		paddingHorizontal:15
	},
	shadowImg1:{
		flexDirection:"row",
		marginTop:10,
		paddingVertical:4,
		paddingHorizontal:5
	},
	shadowImg2:{
		flexDirection:"row",
		flex:1,
		marginTop:10,
		padding:5,
	},
	itemInnerWrapper:{
		flex:1,
		backgroundColor:"#fff",
		borderRadius:5,
		paddingHorizontal:15,
		paddingBottom:15,
	},
	itemTitleWrapper:{
		height:30,
		paddingHorizontal:20,
		borderRadius:15,
		backgroundColor:"#FF5940",
		justifyContent:"center"
	},
	consumeBg:{
		backgroundColor:"#75DACC",
	},
	discountBg:{
		backgroundColor:"#FFD144"
	},
	itemBtnWrapper:{
		justifyContent:"center",
		alignItems:"center",
		flexDirection:"row",
		borderBottomWidth:hairlineWidth,
		borderColor:"#ECECEC",
		padding:10,
		position:"relative"
	},
	detailBtn:{
		position:"absolute",
		right:0,
		height:30,
		justifyContent:"center"
	},
	detailCell:{
		flexDirection:"row"
	},
	detailCell1:{
		flex:1,
		// borderRightWidth:1,
		// borderColor:"#e6e6e6",
		marginTop:13,
	},
	borderRightNone:{
		borderRightWidth:0
	},
	detailInnerCell:{
		flexDirection:"row",
		alignItems:"center",
		// paddingLeft:20
	},
	smallTipText:{
		fontSize:12,
		marginRight:15,
		color:"#999"
	},
	conDetailText:{
		color:"#75DACC"
	},
	arDetailText:{
		color:"#FF5940"
	},
	disMoreText:{
		color:"#FFD144"
	},
	moneyTag:{
		fontSize:12
	},
	itemTitle:{
		fontSize:18,
		color:"#fff",
	},
	buttonWrapper:{
		flex:1,
		justifyContent:"center",
		alignItems:"center"
	},
	redPacketDetailText:{
		color:"#FF5940",
		fontSize:12
	},
	receiptDetailText:{
		color:"#75DACC",
		fontSize:12
	},
	discountButtonWrapper:{
		flex:1,
		flexDirection:"row",
		justifyContent:"center",
		alignItems:"center",
		backgroundColor:"#fff"
	}


});
/**
 * Created by luojie on 2017/10/11.
 */
import React,{PureComponent} from "react";
import {
	StyleSheet,
	View,
	ImageBackground,
	ScrollView,
	Text,
	Image,
} from "react-native";

import {
	DefaultButton
} from "../../components";
import CommentList from "../../components/shop/commentList";
import StarRating from "../../components/ysUI/star/starRating";
import GlobalData from "../../util/globalData";
import Api from "../../config/Api";

const headerImg = require("../../images/demo/arDemo3.jpeg");
const cameraIcon = require("../../images/shop/shop-camera.png");
const moreIcon = require("../../images/components/more-arrow.png");
const telIcon = require("../../images/shop/shop-tel.png");
const siteIcon = require("../../images/shop/shop-site.png");
const dateIcon = require("../../images/shop/shop-date.png");





export default class Shop extends PureComponent{
	constructor(props){
		super(props);
		this.editShopPic = this.editShopPic.bind(this);
	}
	componentDidMount(){
		this.getShopInfo();
		this.getShopComment();
	}
	getShopInfo(){
		let {shopId} = GlobalData.userInfo;
		ajax({
			url:Api.getShopDetail,
			method:"post",
			body:{shopId}
		}).then((result)=>{
			console.log(result)
		})
	}
	getShopComment(){
		let {shopId} = GlobalData.userInfo;
		ajax({
			url:Api.getShopComment,
			method:"post",
			body:{shopId}
		}).then((result)=>{
			console.log(result)
		})
	}
	editShopPic(){
		this.props.navigation.navigate("editPic");
	}
	render(){
		return(
			<View style = {styles.container}>
				<ScrollView style = {{flex:1}}>
					<ImageBackground source = {headerImg} style = {styles.headerBg}>
						<View style = {styles.headerWrap}>
							<Text style = {styles.headerTitle}>店铺</Text>
						</View>
						<DefaultButton onPress = {this.editShopPic} style = {styles.editWrapper}>
							<Image source={cameraIcon}/>
							<Text style = {styles.editText}>编辑</Text>
						</DefaultButton>
					</ImageBackground>
					<View style = {styles.shopInfoWrapper}>
						<DefaultButton style = {styles.shopNameRow}>
							<View style = {styles.shopNameLeftRow}>
								<Image style = {styles.shopLogoImg} source={headerImg}/>
								<View style = {styles.onlineBox}>
									<Text style = {styles.shopNameText}>哈哈屋</Text>
									<Text style = {styles.perPriceText}>￥{78}/人</Text>
								</View>
							</View>
							<Image source={moreIcon}/>
						</DefaultButton>
						<View style = {styles.shopBusinessInfoRow}>
							<View style = {styles.shopBusinessRow}>
								<Image style = {styles.leftIcon} source={telIcon}/>
								<Text style = {styles.color333}>{"028-2423232"}</Text>
							</View>
							<View style = {styles.shopBusinessRow}>
								<Image style = {styles.leftIcon} source={dateIcon}/>
								<Text style = {styles.color333}>{"10:00~20:00"}</Text>
							</View>
						</View>
						<View style = {styles.shopSiteRow}>
							<View style = {styles.shopBusinessRow}>
								<Image style = {styles.leftIcon} source={siteIcon}/>
								<Text style = {styles.color333}>{"高新区天府五街200号高新区天府五街200号"}</Text>
							</View>
						</View>
					</View>
					<View style = {styles.commentListWrapper}>
						<DefaultButton style = {styles.commentListTitleWrapper}>
							<View style = {styles.commentListTileLeftRow}>
								<Text style = {styles.commentListTiltText}>用户评价</Text>
								<StarRating score = {3.4} readOnly = {true}/>
								<Text style = {styles.commentCount}>{13213}人评价</Text>
							</View>
							<Image source={moreIcon}/>
						</DefaultButton>
						<CommentList/>
						<CommentList/>
						<CommentList/>
					</View>
				</ScrollView>

			</View>
		)
	}
}
const styles = StyleSheet.create({

	container: {
		flex: 1,
		backgroundColor:"#f4f4f4"
	},
	headerBg:{
		height:211/375 * screenWidth,
		width:screenWidth,
		position:"relative"
	},
	headerWrap:{
		height:44,
		marginTop:isIos ? 20 : 5,
		flexDirection:"row",
		alignItems:"center",
		paddingHorizontal:10,
		position:"relative",
		justifyContent:"center"
	},
	headerTitle:{
		fontSize:17,
		color:"#fff",
		backgroundColor:"transparent",
		fontWeight:"bold"
	},
	editWrapper:{
		height:40,
		width:40,
		position:"absolute",
		right:15,
		bottom:15,
		backgroundColor:"rgba(5, 5, 5, .4)",
		borderRadius:20,
		justifyContent:"center",
		alignItems:"center"
		// opacity:.3
	},
	editText:{
		fontSize:10,
		color:"#fff",
		marginTop:5,
	},
	shopInfoWrapper:{
		backgroundColor:"#fff",
		paddingVertical:10,
		paddingHorizontal:15,
		marginBottom:10
	},
	shopNameRow:{
		flexDirection:"row",
		justifyContent:"space-between",
		alignItems:"center",
		marginBottom:13,
	},
	shopNameLeftRow:{
		flexDirection:"row",
		alignItems:"center",
	},
	shopLogoImg:{
		height:40,
		width:40,
		borderRadius:20,
		marginRight:15,
	},
	shopNameText:{
		fontSize:21,
		color:"#333",
		marginRight:15
	},
	perPriceText:{
		fontSize:12,
		color:"#999"
	},
	onlineBox:{
		flexDirection:"row",
		alignItems:"flex-end"
	},
	shopBusinessInfoRow:{
		flexDirection:"row",
		marginBottom:11
	},
	shopBusinessRow:{
		flexDirection:"row",
		marginRight:25,
	},
	color333:{
		color:"#333"
	},
	leftIcon:{
		marginRight:10
	},
	shopSiteRow:{
		marginBottom:10,
		flexDirection:"row",
	},
	commentListWrapper:{
		backgroundColor:"#fff"
	},
	commentListTitleWrapper:{
		paddingVertical:14,
		paddingHorizontal:15,
		flexDirection:"row",
		justifyContent:"space-between"
	},
	commentListTileLeftRow:{
		borderLeftWidth:2,
		borderColor:"#FD6141",
		paddingLeft:10,
		flexDirection:"row"
	},
	commentListTiltText:{
		fontSize:15,
		color:"#999",
		marginRight:14
	},
	commentCount:{
		fontSize:12,
		color:"#999",
		marginLeft:10,
	},
	color999:{
		color:"#999",

	}

});
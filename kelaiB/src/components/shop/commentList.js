/**
 * Created by luojie on 2017/11/23.
 */
import React from "react";
import {
	View,
	Text,
	Image,
} from "react-native";

const logoIcon = require("../../images/demo/logo.jpeg");

import Star from "../../components/ysUI/star/starRating";

export default class List extends React.PureComponent{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<View>
				<View style = {styles.content}>
					<View style = {styles.commentInfo}>
						<Image style={styles.logo} source={logoIcon}/>
						<View>
							<Text style={styles.color999}>小****张</Text>
							<View style = {styles.dateWrap}>
								<Star readOnly = {true} score = {4.5}/>
								<Text style={[styles.font12,styles.color999]}>2017-09-29</Text>
							</View>
						</View>
					</View>
					<Text style = {styles.color333}>他们家的东西好好吃哦，太好吃啦，好吃的像一坨狗屎。。。。。。。。。。</Text>
				</View>
				<View style = {styles.line}/>
			</View>
		)
	}
}

const styles = createStyle({
	content:{
		paddingHorizontal:12,
		paddingTop:8,
		paddingBottom:15,
		// flexDirection:"row",
		width:screenWidth
	},
	line:{
		borderBottomWidth:hairlineWidth,
		borderColor:"#e6e6e6",
		marginLeft:12,
	},
	logo:{
		height:41,
		width:41,
		marginRight:13,
		borderRadius:41/2
	},
	commentInfo:{
		// flex:1,
		flexDirection:"row"
	},
	color999:{
		color:"#999"
	},
	dateWrap:{
		paddingTop:3,
		paddingBottom:10,
		flexDirection:"row",
		// justifyContent:"space-between"
	},
	font12:{
		fontSize:12,
	},
	color333:{
		color:"#333",
		lineHeight:20
	},
	evaluate:{
		marginTop:10,
		flexDirection:"row"
	},
	targetImg:{
		marginRight:5
	}
});
/**
 * Created by luojie on 2017/12/19.
 */
import React from "react";
import {
	View,
	Text,
	Image
} from "react-native";

import Modal from "react-native-modalbox";

const closeIcon = require("../../images/setting/dialog-close.png");
const triangleIcon = require("../../images/setting/triangle.png");

export default class Demo extends React.PureComponent {
	constructor(props) {
		super(props);

	}
	componentDidMount(){
	}
	open(){
		this.modal.open();
	}
	render() {
		return (
			<Modal
				position = "center"
				backdropOpacity={0.3}
				ref = {(r)=>{this.modal = r}}
				style = {styles.modal}>
				<View style = {styles.title}>
					<Text style = {styles.titleText}>邀请商铺得补贴</Text>
				</View>
				<Image style = {styles.closeImg} source={closeIcon}/>
				<View style = {styles.content}>
					<View style = {styles.cell}>
						<Image style = {styles.trImg} source={triangleIcon}/>
						<Text style = {styles.contentText}>复制您的邀请码，发送给您开店的朋友。</Text>
					</View>
					<View style = {[styles.cell,styles.mt40]}>
						<Image style = {styles.trImg} source={triangleIcon}/>
						<Text style = {styles.contentText}>他注册时填写您的邀请码，并在平台成功申请店铺，您即可获得68元余额补贴。</Text>
					</View>
				</View>
			</Modal>
		)
	}
}

const styles = createStyle({
	modal:{
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius:5,
		width:screenWidth-60,
		height:undefined,
	},
	title:{
		backgroundColor:"#ffe9e6",
		paddingTop:54,
		paddingBottom:44,
		alignItems:"center",
		flexDirection:"row",
		borderTopLeftRadius:5,
		borderTopRightRadius:5,
	},
	titleText:{
		color:"#333",
		fontSize:21,
		flex:1,
		textAlign:"center",
		fontWeight:"bold"
	},
	closeImg:{
		position:"absolute",
		right:15,
		top:15
	},
	content:{
		paddingTop:44,
		paddingHorizontal:24,
		paddingBottom:79,
		width:screenWidth-60,

	},
	cell:{
		flexDirection:"row",
		overflow:"hidden"
	},
	trImg:{
		marginRight:6,
		marginTop:5
	},
	contentText:{
		color:"#666",
		lineHeight:21,
		fontSize:15,
		paddingRight:10
	},
	mt40:{
		marginTop:20
	}

});
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

import {
	DefaultButton
} from "../";

const closeIcon = require("../../images/setting/dialog-close.png");
const logoIcon = require("../../images/demo/logo.jpeg");
const progressImg = require("../../images/portal/progess-line.png");

export default class CustomerDialog extends React.PureComponent {
	constructor(props) {
		super(props);
		this.close = this.close.bind(this);

	}
	componentDidMount(){
	}
	close(){
		this.modal.close();
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
					<View style = {styles.titleOutWrapper}>
						<DefaultButton onPress={this.close}>
							<Image style = {styles.loginImg} source={logoIcon}/>
						</DefaultButton>
						<Text style = {styles.nickNameText}>{"张二哥"}</Text>
					</View>
				</View>
				<Image style = {styles.closeImg} source={closeIcon}/>
				<View style = {styles.content}>
					<View style = {styles.targetWrapper}>
						<DefaultButton style = {styles.targetBtn}>
							<Text style = {styles.targetBtnText}>haha</Text>
						</DefaultButton>
						<DefaultButton style = {styles.targetBtn}>
							<Text style = {styles.targetBtnText}>傻逼一样</Text>
						</DefaultButton>
						<DefaultButton style = {styles.targetBtn}>
							<Text style = {styles.targetBtnText}>逗比</Text>
						</DefaultButton>
						<DefaultButton style = {styles.targetBtn}>
							<Text style = {styles.targetBtnText}>哈哈哈哈</Text>
						</DefaultButton>
						<DefaultButton style = {styles.targetBtn}>
							<Text style = {styles.targetBtnText}>哈哈哈哈</Text>
						</DefaultButton>
						<DefaultButton style = {styles.targetBtn}>
							<Text style = {styles.targetBtnText}>哈哈哈哈</Text>
						</DefaultButton>
					</View>
					<View style = {styles.progressWrapper}>
						<View style = {styles.progressInnerWrapper}>
							<Image style = {styles.line} source={progressImg}/>
							<View style = {styles.progressRow}>
								<Text style = {styles.color333}>我在12：30进的店</Text>
								<Text style = {styles.lineText1}>我已经来过20次了</Text>
								<Text style = {styles.lineText2}>我上次进店是在2017年12月19日</Text>
							</View>
						</View>
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
	color333:{
		color:"#333"
	},
	title:{
		backgroundColor:"#ffe9e6",
		paddingTop:20,
		paddingBottom:20,

		borderTopLeftRadius:5,
		borderTopRightRadius:5,
		flexDirection:"row"
	},
	titleOutWrapper:{
		flex:1,
		alignItems:"center",
		justifyContent:"center",
	},
	closeImg:{
		position:"absolute",
		right:15,
		top:15
	},
	loginImg:{
		height:80,
		width:80,
		borderRadius:40
	},
	nickNameText:{
		fontSize:13,
		color:"#666",
		marginTop:10,
	},
	content:{
		paddingTop:14,
		paddingBottom:42,
		width:screenWidth-60,
	},
	targetWrapper:{
		paddingHorizontal:35,
		alignItems:"center",
		justifyContent:"center",
		flexDirection:"row",
		flexWrap:"wrap"
	},
	targetBtn:{
		height:20,
		backgroundColor:"#FF5941",
		borderRadius:10,
		paddingHorizontal:15,
		justifyContent:"center",
		marginHorizontal:5,
		marginBottom:10
	},
	targetBtnText:{
		fontSize:10,
		color:"#fff"
	},
	progressWrapper:{
		flexDirection:"row",
		marginTop:12,
	},
	progressInnerWrapper:{
		flex:1,
		flexDirection:"row",
		paddingLeft:35
	},
	progressRow:{
		paddingLeft:18,
		height:145,
		justifyContent:"space-between"
	},
	line:{
		height:140,
		marginTop:5
	},
	lineText1:{
		// marginTop:45,
		color:"#333"
	},
	lineText2:{
		// marginTop:45,
		color:"#333"
	}


});
/**
 * Created by luojie on 2017/10/15.
 */
import React from "react";
import {
	View,
	Text,
	Image
} from "react-native";

import DefaultButton from "../button/defaultButton";

const defaultIcon = require("../../../images/portal/home.png");
const moreIcon = require("../../../images/components/more.png");

export default class Row extends React.PureComponent{
	constructor(props){
		super(props);
	}
	static defaultProps = {
		title:"title",
		icon:defaultIcon,
		onPress:()=>{},
		bottomLine:true
	}
	render(){
		let {icon,title,onPress,bottomLine} =  this.props;
		return(
			<DefaultButton onPress = {onPress && onPress()} style = {styles.wrapper}>
				<View style = {[styles.row,bottomLine?{borderBottomWidth:hairlineWidth,borderColor:"#ececec"}:""]}>
					<View style = {styles.flexRow}>
						<Image style={styles.icon} source={icon}/>
						<Text style = {styles.text}>{title}</Text>
					</View>
					<Image style={styles.more} source={moreIcon}/>
				</View>
			</DefaultButton>
		)
	}
}

const styles = createStyle({
	wrapper:{
		paddingLeft:15,
		backgroundColor:"#fff"
	},
	flexRow:{
		paddingVertical:17,
		flexDirection:"row",
		alignItems:"center"
	},
	row:{
		flexDirection:"row",
		justifyContent:"space-between",
		alignItems:"center",
		paddingRight:15
	},
	icon:{
		height:23,
		width:23,
		marginRight:10
	},
	more:{
		height:11,
		width:7
	},
	text:{
		fontSize:16,
		color:"#333"
	}
})
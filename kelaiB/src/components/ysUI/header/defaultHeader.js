/**
 * Created by luojie on 2017/10/12.
 */

import React from "react";
import {
	View,
	Text,
	Platform,
	Image,
	StatusBar
} from "react-native";
import PropTypes from "prop-types";
import DefaultButton from  "../button/defaultButton";

const backIcon = require("../../../images/components/black-back.png");


export default class Header extends React.PureComponent{
	constructor(props){
		super(props);
	}
	static propTypes = {
		title:PropTypes.string, //title
		isLeft:PropTypes.bool  //是否显示返回按钮
	};

	static defaultProps = {
		isLeft:true,
	};
	render(){
		let {props} = this;
		let {title,navigation,isLeft,icon,style,iconStyle} = props;
		let source = icon?icon:backIcon;
		return(
			<View style = {[styles.headerWrap,style]}>
				<StatusBar
					barStyle = "dark-content"
					backgroundColor = "#fff"/>
				{
					isLeft &&
					<View style = {styles.flex1}>
						<DefaultButton style = {styles.btn}  onPress = {()=>{navigation.goBack()}}>
							<Image style={[styles.backImage,iconStyle]} source={source}/>
						</DefaultButton>
					</View>

				}
				<View >
					{
						props.title &&
						<Text style={[styles.titleText,props.titleStyle]}>{title}</Text>
					}
				</View>
				<View style = {styles.flex1}/>
			</View>
		)
	}
}
const styles =createStyle({
	headerWrap:{
		height:Platform.OS == 'ios' ? 64 : 44,
		backgroundColor:"#fff",
		paddingTop:Platform.OS == 'ios' ? 20 : 5,
		flexDirection:"row",
		alignItems:"center",
		paddingHorizontal:10,
		position:"relative"
	},
	titleText:{
		fontSize:17,
		color:"#333",
		textAlign:"center",
		fontWeight:"bold"
	},
	flex1:{
		flex:1,
		alignItems:"flex-start",
	},
	backImage:{
		height:16,
		width:9
	},
	btn:{
		padding:10,
	}
});
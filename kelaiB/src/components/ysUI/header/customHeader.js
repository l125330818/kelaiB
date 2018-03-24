/**
 * Created by luojie on 2017/10/12.
 *
 * 自定义Header，可自定义Header两边选项
 */

import React from "react";
import {
	View,
	Text,
	StatusBar,
	Platform
} from "react-native";
import PropTypes from "prop-types";


export default class Header extends React.PureComponent{
	constructor(props){
		super(props);
	}
	static propTypes = {
		title:PropTypes.string,
		barColor:PropTypes.string,
	};

	static defaultProps = {
		barColor:"#fff"
	};
	render(){
		let {props} = this;
		let {title,renderLeft,renderRight,barColor,style} = props;
		return(
			<View style = {[styles.headerWrap,style]}>
				<StatusBar
					barStyle = "dark-content"
					backgroundColor = {barColor}/>

				<View style = {styles.flex1}>
					{
						props.title &&
						<Text style={[styles.titleText,props.titleStyle]}>{title}</Text>
					}
				</View>
				<View style={styles.leftView}>
					{
						renderLeft && renderLeft()
					}
				</View>
				<View style={styles.rightView}>
				{
					renderRight && renderRight()
				}
				</View>
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
		paddingHorizontal:10
	},
	titleText:{
		fontSize:16,
		color:"#333",
		textAlign:"center",
		fontWeight:"bold",
	},
	flex1:{
		flex:1,
		alignItems:'center',
		justifyContent:'center'
	},
	leftView:{
		position:'absolute',
		left:0,
		bottom:0,
		height:Platform.OS == 'ios' ? 44 : 39,
		justifyContent:'center',
		paddingHorizontal:15,
	},
	rightView:{
		position:'absolute',
		right:0,
		bottom:0,
        height:Platform.OS == 'ios' ? 44 : 39,
		justifyContent:'center',
		paddingHorizontal:15
	}
});
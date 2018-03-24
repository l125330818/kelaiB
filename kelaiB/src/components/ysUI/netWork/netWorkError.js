/**
 * Created by luojie on 2017/12/1.
 */
import React from "react";
import {
	View,
	Text,
	Image
} from "react-native";
import {
	DefaultButton
} from "../../index";

const errorIcon = require("../../../images/components/network-error.png");

export default class Demo extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onPress = this.onPress.bind(this);
	}
	onPress(){
		let {onPress} = this.props;
		onPress && onPress();
	}

	render() {
		return (
			<View style = {styles.wrapper}>
				<Image style = {styles.img} source={errorIcon}/>
				<Text style = {styles.errorTipText}>对不起，网络出错！</Text>
				<Text style = {styles.tip}>请刷新或重试！</Text>
				<DefaultButton onPress={this.onPress} style = {styles.btn}>
					<Text style = {styles.btnText}>重试</Text>
				</DefaultButton>
			</View>
		)
	}
}

const styles = createStyle({
	wrapper:{
		flex:1,
		alignItems:"center",
		justifyContent:"center"
	},
	img:{
		height:186,
		width:196
	},
	errorTipText:{
		fontSize:20,
		color:"#FF5940",
		marginTop:30,
	},
	tip:{
		fontSize:13,
		color:"#333",
		marginTop:8,
	},
	btn:{
		height:41,
		width:200,
		borderRadius:5,
		borderColor:"#FF5940",
		borderWidth:1,
		justifyContent:"center",
		alignItems:"center",
		marginTop:88
	}	,
	btnText:{
		color:"#FF5940",
		fontSize:16,

	}
});
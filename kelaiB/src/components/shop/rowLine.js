/**
 * Created by luojie on 2017/11/10.
 */
import React from "react";
import {
	View,
	Text,
	TextInput
} from "react-native";
import BaseInput from "../ysUI/input/baseInput";

export default class Demo extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onChangeText = this.onChangeText.bind(this);
	}
	onChangeText(e){
		let {onChangeText} = this.props;
		onChangeText && onChangeText(e);
	}
	render() {
		let {leftText,rightText} = this.props;
		return (
			<View style = {styles.row}>
				<View style = {styles.innerRow}>
					<Text style={styles.text}>{leftText}</Text>
					<View style = {styles.textInputWrapper}>
						<Text style = {styles.color333}>{rightText}</Text>
					</View>

				</View>
			</View>
		)
	}
}

const styles = createStyle({
	row:{
		backgroundColor:"#fff",
		paddingLeft:15,
	},
	innerRow:{
		flexDirection:"row",
		borderBottomWidth:hairlineWidth,
		borderColor:"#ececec",
		paddingRight:15,
		height:55,
		justifyContent:"space-between",
		alignItems:"center"
	},
	textInput:{
		flex:1,
		height:55,
		textAlign:"right",
		fontSize:14,
		color:"#999"
	},
	text:{
		flex:1,
		fontSize:16,
		color:"#333"
	},
	textInputWrapper:{
		flexDirection:"row",
		flex:1,
		alignItems:"center"
	},
	color333:{
		color:"#999",
		flex:1,
		textAlign:"right"
	}
})
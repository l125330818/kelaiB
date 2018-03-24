/**
 * Created by luojie on 2017/11/10.
 */
import React from "react";
import {
	View,
	Text,
	Image
} from "react-native";

import {DefaultButton} from "../index";

const moreArrow = require("../../images/components/more-arrow.png");

export default class Demo extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			rightText:props.rightText || ""
		}
		this.onPress = this.onPress.bind(this);
	}
	onPress(e){
		let {onPress} = this.props;
		onPress && onPress(e);
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.rightText != this.props.rightText){
			this.setState({
				rightText:nextProps.rightText
			})
		}
	}
	render() {
		let {leftText} = this.props;
		let {rightText} = this.state;
		return (
			<View style = {styles.row}>
				<View style = {styles.innerRow}>
					<Text style={styles.text}>{leftText}</Text>
					<DefaultButton onPress={this.onPress} style = {styles.textInputWrapper}>
						<Text style={styles.textInput}>{rightText}</Text>
						<Image source={moreArrow}/>
					</DefaultButton>

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
		textAlign:"right",
		fontSize:14,
		color:"#999",
		alignItems:"center",
		marginRight:10
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
		color:"#333"
	}
})
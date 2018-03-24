/**
 * Created by luojie on 2017/11/10.
 */
import React from "react";
import {
	Text,
	View
} from "react-native";
import DefaultButton from "./defaultButton";

export default class Button extends React.PureComponent{
	constructor(props){
		super(props);
		this.onPress = this.onPress.bind(this);
	}
	onPress(){
		let {onPress} = this.props;
		onPress && onPress();
	}
	render(){
		let {disabled} = this.props;
		return(
			<DefaultButton {...this.props} style = {styles.btn} onPress={this.onPress}>
				<View style = {[styles.wrapper,{opacity:disabled?0.4:1}]}>
					<Text  style={styles.btnText}>{this.props.children}</Text>
				</View>
			</DefaultButton>
		)
	}
}

const styles = createStyle({
	btn:{
		flexDirection:"row",
		// width:100,
		flex:1,
		height:44
	},
	wrapper:{
		flex:1,
		justifyContent:"center",
		alignItems:"center",
		backgroundColor:"#fe5940",
		borderRadius:22,
	},
	btnText:{
		fontSize:18,
		color:"#fff"
	}
});
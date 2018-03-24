import React from "react";
import {
	View,
	TouchableOpacity
} from "react-native";

export default class Button extends React.PureComponent{
	constructor(props){
		super(props);
		this.handlePress = this.handlePress.bind(this);
	}
	handlePress(e){
		let {onPress} = this.props;
		onPress && onPress(e);
	}
	render(){
		return(
			<TouchableOpacity
				{...this.props}
				activeOpacity={0.8}
				hitSlop = {{top:20,left:20,bottom:20,right:20}}
				onPress = {this.handlePress}>
				{this.props.children}
			</TouchableOpacity>
		)
	}
}
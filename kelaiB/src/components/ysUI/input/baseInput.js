/**
 * Created by luojie on 2017/11/10.
 */
import React from "react";
import ReactNative from "react-native";
import {
	TextInput,
} from "react-native";

export default class Demo extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onChangeText = this.onChangeText.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.reset = this.reset.bind(this);
		this.state = {}
	}
	onChangeText(e){
		let {onChangeText} = this.props;
		onChangeText && onChangeText(e);
	}
	reset() {
		if(!this.props.inputRef){
			return;
		}
		this.props.inputRef.scrollTo({y: 0});
	}
	componentWillReceiveProps(ne){
	}
	onFocus(refName){
		if(!this.props.inputRef){
			return;
		}
		setTimeout(()=> {
			let scrollResponder = this.props.inputRef.getScrollResponder();
			scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
				ReactNative.findNodeHandle(this.refs["inputRef"]), 0, true);
		}, 100);
	}
	render() {
		return (
			<TextInput
				underlineColorAndroid="transparent"
				ref = "inputRef"
				selectionColor = {this.props.selectionColor || "#333"}
				onChangeText={this.onChangeText}
				onBlur = {this.reset}
				onFocus={this.onFocus.bind(this)}
				{...this.props}/>
		)
	}
}
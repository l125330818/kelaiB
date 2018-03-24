/**
 * Created by luojie on 2017/12/3.
 */
import React from "react";
import {
	View,
	Button,
	Text,
	ScrollView
} from "react-native";

import {
	DefaultButton
} from "../components"

export default class Demo extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onPress = this.onPress.bind(this);
	}
	componentDidMount(){
		console.log(22222)
	}
	onPress(){
		console.log(3333)
	}
	render() {
		return (
			<ScrollView style = {{flex:1,alignItems:"center",justifyContent:"center"}}>
				<Button title = "点我" activeOpacity={0.5} onPress ={this.onPress.bind(this)}>
					点我
				</Button>
			</ScrollView>
		)
	}
}

const styles = createStyle({});
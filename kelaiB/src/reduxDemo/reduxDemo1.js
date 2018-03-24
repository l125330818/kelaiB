/**
 * Created by luojie on 2017/9/25.
 */
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Login} from "../actions/todoListAction";
import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';

class ReduxDemo extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			Num : 0
		}
		this.pressAdd = this.pressAdd.bind(this);
	}
	pressAdd(){
		const {Add,Login,navigation} = this.props;
		Login();
		console.log(Add)
	}
	render() {
		const {Add,addActions,navigation} = this.props;
		return (
			<View style={styles.container}>
				<Text>Hello Home!</Text>
				<TouchableOpacity onPress = {this.pressAdd}>
					<Text>Add</Text>

				</TouchableOpacity>
				<Text>
					{Add.result.message}
				</Text>
				<Text>
					{this.state.Num}
				</Text>
			</View>
		);
	}
}
export default connect(
	(state)=>{
		console.log(state);
		return{
			Add:state.Add
		}
	},
	(dispatch)=>{
		return{
			Login:bindActionCreators(Login, dispatch)
		}
	}
)(ReduxDemo)
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems:"center",
		backgroundColor: '#F5FCFF',
		justifyContent:"center"
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});
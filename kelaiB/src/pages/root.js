/**
 * Created by luojie on 2017/11/10.
 */
import React from "react";
import {
	View,
	AsyncStorage
} from "react-native";
import {NavigationActions} from "react-navigation";
import * as Storage from "../util/storage";
import GlobalData from "../util/globalData";

export default class Root extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			isLogin:"",
		}
	}
	componentDidMount(){
		AsyncStorage.getItem("isLogin",(error,result)=>{
			if(result){
				this.props.navigation.dispatch(this.resetAction("index"))
			}else{
				this.props.navigation.dispatch(this.resetAction("login"))
			}
		});
		Storage.getItem("shopId").then((result)=>{
			if(result){
				GlobalData.userInfo.shopId = result;
			}
		});

	}
	resetAction(route){
		return NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({routeName: route, params: { foo: 'bar' }})
			]

		})
	}
	render(){
		return(
			null
		)
	}
}
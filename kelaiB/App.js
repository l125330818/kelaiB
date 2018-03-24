import React,{PureComponent} from "react";

import {Provider,connect} from "react-redux";
import {createStore} from "redux";
import { StackNavigator,addNavigationHelpers,NavigationActions } from 'react-navigation';
import "./src/util/common";
import {
	BackHandler,
	ToastAndroid
} from "react-native"

import pageList from "./src/pages/pageList";
import Portal from "./src/pages/portal";
import Root from "./src/pages/root";


import getStore from "./src/store";
const AppNavigator = StackNavigator(
    {
        ...pageList,
		index:{
        	screen:Portal
		},
		root:{
        	screen:Root
		}
    },
    {
	initialRouteName: 'index', // 默认显示界面
	mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
	headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
	navigationOptions:({navigation,p}) => {
		return {
			header:	null
		}
	}
});


const navReducer = (state, action) => {
	const newState = AppNavigator.router.getStateForAction(action, state);
	return newState || state;
};

const mapStateToProps = (state) => ({
	nav: state.nav
});

class Nav extends PureComponent{
	constructor(props){
		super(props);
		this.lastBackPressed = 0;
	}
	componentWillMount(){
		BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid );
	}


	componentWillUnmount(){
		BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid);
		this.lastBackPressed = null;
	}

	_onBackAndroid=(e)=>{
		let {dispatch,nav} = this.props;
		let routes = nav.routes;
		let currentRoute = routes[routes.length-1]["routeName"];
		if(currentRoute != "index" && currentRoute != "login"){
			dispatch(NavigationActions.back());
			return true;
		}
		let now = new Date().getTime();
		if(now - this.lastBackPressed < 2000) {
			return false;
		}
		this.lastBackPressed = now;
		ToastAndroid.show('再点击一次退出应用',ToastAndroid.SHORT);
		return true;
	}
	render(){
		let {dispatch,nav} = this.props;
		return(
			<AppNavigator navigation = {addNavigationHelpers({dispatch: dispatch,state:nav,})}/>
		)
	}
}

const AppWithNavigationState = connect(mapStateToProps)(Nav);

const store = getStore(navReducer);

export default class App extends PureComponent{

	render(){
		return (
			<Provider store={store}>
				<AppWithNavigationState {...this.props} />
			</Provider>
		);
	}

}
/**
 * Created by luojie on 2017/10/11.
 * 店铺申请
 */

import React from "react";
import ScrollableTabView,{DefaultTabBar} from "react-native-scrollable-tab-view";


export default class Apply extends React.PureComponent{
	constructor(props){
		super(props);
		this.onChangeTab = this.onChangeTab.bind(this);
	}
	onChangeTab(obj){
		let {onChangeTab} = this.props;
		onChangeTab && onChangeTab(obj);
	}

	render(){
		let {renderTabBar} = this.props;
		return(
			<ScrollableTabView
				{...this.props}
				tabBarBackgroundColor = "#fff"
				tabBarTextStyle = {{fontSize:15,fontWeight:"bold"}}
				tabBarActiveTextColor = "#FD6141"
				tabBarInactiveTextColor = "#333"
				onChangeTab = {this.onChangeTab}
				renderTabBar={() => {return renderTabBar?renderTabBar():<DefaultTabBar tabStyle = {{paddingBottom:0}} style={{borderWidth:0,height:40}}/>}}
				tabBarUnderlineStyle={{backgroundColor:"#FD6141",height:2}}>
				{
					this.props.children
				}
			</ScrollableTabView>
		)
	}
}

const styles = createStyle({
	wrapper:{
		flex:1,
		backgroundColor:"#f4f4f4",
		position:"relative"
	},
	bottomRow:{
		position:"absolute",
		bottom:0,
		backgroundColor:"#fff",
		height:60,
		flexDirection:"row",
		paddingVertical:10,
		paddingHorizontal:15,
		flex:1,
		width:screenWidth
	}
})
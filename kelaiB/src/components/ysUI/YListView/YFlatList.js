/**
 * Created by luojie on 2017/11/30.
 */
import React from "react";
import {
	View,
	FlatList,
	Text,
	ActivityIndicator
} from "react-native";
import YScrollView from "../YScrollView/YScrollView";

export default class Demo extends React.PureComponent {
	constructor(props) {
		super(props);
		this.listView = null;
		this.renderFooter = this.renderFooter.bind(this);
		// this.onEndReached = this.onEndReached.bind(this);
		this.pullDown = false;
	}
	static defaultProps = {
		pageNo:1,//当前页数
		totalPage:0,//总共页数
		onLoadMore:()=>{},//加载更多方法
		onRefresh:()=>{},//刷新方法
		refreshing:false,//是否正在刷新中
	}
	componentDidMount(){
	}
	renderFooter(){
		let {totalPage,refreshing,pageNo} = this.props;
		if(!totalPage || totalPage==1 || refreshing || totalPage == pageNo){
			return null;
		}
		return(
			<View style = {styles.activityInStyle}>
				{/*<ActivityIndicator  color = "#000" />*/}
				<Text style = {styles.loadMoreText}>上拉加载更多...</Text>
			</View>
		)
	}
	// onEndReached(e){
	// 	console.log(e)
	// 	let {pageNo,totalPage,refreshing,onLoadMore} = this.props;
	// 	if(!totalPage || refreshing){
	// 		return;
	// 	}
	// 	if(totalPage>pageNo && !this.pullDown){
	// 		onLoadMore && onLoadMore();
	// 	}
	// }
	onScroll(e){
		let {y} = e.nativeEvent.contentOffset;
		if(y < 0){
			this.pullDown = true;
		}else{
			this.pullDown = false;
		}
		// console.log(e)
	}
	render() {
		return (
			<View style = {styles.wrapper}>
				<FlatList
					{...this.props}
					ref={(e)=>this.listView=e}
					onScroll = {this.onScroll.bind(this)}
					renderScrollComponent={props => <YScrollView {...props} ref={e=>this.scrollView=e}/>}
					onEndReached = {this.onEndReached}
					onEndReachedThreshold = {0.3}
					ListFooterComponent = {this.renderFooter}
				/>
			</View>
		)
	}
}

const styles = createStyle({
	wrapper:{
		flex:1
	},
	activityInStyle:{
		flexDirection:"row",
		justifyContent:"center"
	},
	loadMoreText:{
		color:"#333",
		marginLeft:30
	}
});
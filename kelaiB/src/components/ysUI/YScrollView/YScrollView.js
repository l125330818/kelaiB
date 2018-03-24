/**
 * Created by luojie on 2017/11/30.
 */
import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Animated,
	Easing,
	ScrollView,
	ActivityIndicator,
	NetInfo
} from 'react-native';

import ScrollableMixin from './scrollableMixin';

import NetWorkError from "../netWork/netWorkError";
import Pubsub from "../../../util/pubsub";



const height = 45;
const arrowIcon = require("../../../images/components/pull-arrow.png");

export default class PullRefreshScrollView extends React.PureComponent {
	constructor(props) {
		super(props);
		// = this.scrollView;
		this.refreshedText = props.refreshedText;
		this.refreshingText = props.refreshingText;
		this.refreshText = props.refreshText;
		this.endText = props.endText;
		this.endingText = props.endingText;
		this.useLoadMore = props.useLoadMore;
		this.state = {
			prTitle:this.refreshText,
			prState:0,
			prLoading:false,
			prArrowDeg:new Animated.Value(0),
			lmState:0,
			isConnected:true,//是否联网
			listenerFlag:false,//防止多次注册网络监听事件。
		};
		this.dragFlag = false; //scrollview是否处于拖动状态的标志
		this.handleNetInfo = this.handleNetInfo.bind(this);
		this.reTry = this.reTry.bind(this); //没有网络，重试

	}
	static defaultProps = {
		refreshedText: '释放立即刷新',
		refreshingText: '正在刷新中..',
		refreshText:'下拉可以刷新',
		endText:'已加载完成',
		endingText:'加载更多数据',
		onRefresh:()=>{},
		disableRefreshing:false, //scrollView是否需要下拉刷新
	};
	componentDidMount(){
		// NetInfo.isConnected.fetch().then(isConnected => {
		// 	this.setState({
		// 		isConnected
		// 	})
		// });
		NetInfo.isConnected.addEventListener("connectionChange",this.handleNetInfo);
	}
	handleNetInfo(isConnected){
		this.setState({isConnected});
		NetInfo.isConnected.removeEventListener("connectionChange",this.handleNetInfo);
	}
	componentWillReceiveProps(nextProps){
		const {props} = this;
		if (props.disabledRefreshing){
			return;
		}
		if(nextProps.refreshing===props.refreshing){
			return ;
		}
		if(nextProps.refreshing){
			this.scrollView.scrollTo({x:0,y:-height,animated:true});
		}else{
			this.setState({
				prLoading:true,
				beginScroll: false,
			});
			this.scrollView.scrollTo({x:0,y:0,animated:true});
		}
	}
	// 开始滚动
	onScrollBeginDrag(){
		this.setState({
			beginScroll: true,
			prLoading:false,
		});
		this.dragFlag = true;
		if (this.props.onScrollBeginDrag) {
			this.props.onScrollBeginDrag();
		}
	}
	// 滚动触发
	onScroll(e){
		let target = e.nativeEvent;
		let y = target.contentOffset.y;
		if (this.dragFlag) {
			if (y <= -height) {
				this.upState();
			} else {
				this.downState();
			}
		}
		this.onCheckEndReached(target);
		if (this.props.onScroll) {
			this.props.onScroll(e);
		}
	}
	// 高于临界值状态
	upState(){
		this.setState({
			prTitle:this.refreshedText,
			prState:1
		});
		Animated.timing(this.state.prArrowDeg, {
			toValue: 1,
			duration: 100,
			easing: Easing.inOut(Easing.quad)
		}).start();
	}
	// 低于临界值状态
	downState(){
		this.setState({
			prTitle:this.refreshText,
			prState:0
		});
		Animated.timing(this.state.prArrowDeg, {
			toValue: 0,
			duration: 100,
			easing: Easing.inOut(Easing.quad)
		}).start();
	}

	// 手指离开
	onScrollEndDrag(){

		this.dragFlag = false;
		if (this.state.prState) {
			// 回到待收起状态
			this.scrollView.scrollTo({x:0,y:-45,animated:true});
			this.setState({
				prTitle:this.refreshingText,
				prLoading:true,
				prArrowDeg:new Animated.Value(0),

			});

			// 触发外部的下拉刷新方法
			if (this.props.onRefresh) {
				this.props.onRefresh(this);
			}
		}

	}
	onCheckEndReached(target){
		if (this.state.lmState) {
			return;
		}
		let contentSize = target.contentSize;
		let layoutMeasurement = target.layoutMeasurement;
		let y = target.contentOffset.y;
		if(y<=0){
			return;
		}
		if (contentSize.height - layoutMeasurement.height - y < 40) {
			// 触发外部的滚动加载方法
			if (this.props.onLoadMore && this.lastContentHeight != contentSize.height) {
				this.lastContentHeight = contentSize.height;
				let {pageNo,totalPage,refreshing,onLoadMore} = this.props;
				if(!totalPage || refreshing){
					return;
				}
				if(totalPage>pageNo){
					onLoadMore && onLoadMore();
				}
			}

		}

	}
	renderNormalContent(){
		this.transform = [{rotate:this.state.prArrowDeg.interpolate({
			inputRange: [0,1],
			outputRange: ['-180deg', '0deg']
		})}];
		let jsxarr = [];
		let arrowStyle = {
			position:'absolute',
			left:-30,
			top:-6,
			transform:this.transform
		};
		let indicatorStyle = {
			position:'absolute',
			left:-30,
			top:-1,
			width:16,
			height:16,
		};


		if (this.state.prLoading) {
			jsxarr.push(<ActivityIndicator  color = "#000" style={indicatorStyle}/>);
		} else {
			jsxarr.push(null);
		}

		if (!this.state.prLoading) {
			jsxarr.push(<Animated.Image style={arrowStyle} resizeMode={'contain'} source={arrowIcon}/>);
		} else {
			jsxarr.push(null);
		}
		jsxarr.push(<Text style={styles.prState}>{this.state.prTitle}</Text>)
		return (
			<View style={{alignItems:'center'}}>
				<View style={styles.indicatorContent}>

					{jsxarr.map((item,index)=>{
						return <View key={index}>{item}</View>
					})}

				</View>
			</View>
		);

	}
	renderIndicatorContent(){
		let jsx = [this.renderNormalContent()];
		return (
			<View style={styles.pullRefresh}>

				{jsx.map((item,index)=>{
					return <View key={index}>{item}</View>
				})}
			</View>
		);
	}

	getScrollResponder() {
		return this.scrollView.getScrollResponder();
	}
	reTry(){
		if(this.listenerFlag){
			return;
		}
		NetInfo.isConnected.addEventListener("connectionChange",(isConnected)=>{
			this.listenerFlag = true;
			if(isConnected){
				this.setState({isConnected},()=>{
					let {onRefresh} = this.props;
					onRefresh && onRefresh();
				})
			}
			NetInfo.isConnected.removeEventListener("connectionChange")
		});
	}
	setNativeProps(props) {
		this.scrollView.setNativeProps(props);
	}
	render() {
		let {isConnected} = this.state;
		return (
			<View style = {{flex:1}}>
				{
					this.props.disableRefreshing?
						<ScrollView {...this.props}>
							{this.props.children}
						</ScrollView>
						:
						<ScrollView
							ref={(scrollView) => this.scrollView = scrollView}
							{...this.props}
							scrollEventThrottle={16}
							onScrollEndDrag={()=>this.onScrollEndDrag()}
							onScrollBeginDrag={()=>this.onScrollBeginDrag()}
							onScroll={(e)=>this.onScroll(e)}
						>
							{this.renderIndicatorContent()}
							{this.props.children}
						</ScrollView>
				}


				{
					!isConnected?
						<View style={{position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"#fff"}}>
							<NetWorkError onPress = {this.reTry} {...this.props}/>
						</View>:null
				}
			</View>
		);

	}

}

const styles = StyleSheet.create({
	pullRefresh:{
		position:'absolute',
		top:-44,
		left:0,
		backfaceVisibility: 'hidden',
		right:0,
		height:45,
		backgroundColor:'#f4f4f4',
		alignItems:'center',
		justifyContent:'flex-end'
	},
	loadMore: {
		height:35,
		backgroundColor:'#f4f4f4',
		alignItems:'center',
		justifyContent:'center'
	},
	text: {
		height:45,
		backgroundColor:'#fafafa',
	},
	prText:{
		marginBottom:4,
		color:'#000',
		fontSize:12,
	},

	prState:{
		marginBottom:4,
		fontSize:12,
	},
	lmState:{
		fontSize:12,
	},
	indicatorContent:{
		flexDirection:'row',
		marginBottom:5
	},

});

Object.assign(PullRefreshScrollView.prototype, ScrollableMixin);
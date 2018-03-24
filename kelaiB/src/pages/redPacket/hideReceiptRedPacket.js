/**
 * Created by luojie on 2017/11/10.
 */
import React from "react";
import {
	View,
	Image,
	Text,
	ScrollView,
	TextInput,
	Slider,
	PanResponder,
	Animated,
	FlatList,
	NetInfo
} from "react-native";

import {
	CustomHeader,
	DefaultButton,
	YFlatList
} from "../../components";

const closeIcon = require("../../images/components/black-back.png");


export default class Info extends React.PureComponent{
	constructor(props){
		super(props);
		this.renderLeft = this.renderLeft.bind(this);
		this.renderRight = this.renderRight.bind(this);
		this.close = this.close.bind(this);
		this.next = this.next.bind(this);
		this.onLoadMore = this.onLoadMore.bind(this);
		this._handlePanResponderMove = this._handlePanResponderMove.bind(this);
		this._handlePanResponderGrant = this._handlePanResponderGrant.bind(this);
		this.state = {
			left: new Animated.Value(0),
			currentLeft:0,
			refreshing:false,
			listData:[],
			totalPage:0,
			pageNo:0,
			isConnected:false,
		}
		this.left = new Animated.Value(0);
		this._previousLeft = 0;
	}
	componentWillMount(){
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onPanResponderGrant: this._handlePanResponderGrant,
			onPanResponderMove: this._handlePanResponderMove,
			onPanResponderRelease: this._handlePanResponderEnd,
			onPanResponderTerminate: this._handlePanResponderEnd,
		});
	}
	_handlePanResponderGrant(ev){
		this._previousLeft = this.state.currentLeft;
	}
	_handlePanResponderMove(event,gestureState){
		console.log(this.state);
		this.setState({
			left:this._previousLeft+gestureState.dx,
			currentLeft:this._previousLeft+gestureState.dx
		})
	}
	_handlePanResponderEnd(){}
	componentWillMount(){

	}
	componentDidMount(){
		this.onRefresh();
	}
	renderLeft(){
		return(
			<DefaultButton onPress={this.close}>
				<Image source={closeIcon}/>
			</DefaultButton>
		)
	}
	renderRight(){
		return(
			<DefaultButton onPress={this.next}>
				<Text style = {styles.nextBtn}>保存</Text>
			</DefaultButton>
		)
	}
	close(){}
	next(){}
	onRefresh(pageNo = 1){
		let arr = [];
		Array.from({length:10}).map((item,index)=>{
			arr.push({key:index,value:"hello"+index})
		});
		this.setState({
			listData:arr,
			totalPage:2,
			pageNo:1,
			refreshing:true,
		});
		setTimeout(()=>{
			this.setState({
				refreshing:false,
			})
		},1000)
	}
	renderItem(rowData){
		return(
			<View style = {{height:30}}>
				<Text>{rowData.item.value}</Text>
			</View>
		)
	}
	login(){
		let {fetch} = this.props.network
		fetch({
			url:"https://api.weixin.qq.com/sns/oauth2/access_token",
			body:{
				appid:"222",
				secret:"3333",
				grant_type:"authorization_code"
			}
		})
	}
	onLoadMore(){
		setTimeout(()=>{
			let {listData,pageNo} = this.state;
			let newListData = deepCopy(listData);
			let arr = [];
			Array.from({length:10}).map((item,index)=>{
				arr.push({key:`lo${index}`,value:"loadMore"+index})
			});
			let list = newListData.concat(arr);
			this.setState({
				listData:list,
				pageNo:++pageNo,
			})
		},1000)
	}
	toast(){
		let {toast} = this.props.modal;
		toast({
			content:"支付成功支付成功支付成功支付成功支付成功支付成功",
			onClose:()=>{
				console.log("close")
			}
		})
	}
	loading(){
		this.props.modal.showLoading();
	}
	alert(){
		this.props.modal.confirm({
			content: <Text>您尚未设置提现密码，立即设置</Text>,
			onSubmit:()=>{
				console.log("我是submit")
			},
			onCancel:()=>{
				console.log("我是cancel")
			},
			title:"设置支付密码"
		});
	}
	render(){
		let {left,refreshing,listData,totalPage,pageNo,isConnected} = this.state;
		// let thumbLeft = left.interpolate({
		// 	inputRange: [0, 100],
		// 	outputRange: [0, 10],
		// 	//extrapolate: 'clamp',
		// });
		return(
			<View  style = {styles.wrapper}>
				<CustomHeader
					renderLeft = {this.renderLeft}
					renderRight = {this.renderRight}
					title="消费红包"/>
				{/*<View style = {styles.sliderOutWrapper} >*/}
					{/*<Animated.View {...this._panResponder.panHandlers} style = {[styles.iconView,{ transform: [*/}
						{/*{ translateX: left },*/}
						{/*{ translateY: 0 }*/}
					{/*]}]}>*/}

					{/*</Animated.View>*/}
				{/*</View>*/}
				<DefaultButton onPress={this.login.bind(this)}>
					<Text>fetch</Text>
				</DefaultButton>
				<DefaultButton onPress={this.toast.bind(this)}>
					<Text>toast</Text>
				</DefaultButton>
				<DefaultButton onPress={this.loading.bind(this)}>
					<Text>loading</Text>
				</DefaultButton>
				<DefaultButton onPress={this.alert.bind(this)}>
					<Text>alert</Text>
				</DefaultButton>
				{/*<YFlatList*/}
					{/*data = {listData}*/}
					{/*renderItem = {this.renderItem.bind(this)}*/}
					{/*refreshing = {refreshing}*/}
					{/*totalPage = {totalPage}*/}
					{/*pageNo = {pageNo}*/}
					{/*onLoadMore = {this.onLoadMore}*/}
					{/*onRefresh = {this.onRefresh.bind(this)}/>*/}
			</View>
		)
	}
}

const styles = createStyle({
	wrapper:{
		flex:1,
		backgroundColor:"#f4f4f4"
	},
	sliderOutWrapper:{
		backgroundColor:"#fff",
		paddingHorizontal:27,
		height:40,
		width:200,
		position:"relative"
	},
	iconView:{
		backgroundColor:"red",
		height:30,
		width:30,
		position:"absolute",
		top:10,
	},
	nextBtn:{
		color:"#FF5940",
		fontSize:16,
	},
});
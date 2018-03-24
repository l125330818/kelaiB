/**
 * Created by luojie on 2017/11/29.
 */
import React from "react";
import {
	View,
	Image,
	Text
} from "react-native";
import {
	MapView,
	MapTypes,
	Geolocation,
	MapModule
} from 'react-native-baidu-map';

import PropTypes from "prop-types";


import {
	CustomHeader,
	DefaultButton
} from "../../components";

const closeIcon = require("../../images/components/close-icon.png");

import RowInput from "../../components/shop/rowInput";
import RowSelect from "../../components/shop/rowSelect";
import showPicker from "../../components/ysUI/picker/picker";
import area from "../../lib/area";

export default class Demo extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			selectShopName:"省/市/县（区）",
			mapAddress:"",
			mayType: MapTypes.NORMAL,
			zoom: 18,
			trafficEnabled: false,
			baiduHeatMapEnabled: false,
			mapHeight:0

		};
		this.renderRight = this.renderRight.bind(this);
		this.renderLeft = this.renderLeft.bind(this);
		this.close = this.close.bind(this);
		this.next = this.next.bind(this);
		// this.select = this.select.bind(this);
		this.onMapClick = this.onMapClick.bind(this);
		this.onMapStatusChange = this.onMapStatusChange.bind(this);
		this.onMapLayout = this.onMapLayout.bind(this);
		this.mapRef = null;
	}
	componentDidMount() { // 获取位置
		Geolocation.getCurrentPosition().then(
			(data) => {
				console.log(data)
				this.setState({
					// markers:[{
					// 	latitude:30.546186,
					// 	longitude:104.069017,
					// 	title:'我的位置'
					// }],
					center:{
						latitude:30.546186,
						longitude:104.069017,
					}
				})
			}
		).catch(error => {
			console.warn(error,'error')
		})
	}
	close(){}
	next(){}
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
	onChangeText(){

	}
	select(){
		showPicker(this.createAreaData(),(value)=>{
			this.setState({
				selectShopName:value.join("")
			})
		})
	}
	onMapClick(e){
		Geolocation.reverseGeoCode(e.latitude,e.longitude).then((data)=>{
console.log(data);
		})
	}
	onMapStatusChange(e){
		let {latitude,longitude} = e.target;
		Geolocation.reverseGeoCode(latitude,longitude).then((data)=>{
			this.setState({
				mapAddress:data.address
			})
			console.log(data)
		})
	}
	onMapLayout(e){
		let {height,width} = e.nativeEvent.layout;
		this.setState({
			mapHeight:height,
			mapWidth:width
		});
	}
	createAreaData() {
		let data = [];
		let len = area.length;
		for(let i=0;i<len;i++){
			let city = [];
			for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
				let _city = {};
				_city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
				city.push(_city);
			}

			let _data = {};
			_data[area[i]['name']] = city;
			data.push(_data);
		}
		console.log(data);
		return data;
	}
	render() {
		let {selectShopName,mapAddress,mapHeight,mapWidth} = this.state;
		return (
			<View style = {styles.wrapper}>
				<CustomHeader
					renderLeft = {this.renderLeft}
					renderRight = {this.renderRight}
					title="基本信息"/>
				<View style = {styles.content}>
					<RowSelect
						leftText = "店铺地址"
						onPress = {this.select}
						rightText = {selectShopName}/>
					<RowInput
						leftText = "详细地址"
						placeholder = "街道／门牌号"
						onChangeText = {this.onChangeText.bind(this,"shopName")}/>
					<View style = {styles.selectTipRow}>
						<Text style = {styles.tipText}>如定位不准，请手动拖动地图位置</Text>
					</View>
					<View style = {styles.mapWrapper}>
						<MapView
							ref = { (c)=>{this.mapRef = c}}
							zoom={this.state.zoom}
							mapType={this.state.mapType}
							center={this.state.center}
							style={styles.map}
							onLayout = {this.onMapLayout}
							onMapPoiClick={this.onMapClick}
							onMapStatusChange = {this.onMapStatusChange}
						>
						</MapView>
						<Image style = {[styles.markerIcon,{top:mapHeight/2,left:mapWidth/2}]} source={closeIcon}/>
					</View>

					<View style = {styles.showMapAddress}>
						<Text style = {styles.showMapText}>{mapAddress}</Text>
					</View>
				</View>
			</View>
		)
	}
}

const styles = createStyle({
	wrapper:{
		flex:1,
		backgroundColor:"#f4f4f4"
	},
	nextBtn:{
		color:"#FF5940",
		fontSize:16,
	},
	content:{
		backgroundColor:"#fff",
		marginTop:14,
		flex:1
	},
	selectTipRow:{
		height:45,
		paddingLeft:15,
		justifyContent:"center"
	},
	tipText:{
		color:"#FF5940",
	},
	mapWrapper:{
		flex:1,
		position:"relative",
	},
	markerIcon:{
		position:"absolute",
		left:screenWidth/2
	},
	showMapAddress:{
		height:64,
		paddingLeft:15,
		justifyContent:"center"
	},
	showMapText:{
		color:"#333"
	},
	map: {
		flex:1,
		// justifyContent:"center",
		// alignItems:"center"
		// height:400,
	}
});
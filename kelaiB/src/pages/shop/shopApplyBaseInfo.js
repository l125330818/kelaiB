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
	Platform,
	NativeModules
} from "react-native";

import {
	CustomHeader,
	DefaultButton
} from "../../components";
import showPicker from "../../components/ysUI/picker/picker";
import showImagePicker from "../../components/ysUI/picker/imagePicker";
import area from "../../lib/area";
import Api from "../../config/Api";
import GlobalData from "../../util/globalData";
import * as Storage from "../../util/storage";


import imageCropPicker from 'react-native-image-crop-picker';

import RowInput from "../../components/shop/rowInput";
import RowSelect from "../../components/shop/rowSelect";

import {
	uploadAvatar,
	getShopCategory,
	editBaseShopInfo
} from "../../actions/shopApply/shopApplyAction";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
var IOSSelectImage = NativeModules.IOSSelectImageManager;

const closeIcon = require("../../images/components/close-icon.png");
const logoIcon = require("../../images/components/logo.png");
import {CachedImage} from "react-native-img-cache";

class Info extends React.PureComponent{
	constructor(props){
		super(props);
		this.renderLeft = this.renderLeft.bind(this);
		this.renderRight = this.renderRight.bind(this);
		this.close = this.close.bind(this);
		this.next = this.next.bind(this);
		this.selectPhoto = this.selectPhoto.bind(this);

		this.state = {
			category:"无",
			shopAddress:"无",
			businessHours:"无",
			uploadImg:"",
			baseInfoParam:{
				logo:"",
				name:"",
				categoryId:"",
				contactNumber:"",
				areaCode:"",
				address:"",
				openTime:"",
				closeTime:"",
				avgCost:"",
			},
			categoryList:[],
			currentShopAddress:[],
			currentCategory:[],
			currentBusinessHours:[],

		}
		this.scrollView = null;
	}
	componentDidMount(){
		let {shopId} = GlobalData.userInfo;
		this.getCurrentCategory();
		if(shopId){
			this.getBaseInfo(shopId);
		}
	}
	getBaseInfo(){
		let {shopId} = GlobalData.userInfo;
		let {modal} = this.props;
		ajax({
			url:Api.getShopBaseInfo,
			body:{
				shopId
			},
		}).then((result)=>{
			if(result.status == 1){
				let {baseInfoParam} = this.state;
				let data = result.data;
				baseInfoParam = data;
				baseInfoParam.logo = data.logoImage.relativePath || "";
				let hours = [];
				hours.push(data.openTime.substr(0,5));
				hours.push(data.closeTime.substr(0,5));
				this.setState({
					baseInfoParam:Object.assign({},baseInfoParam),
					uploadImg:data.logoImage.absolutePath,
					currentShopAddress:data.areaCode.split(","),
					currentBusinessHours:hours,
					businessHours:hours.join("~"),
					shopAddress:data.areaCode.replace(/,/g,'')
				})
			}else{
				modal.toast({
					content:result.message
				})
			}
		})
	}
	getCurrentCategory(){
		let {getShopCategory} = this.props;
		getShopCategory("",(result)=>{
			if(result.status === 1){
				this.setState({
					categoryList:result.data.items,
				})
			}
		})
	}
	_getClass(){  //三级demo，到时候可供参考。现在只有一级，所以先屏蔽。
		let d = [
			{
				key:"美食",
				item:[
					{
						key:"火锅",
						item:[
							{
								key:"冒菜"
							},
							{
								key:"自助餐"
							}
						]
					},
					{
						key:"地方菜",
						item:[
							{
								key:"川菜"
							},
							{
								key:"粤菜"
							},
							{
								key:"广东菜"
							}
						]
					},
					{
						key:"西餐",
						item:[
							{
								key:"牛排"
							},
							{
								key:"芭菲"
							}
						]
					}
				]
			},
			{
				key:"服装",
				item:[
					{
						key:"女装",
						item:[
							{
								key:"萝莉装"
							},
							{
								key:"二次元"
							}
						]
					},
					{
						key:"男装",
						item:[
							{
								key:"马克华菲"
							},
							{
								key:"杰克琼斯"
							},
							{
								key:"NIKE"
							}
						]
					},
					{
						key:"运动装",
						item:[
							{
								key:"361"
							},
							{
								key:"AD"
							}
						]
					}
				]
			},

		]
		let a = [];
		for(let i = 0; i<d.length;i++){
			let bObj = {};
			let bArr = [];
			for(let j=0;j<d[i].item.length;j++){
				let cArr = [];
				let cObj = {};
				for(let k = 0 ;k<d[i].item[j].item.length;k++){
					cArr.push(d[i].item[j].item[k].key);
				}
				cObj[d[i].item[j].key] = cArr;
				bArr.push(cObj)
			}
			bObj[d[i].key] = bArr;
			a.push(bObj);
		}
		return a;
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
				<Text style = {styles.nextBtn}>下一步</Text>
			</DefaultButton>
		)
	}
	close(){
		let {navigation} = this.props;
		navigation.goBack();
	}
	next(){

		if(!this.checkValid()){
			return ;
		}
		let {baseInfoParam} = this.state;
		let {editBaseShopInfo,navigation,modal} = this.props;
		editBaseShopInfo(baseInfoParam,(result)=>{
			console.log(result)
			if(result.status == 1){
				GlobalData.userInfo.shopId = result.data.shopId;
				Storage.setItem("shopId",result.data.shopId+"");

				navigation.navigate("shopAuth");
			}else{
				modal.toast({
					content:result.message
				})
			}
		});
	}
	checkValid(){
		let {name,categoryId,contactNumber,areaCode,address,openTime,closeTime,avgCost,logo} = this.state.baseInfoParam;
		let flag = true;
		let msg = "";
		let msgValid = [
			{
				key:logo,
				msg:"请上传店铺logo"
			},
			{
				key:name,
				msg:"请输入店铺名称"
			},
			{
				key:categoryId,
				msg:"请选择经营品类"
			},
			{
				key:areaCode,
				msg:"请选择店铺地址"
			},
			{
				key:openTime,
				msg:"请选择营业时间"
			},
			{
				key:contactNumber,
				msg:"请输入联系电话"
			},
			{
				key:address,
				msg:"请输入详细地址"
			},
			{
				key:avgCost,
				msg:"请输入人均消费"
			},
		];
		for(let i = 0;i<msgValid.length;i++){
			if(!msgValid[i].key){
				flag = false;
				msg = msgValid[i].msg;
				break ;
			}else{
				msg = "";
			}
		}
		if(msg){
			this.props.modal.toast({
				content:msg,
			})
		}
		return flag;
	}
	onChangeText(type,value){
		let {baseInfoParam} = this.state;
		baseInfoParam[type] = value;
		this.setState({
			baseInfoParam:Object.assign({},baseInfoParam),
		});
	}
	getCategoryList(){
		let {categoryList} = this.state;
		let arr = [];
		categoryList.map((item,)=>{
			arr.push(item.categoryName)
		});
		return arr;
	}
	select(type){
		let {currentCategory,currentShopAddress,currentBusinessHours,baseInfoParam,categoryList} = this.state;
		if(type == 1){ //经营品类
			showPicker(this.getCategoryList(),currentCategory,(value,index)=>{
				baseInfoParam.categoryId = categoryList[index].categoryId;
				this.setState({
					category:value.join("/"),
					currentCategory:value,
					baseInfoParam:Object.assign({},baseInfoParam),
				})
			})
		}else if(type == 2){ //店铺地址
			showPicker(this._createAreaData(),currentShopAddress,(value)=>{
				baseInfoParam.areaCode = value.join(",");
				this.setState({
					shopAddress:value.join(""),
					currentShopAddress:value,
					baseInfoParam:Object.assign({},baseInfoParam)
				})
			})
		}else if(type == 3){  //营业时间
			showPicker(this._getBusinessData(),currentBusinessHours,(value)=>{
				baseInfoParam.openTime = value[0];
				baseInfoParam.closeTime = value[1];
				this.setState({
					businessHours:value.join("~"),
					currentBusinessHours:value,
					baseInfoParam:Object.assign({},baseInfoParam)
				})
			})
		}
		// this.showDatePicker();
	}
	_getBusinessData(){
		let time = 0;
		let arr = [];
		for(let i = 0;i<48;i++){
			let str = "";
			if(i%2 ==0){
				str = (time <10?("0"+time):time) + ":00";
			}else{
				str = (time <10?("0"+time):time) + ":30"
				time++;
			}
			arr.push(str);
		}
		return [arr,arr];

	}
	_createAreaData() {
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
		return data;
	}
	showDatePicker() {
		showPicker(this._createAreaData(),function(value){
			console.log(value)
		})
	}
	selectPhoto(){
		// let {uploadAvatar} = this.props;
		// let {baseInfoParam} = this.state;
		// showImagePicker((response)=>{
		// 	if(!response.uri){
		// 		return;
		// 	}
		// 	uploadAvatar({
		// 		name:response.fileName,
		// 		uri:response.uri,
		// 	},(result)=>{
		// 		if(result.status == 1){
		// 			baseInfoParam.logo = result.data.relativePath;
		// 			this.setState({
		// 				uploadImg:response.uri,
		// 				baseInfoParam:Object.assign({},baseInfoParam)
		// 			})
		// 		}
		// 	})
		//
		// })
		let {baseInfoParam} = this.state;
		let {uploadAvatar} = this.props;

		if (Platform.OS == 'ios'){
			IOSSelectImage.selectImageWithType(1,340, 272, (imagePath)=>{
				let path=imagePath;
                let names = path.substr(path.lastIndexOf("/")+1,path.length-1);
				uploadAvatar({
					name:names,
					uri:path
				},(result)=>{
					if (result.status == 1){
                        baseInfoParam.logo = result.data.relativePath;
                        this.setState({
                            uploadImg:result.data.absolutePath,
                            baseInfoParam:Object.assign({},baseInfoParam)
                        })
					}else{
						this.props.modal.toast({
							content:result.message
						})
					}
                })
			})
			return;
		}

		imageCropPicker.openPicker({
			width: 340,
			height: 272,
			cropping: true,
			mediaType:"photo"
		}).then(response => {
			console.log(response)
			if(!response.path){
				return;
			}
			let path = response.path;

			uploadAvatar({
				name:path.substr(path.lastIndexOf("/")+1,path.length-1),
				uri:path,
			},(result)=>{
				console.log(result)
				if(result.status == 1){
					baseInfoParam.logo = result.data.relativePath;
					this.setState({
						uploadImg:response.path,
						baseInfoParam:Object.assign({},baseInfoParam)
					})
				}else{
					this.props.modal.toast({
						content:result.message
					})
				}
			})
		});

	}
	render(){
		let {shopAddress,category,businessHours,uploadImg,baseInfoParam} = this.state;
		return(
			<View style = {styles.wrapper}>
				<CustomHeader
					renderLeft = {this.renderLeft}
					renderRight = {this.renderRight}
					title="基本信息"/>
				<ScrollView ref = {(c)=>{this.scrollView = c}} style = {{flex:1}}>
					<DefaultButton onPress = {this.selectPhoto} style = {styles.logoWrapper}>
						<CachedImage style = {styles.logoImg} source={uploadImg?{uri:uploadImg}:logoIcon}/>
						<Text style = {styles.uploadTip}>上传店铺logo或者商品展示图</Text>
					</DefaultButton>
					<RowInput
						leftText = "店铺名称"
						placeholder = "店铺名称"
						value = {baseInfoParam.name}
						inputRef = {this.scrollView}
						onChangeText = {this.onChangeText.bind(this,"name")}/>
					<RowSelect
						leftText = "经营品类"
						onPress = {this.select.bind(this,1)}
						rightText = {category}/>
					<RowSelect
						leftText = "店铺地址"
						onPress = {this.select.bind(this,2)}
						rightText = {shopAddress}/>
					<RowSelect
						leftText = "营业时间"
						onPress = {this.select.bind(this,3)}
						rightText = {businessHours}/>
					<RowInput
						leftText = "联系电话"
						placeholder = "联系电话"
						keyboardType = "numeric"
						maxLength = {11}
						inputRef = {this.scrollView}
						value = {baseInfoParam.contactNumber}
						onChangeText = {this.onChangeText.bind(this,"contactNumber")}/>
					<RowInput
						leftText = "详细地址"
						placeholder = "详细地址"
						inputRef = {this.scrollView}
						value = {baseInfoParam.address}
						onChangeText = {this.onChangeText.bind(this,"address")}/>
					<RowInput
						leftText = "人均消费"
						placeholder = "0"
						rightText = "元"
						keyboardType = "numeric"
						inputRef = {this.scrollView}
						value = {baseInfoParam.avgCost}
						onChangeText = {this.onChangeText.bind(this,"avgCost")}/>

				</ScrollView>
			</View>
		)
	}
}

export default connect(
	(state)=>{
		return{
			baseInfo:state.shopApplyReducer.baseInfo,
			add:state.Add,
		}
	},
	(dispatch)=>{
		return{
			uploadAvatar:bindActionCreators(uploadAvatar, dispatch),
			getShopCategory:bindActionCreators(getShopCategory, dispatch),
			editBaseShopInfo:bindActionCreators(editBaseShopInfo, dispatch),
		}
	}
)(Info)

const styles = createStyle({
	wrapper:{
		flex:1,
		backgroundColor:"#f4f4f4"
	},
	nextBtn:{
		color:"#FF5940",
		fontSize:16,
	},
	logoWrapper:{
		justifyContent:"center",
		alignItems:"center",
		paddingVertical:10
	},
	logoImg:{
		height:77,
		width:98,
		borderRadius:5,
	},
	uploadTip:{
		color:"#999",
		fontSize:12,
		marginTop:10
	}
});
/**
 * Created by luojie on 2017/11/10.
 */
import React from "react";
import {
	View,
	Image,
	Text,
	ScrollView,
	TextInput
} from "react-native";

import {
	CustomHeader,
	DefaultButton,
} from "../../components";
import showPicker from "../../components/ysUI/picker/picker";
import showImagePicker from "../../components/ysUI/picker/imagePicker";
import Api from "../../config/Api";
import Pubsub from "../../util/pubsub";
import {CachedImage} from "react-native-img-cache";


import RowInput from "../../components/shop/rowInput";
import RowSelect from "../../components/shop/rowSelect";
import GlobalData from "../../util/globalData";

const closeIcon = require("../../images/components/black-back.png");
const logoIcon = require("../../images/components/camera.png");


export default class Info extends React.PureComponent{
	constructor(props){
		super(props);
		this.renderLeft = this.renderLeft.bind(this);
		this.renderRight = this.renderRight.bind(this);
		this.close = this.close.bind(this);
		this.next = this.next.bind(this);
		this.select = this.select.bind(this);
		this.selectPhoto = this.selectPhoto.bind(this);
		let {shopId} = GlobalData.userInfo;
		this.scrollView = null;
		this.state = {
			permitValidity:"选择执照有效期",
			param:{
				shopId,
				idNoImage1:"",
				idNoImage2:"",
				owner:"",
				idNo:"",
			},
			imgObj:{
				img1:"",
				img2:"",
			}
		}
	}
	componentDidMount(){
		this.getBaseInfo();

	}
	getBaseInfo(){
		let {shopId} = GlobalData.userInfo;
		ajax({
			url:Api.getShopMaster,
			body:{
				shopId
			}
		}).then((result)=>{
			if(result.status == 1){
				let data = result.data;
				let {param} = this.state;
				let obj = {};
				if(!data){
					return;
				}
				param = data;
				if(typeof data.idNoImage1Url === "object"){
					obj.img1 = data.idNoImage1Url.absolutePath || "";
					obj.img2 = data.idNoImage2Url.absolutePath;
					param.idNoImage1 = data.idNoImage1Url.relativePath;
					param.idNoImage2 = data.idNoImage2Url.relativePath;
				}
				this.setState({
					param:Object.assign({},param),
					imgObj:obj,
				})


			}
			console.log(result)
		})
	}
	selectPhoto(type1,type2){
		let {param,imgObj} = this.state;
		showImagePicker((response)=>{
			if(!response.uri){
				return;
			}
			upload({
				url:Api.uploadLicense,
				method:"post",
				body:{
					name:response.fileName,
					uri:response.uri,
				}
			}).then((result)=>{
				if(result.status == 1){
					param[type1] = result.data.relativePath;
					imgObj[type2] = response.uri;
					this.setState({
						uploadImg:response.uri,
						param:Object.assign({},param),
						imgObj:Object.assign({},imgObj)
					})
				}
			})

		})
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
	close(){
		let {navigation} = this.props;
		navigation.goBack();
	}
	next(){
		if(!this.checkValid()){
			return;
		}
		let {param} = this.state;
		ajax({
			url:Api.editShopMaster,
			body:param,
			method:"post"
		}).then((result)=>{

			if(result.status == 1){
				let {navigate} = this.props.navigation;
				Pubsub.publish("updateFillLicense");
				navigate("shopAuth");
			}else{
				this.props.modal.toast({
					content:result.message
				})
			}
		})
	}
	checkValid(){
		let {idNoImage1,idNoImage2,owner,idNo}=this.state.param;
		let msg = "";
		let flag =true;
		let msgText = [
			{
				key:idNoImage1,
				msg:"请上传身份证正面照",
			},
			{
				key:idNoImage2,
				msg:"请上传身份证背面照",
			},
			{
				key:owner,
				msg:"请输入法人姓名",
			},
			{
				key:idNo,
				msg:"请输入法人身份证号",
			},
		];

		for(let i = 0;i<msgText.length;i++){
			if(!msgText[i].key){
				flag = false;
				msg = msgText[i].msg;
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
		let {param} = this.state;
		param[type] = value;
		this.setState({
			param:Object.assign({},param)
		});
	}
	select(){

	}
	render(){
		let {permitValidity,imgObj,param} = this.state;
		let {img1,img2} = imgObj;
		return(
			<View style = {styles.wrapper}>
				<ScrollView style = {{flex:1}} ref = {(c)=>{this.scrollView = c}}>
					<CustomHeader
						renderLeft = {this.renderLeft}
						renderRight = {this.renderRight}
						title="法人身份证照"/>
					<View style = {styles.logoOutWrapper}>
						{
							img1?
								<DefaultButton onPress = {this.selectPhoto.bind(this,"idNoImage1","img1")} >
									<CachedImage source={{uri:img1}} style = {styles.logoInnerWrapper}/>
								</DefaultButton>
								:
								<DefaultButton onPress = {this.selectPhoto.bind(this,"idNoImage1","img1")} style = {styles.logoInnerWrapper}>
									<Image style = {styles.logoImg} source={logoIcon}/>
									<Text style = {styles.tipsText}>上传身份证正面照</Text>
								</DefaultButton>
						}
					</View>
					<View  style = {[styles.logoOutWrapper,{paddingTop:10}]}>
						{
							img2?
								<DefaultButton onPress = {this.selectPhoto.bind(this,"idNoImage2","img2")}>
									<CachedImage source={{uri:img2}} style = {styles.logoInnerWrapper}/>
								</DefaultButton>
								:
								<DefaultButton onPress = {this.selectPhoto.bind(this,"idNoImage2","img2")} style = {styles.logoInnerWrapper}>
									<Image style = {styles.logoImg} source={logoIcon}/>
									<Text style = {styles.tipsText}>上传身份证背面照</Text>
								</DefaultButton>
						}
					</View>
					<RowInput
						leftText = "法人姓名"
						placeholder = "请输入法人姓名"
						value = {param.owner}
						inputRef = {this.scrollView}
						onChangeText = {this.onChangeText.bind(this,"owner")}/>
					<RowInput
						leftText = "法人身份证号"
						placeholder = "请输入法人身份证号"
						value = {param.idNo}
						inputRef = {this.scrollView}
						onChangeText = {this.onChangeText.bind(this,"idNo")}/>
				</ScrollView>

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
	logoOutWrapper:{
		justifyContent:"center",
		alignItems:"center",
		paddingTop:29,
		paddingBottom:14,

	},
	logoInnerWrapper:{
		justifyContent:"center",
		alignItems:"center",
		borderWidth:1,
		borderColor:"#E0E0E0",
		width:250,
		height:112,
		backgroundColor:"#fff"
	},
	logoImg:{
		height:50,
		width:50,
		borderRadius:25,
		marginBottom:14
	},
	tipsText:{
		color:"#FF5940"
	}
});
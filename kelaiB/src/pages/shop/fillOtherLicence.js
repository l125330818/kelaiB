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
	DefaultButton
} from "../../components";
import showPicker from "../../components/ysUI/picker/picker";
import showImagePicker from "../../components/ysUI/picker/imagePicker";
import Pubsub from "../../util/pubsub";

import {CachedImage} from "react-native-img-cache";
import RowInput from "../../components/shop/rowInput";
import RowSelect from "../../components/shop/rowSelect";
import Api from "../../config/Api";
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
		this.scrollView = null;
		let {shopId} = GlobalData.userInfo;
		this.state = {
			permitValidity:"选择许可证有效期",
			paramLicence:{
                shopId,
                grantImage:"",
                grantName:"",
                grantOwner:"",
                grantCode:"",
                grantAddress:"",
                grantExpiryDate:"",
			},
			currentSelectValue:[],
			currentSelectDateValue:[],
		}
	}
	componentDidMount(){
		this.getBaseInfo();

	}
	getBaseInfo(){
		let {shopId} = GlobalData.userInfo;
		ajax({
			url:Api.getShopGrant,
			body:{shopId},
		}).then((result)=>{
			console.log(result)
			if(result.status == 1){
				let data = result.data;
				let {paramLicence} = this.state,url="";
				paramLicence = data;
				if(typeof data.grantImageUrl === "object"){
					paramLicence.grantImage = data.grantImageUrl.relativePath || "";
					url =data.grantImageUrl.absolutePath;
				}
				this.setState({
					paramLicence:Object.assign({},paramLicence),
					uploadImg:url,
					// paramLicense
				})
			}

		})
	}
	selectPhoto(){
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
				if(result.status ==1){
					let {paramLicence} = this.state;
					paramLicence.grantImage = result.data.relativePath;
					this.setState({
						uploadImg:result.data.absolutePath,
						paramLicence:Object.assign({},paramLicence),
					})
				}else{
					this.props.modal.toast({
						content:result.message,
					})
				}
			});
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

	clickValue(){
        let {grantImage,grantName,grantOwner,grantCode,grantAddress,grantExpiryDate} =this.state.paramLicence;
        let msg = "";
        let flag=true;
        let msgText = [
            {
                key:grantImage,
                msg:"请上传营业执照",
            },
			{
				key:grantName,
				msg:"请输入许可证名称",
			},
            {
                key:grantOwner,
                msg:"请输入法人代表姓名",
            },
            {
                key:grantCode,
                msg:"请输入许可证注册号",
            },
            {
                key:grantAddress,
                msg:"请输入许可证所在地",
            },
            {
                key:grantExpiryDate,
                msg:"请选择许可证有效期",
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

	next(){
		let {paramLicence} = this.state;
		if(!this.clickValue()){return}

		ajax({
			url:Api.editShopGrant,
			body:paramLicence,
            method:'post',
        }).then((result)=>{
			if(result.status == 1){
				let {navigate} = this.props.navigation;
				Pubsub.publish("updateFillLicense");
				navigate("shopAuth");
			}else{
				this.props.modal.toast({
					content:result.message
				});
			}
		})

	}

	onChangeText(type,value){
		let {paramLicence} = this.state;
		paramLicence[type] = value;
		this.setState({
			paramLicence:Object.assign({},paramLicence)
		});
	}
	getValidSelectData(){
		return ["永久","固定有效期"]
	}
	getValidSelectDateData(){
		let arr = [];
		let currentYear = new Date().getFullYear();
		let currentMonth = new Date().getMonth()+1;
		for(let i = currentYear;i<currentYear+20;i++){
			let month = i === currentYear?currentMonth:1;
			let jObj = {};
			let jArr = [];
			for(let j = month;j<=12;j++){
				let kObj = {};
				let kArr = [];
				kObj[j] = kArr;
				let maxDay = new Date(i,j,0).getDate();
				let currentDay = ( i === currentYear && j ===currentMonth )?(new Date().getDate()):1;
				for (let k=currentDay;k<=maxDay;k++){
					kArr.push(k)
				}
				jArr.push(kObj)
			}
			jObj[i] = jArr;
			arr.push(jObj)
		}
		return arr;
	}
	select(){
		let {currentSelectValue,currentSelectDateValue} = this.state;
		showPicker(this.getValidSelectData(),currentSelectValue,(value,index)=>{
			if(index[0] === 0 ){
				let {paramLicence} = this.state;
				paramLicence.grantExpiryDate = "0";
				this.setState({
					currentSelectValue:value,
					permitValidity:value.join(""),
					paramLicence:Object.assign({},paramLicence)
				})
			}else{
				showPicker(this.getValidSelectDateData(),currentSelectDateValue,(sValue,sIndex)=>{
					let {paramLicence} = this.state;
					paramLicence.grantExpiryDate = sValue.join("");
					this.setState({
						currentSelectDateValue:sValue,
						currentSelectValue:value,
						permitValidity:sValue.join("-"),
						paramLicence:Object.assign({},paramLicence)
					})
				})
			}
		})
	}
	render(){
		let {permitValidity,uploadImg,paramLicence} = this.state;
		return(
			<View style = {styles.wrapper}>
				<CustomHeader
					renderLeft = {this.renderLeft}
					renderRight = {this.renderRight}
					title="许可证填写"/>
				<ScrollView ref = {(c)=>{this.scrollView = c}} style = {{flex:1}}>
					<View  style = {styles.logoOutWrapper}>
						{
							uploadImg?
								<DefaultButton onPress = {this.selectPhoto}>
									<CachedImage source={{uri:uploadImg}} style = {styles.logoInnerWrapper}/>
								</DefaultButton>

								:
								<View  onPress = {this.selectPhoto} style = {styles.logoInnerWrapper}>
									<Image style = {styles.logoImg} source={logoIcon}/>
									<Text style = {styles.tipsText}>上传营业执照</Text>
								</View>
						}
					</View>
					<RowInput
						leftText = "许可证名称"
						placeholder = "请输入许可证名称"
						inputRef = {this.scrollView}
						value = {paramLicence.grantName}
						onChangeText = {this.onChangeText.bind(this,"grantName")}/>
					<RowInput
						leftText = "法人代表姓名"
						placeholder = "请输入法人代表姓名"
						inputRef = {this.scrollView}
						value = {paramLicence.grantOwner}
						onChangeText = {this.onChangeText.bind(this,"grantOwner")}/>
					<RowInput
						leftText = "许可证注册号"
						placeholder = "请输入许可证注册号"
						inputRef = {this.scrollView}
						value = {paramLicence.grantCode}
						onChangeText = {this.onChangeText.bind(this,"grantCode")}/>
					<RowInput
						leftText = "许可证所在地"
						placeholder = "请输入许可证所在地"
						inputRef = {this.scrollView}
						value = {paramLicence.grantAddress}
						onChangeText = {this.onChangeText.bind(this,"grantAddress")}/>
					<RowSelect
						leftText = "许可证有效期"
						onPress = {this.select}
						rightText = {permitValidity}/>
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
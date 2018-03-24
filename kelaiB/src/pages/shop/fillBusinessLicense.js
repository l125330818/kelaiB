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
			uploadImg:"",
			paramLicense:{
                shopId,
                license:"",
                licenseName:"",
                owner:"",
                licenseCode:"",
                licenseAddress:"",
                expiryDate:"",
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
			url:Api.getShopLicense,
			body:{shopId},
		}).then((result)=>{
			if(result.status == 1){
				let data = result.data;
				let {paramLicense} = this.state;
				if(!data){
					return;
				}
				paramLicense = data;
				paramLicense.license = data.licenseImage.relativePath || "";
				this.setState({
					paramLicense:Object.assign({},paramLicense),
					uploadImg:data.licenseImage.absolutePath,
					// paramLicense
				})
			}

		})
	}
	selectPhoto(type){
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
					let {paramLicense} = this.state;
					paramLicense[type] = result.data.relativePath;
					this.setState({
						uploadImg:result.data.absolutePath,
						paramLicense:Object.assign({},paramLicense),
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

	checkValid(){
        let {licenseName,owner,licenseCode,licenseAddress,expiryDate,license}=this.state.paramLicense;
        let msg = "";
        let flag =true;
        let msgText = [
			{
				key:license,
				msg:"请上传营业执照",
			},
            {
                key:licenseName,
                msg:"请输入执照名称",
            },
            {
                key:owner,
                msg:"请输入法人代表姓名",
            },
            {
                key:licenseCode,
                msg:"请输入执照注册号",
            },
            {
                key:licenseAddress,
                msg:"请输入执照所在地",
            },
			{
                key:expiryDate,
                msg:"请选择执照有效期",
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
		let {paramLicense} =this.state;
		if(!this.checkValid()){return;}
		ajax({
			url:Api.editShopLicense,
			body:paramLicense,
			method:'post'
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

	onChangeText(type,value) {
        let {paramLicense} = this.state;
        paramLicense[type] = value;
        this.setState({
            paramLicense:Object.assign({},paramLicense)
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
		// let arr = [
		// 	{
		// 		2017:[
		// 			{
		// 				1:[1,2,3,4,5,6]
		// 			}
		// 		]
		// 	}
		// ]
		// return arr
	}
	select(){
		let {currentSelectValue,currentSelectDateValue} = this.state;
		showPicker(this.getValidSelectData(),currentSelectValue,(value,index)=>{
			if(index[0] === 0 ){
				let {paramLicense} = this.state;
				paramLicense.expiryDate = value.join("");
				this.setState({
					currentSelectValue:value,
					permitValidity:value.join(""),
					paramLicense:Object.assign({},paramLicense)
				})
			}else{
				showPicker(this.getValidSelectDateData(),currentSelectDateValue,(sValue,sIndex)=>{
					let {paramLicense} = this.state;
					paramLicense.expiryDate = sValue.join("");
					this.setState({
						currentSelectDateValue:sValue,
						currentSelectValue:value,
						permitValidity:sValue.join("-"),
						paramLicense:Object.assign({},paramLicense)
					})
				})
			}
		})
	}
	render(){
		let {permitValidity,uploadImg,paramLicense} = this.state;
		return(
			<View style = {styles.wrapper}>
				<CustomHeader
					renderLeft = {this.renderLeft}
					renderRight = {this.renderRight}
					title="营业执照填写"/>
				<ScrollView style = {{flex:1}} ref = {(c)=>{this.scrollView = c}}>
					<View  style = {styles.logoOutWrapper}>
						{
							uploadImg?
								<DefaultButton onPress = {this.selectPhoto.bind(this,"license")}>
									<CachedImage source={{uri:uploadImg}} style = {styles.logoInnerWrapper}/>
								</DefaultButton>
								:
								<DefaultButton  onPress = {this.selectPhoto.bind(this,"license")} style = {styles.logoInnerWrapper}>
									<Image style = {styles.logoImg} source={logoIcon}/>
									<Text style = {styles.tipsText}>上传营业执照</Text>
								</DefaultButton>
						}
					</View>
					<RowInput
						leftText = "执照名称"
						placeholder = "请输入执照名称"
						inputRef = {this.scrollView}
						value = {paramLicense.licenseName}
						onChangeText = {this.onChangeText.bind(this,"licenseName")}/>
					<RowInput
						leftText = "法人代表姓名"
						placeholder = "请输入法人代表姓名"
						inputRef = {this.scrollView}
						value = {paramLicense.owner}
						onChangeText = {this.onChangeText.bind(this,"owner")}/>
					<RowInput
						leftText = "执照注册号"
						placeholder = "请输入执照注册号"
						inputRef = {this.scrollView}
						value = {paramLicense.licenseCode}
						onChangeText = {this.onChangeText.bind(this,"licenseCode")}/>
					<RowInput
						leftText = "执照所在地"
						placeholder = "请输入执照所在地"
						inputRef = {this.scrollView}
						value = {paramLicense.licenseAddress}
						onChangeText = {this.onChangeText.bind(this,"licenseAddress")}/>
					<RowSelect
						leftText = "执照有效期"
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
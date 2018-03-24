/**
 * Created by luojie on 2017/11/10.
 */
import React from "react";
import ReactNative,{
	View,
	Image,
	Text,
	ScrollView,
	TextInput,
	Animated
} from "react-native";

import {
	Header,
	DefaultButton,
	BaseInput,
	SubmitButton
} from "../../components";

import RowInput from "../../components/shop/rowInput";
import RowSelect from "../../components/shop/rowSelect";
import showPicker from "../../components/ysUI/picker/picker";
import globalData from "../../util/globalData";
import {CachedImage} from "react-native-img-cache";

import showImagePicker from "../../components/ysUI/picker/imagePicker";
import Api from "../../config/Api";

const checkedIcon = require("../../images/pay/checked.png");
const unCheckedIcon = require("../../images/pay/un-checked.png");

const cameraIcon = require("../../images/components/camera.png");


export default class Info extends React.PureComponent{
	constructor(props){
		super(props);
		// this.select = this.select.bind(this);
		this.reset = this.reset.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.state = {
			ratio:['0%'],
			validity:[],
			useAmount:true,
			uploadImg:"",
            balanceMoney:'',
			shopBalance:0,
			paramRedPacket:{
                shopId:"",
				totalAmount:"", //总金额
                probability:0,
                paymentAmount:0, //第三方
                balanceAmount:0, //账户余额
                imageUrl:"",
				isBalancePay:false,//是否是余额全额支付
			}
		};
		this.scrollView = null;
		this.useAmountFn = this.useAmountFn.bind(this);
		this.selectPhoto = this.selectPhoto.bind(this);
	}
	componentDidMount(){
		// this.getShopBalance();
		this.getTicketSet();
	}
	getTicketSet(){
		let {shopId} = globalData.userInfo;
		ajax({
			url:Api.getTicketRedPacketSet,
			body:{
				shopId
			}
		}).then((result)=>{
			if(result.status ==1){
				let {paramRedPacket} = this.state;
				let {probability,ticketImage} = result.data;
				let arr = [];
				paramRedPacket.probability = probability;
				paramRedPacket.imageUrl = ticketImage.relativePath;
				arr.push(probability * 100 + "%");
				this.setState({
					shopBalance:result.data.balance,
					ratio:arr,
					uploadImg:ticketImage.absolutePath,
				})
			}else{
				this.props.modal.toast({
					content:result.message
				})
			}
		})
	}
	getShopBalance(){
		let {shopId} = globalData.userInfo;
		ajax({
			url:Api.getShopAccount,
			body:{shopId},
		}).then((result)=>{
			if(result.status ==1){
				this.setState({
					shopBalance:result.data.balance
				})
			}
		})
	}
	getValidity(){
        let data = [];
		for(let i=0;i<=100;i++){
			data[i]=`${i}%`;
		}
		return data;
	}
    getValidity1(){
        let data = [
            "一个月",
            "两个月",
            "三个月",
        ];
        return data;
    }
	select(Type){
        let {ratio,paramRedPacket,validity} =this.state;
        if(Type==="probability"){
            showPicker(this.getValidity(),ratio,(value)=>{
            	paramRedPacket[Type]=value.toString().replace(/%/g,"")/100;
                this.setState({
                    ratio:value,
                    paramRedPacket:Object.assign({},paramRedPacket),
                });
            })
		}
		// else if(Type==="expireDate"){
         //    showPicker(this.getValidity1(),[validity],(value)=>{
         //        paramRedPacket[Type]=value.toString();
         //        this.setState({
         //            validity:value,
         //            paramRedPacket:Object.assign({},paramRedPacket),
         //        });
         //    })
		// }

	}

	reset() {

		this.scrollView.scrollTo({y: 0});

	}
	onFocus(refName){
		setTimeout(()=> {

			let scrollResponder = this.scrollView.getScrollResponder();
			scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
				ReactNative.findNodeHandle(this.refs[refName]), 0, true);

		}, 100);
	}
	useAmountFn(){
        let {useAmount,paramRedPacket,balanceMoney,shopBalance} = this.state;
        paramRedPacket.paymentAmount = useAmount?balanceMoney:((balanceMoney - shopBalance)>0?(balanceMoney - shopBalance):0);
        this.setState({
            paramRedPacket:Object.assign({},paramRedPacket),
            useAmount:!useAmount
        })
	}
	selectPhoto(type1){
		let {paramRedPacket} =this.state;
		showImagePicker((response)=>{
			if(!response.uri){
				return
			}
			upload({
				url:Api.uploadTicket,
				method:'post',
				body:{
					name:response.fileName,
					uri:response.uri,
				}
			}).then((result)=>{
				if(result.status===1){
					paramRedPacket[type1]=result.data.relativePath;
                    this.setState({
						paramRedPacket:Object.assign({},paramRedPacket),
                        uploadImg:response.uri,
					})
				}
			});

		})
	}

    onChangeText(type,value){
		let {paramRedPacket}= this.state;
		this.getAmountTxt(value);
		paramRedPacket[type]=value;
		// if(!/^([1-9][0-9]*)?$/.test(value)){
         //    return;
		// }
        this.setState({
            paramRedPacket:Object.assign({},paramRedPacket),
            balanceMoney:value,
        })
	}

	getAmountTxt(value){
    	let {useAmount,paramRedPacket,shopBalance} = this.state;
        paramRedPacket.paymentAmount=useAmount?((value - shopBalance)>0?(value-shopBalance):0):value;
        this.setState({
            paramRedPacket:Object.assign({},paramRedPacket)
        })
	}

    testUserInput(){
        let {balanceMoney,uploadImg}=this.state;
        let msg='';
        let flag=true;
        let msgValue = [
            {
                key:balanceMoney,
                msg:'请输入红包总额'
            },
            {
                key:uploadImg,
                msg:'请选择小票'
            }
        ];
        for(let i=0;i<msgValue.length;i++){
            if(!msgValue[i].key){
                msg=msgValue[i].msg;
                flag=false;
                break
            }else {
                msg="";
            }
        }
        if (msg){
            this.props.modal.toast({
                content:msg,
            })
        }
        return flag;
	}
    submit(){
		let {shopId} = globalData.userInfo;
		let {paramRedPacket,shopBalance,ratio}=this.state;
		let {totalAmount} = paramRedPacket;

		if(totalAmount <= shopBalance){
			paramRedPacket.isBalancePay = true;
			paramRedPacket.balanceAmount = totalAmount;
		}else{
			paramRedPacket.balanceAmount = shopBalance;
			paramRedPacket.isBalancePay = false;
		}
		paramRedPacket.shopId = shopId;
		if(!this.testUserInput()){return}
		ajax({
			url:Api.ticketRedPacketOrder,
			body:paramRedPacket,
			method:'post',
        }).then((result)=>{
			if(result.status === 1){
				if(paramRedPacket.isBalancePay){  //余额全额支付，会直接跳成功页面

				}else{
					this.props.navigation.navigate(
						"payNow",
						{
							balanceAmount:paramRedPacket.balanceAmount,
							orderInfo:result.data,
							des:`返现比例${ratio[0]}`
						}
					);
				}
			}else{
				this.props.modal.toast({
					content:result.message
				})
			}
		})
	}

	render(){
		let {paramRedPacket,ratio,validity,useAmount,uploadImg,balanceMoney,shopBalance} = this.state;

		return(
			<View style = {styles.wrapper} >
				<Header
					{...this.props}
					title="消费返现订单"/>
				<ScrollView ref = {(c)=>{this.scrollView = c}} style = {styles.scrollWrapper}>

					<View style = {styles.totalOutWrapper}>
						<View style = {styles.totalInnerWrapper}>
							<Text style = {styles.totalText}>红包总额(元)</Text>
							<BaseInput
								keyboardType = "numeric"
								selectionColor = "#1491e9"
								style={styles.totalInput}
								onChangeText={this.onChangeText.bind(this,"totalAmount")}
								value={balanceMoney}
							/>
						</View>
					</View>
					<RowSelect
						leftText = "返现比例"
						onPress = {this.select.bind(this,"probability")}
						rightText = {ratio}
					/>
					{/*<RowSelect*/}
						{/*leftText = "有效期"*/}
						{/*onPress = {this.select.bind(this,"expireDate")}*/}
						{/*rightText = {validity}/>*/}
					{
						shopBalance> 0 &&
						<DefaultButton onPress={this.useAmountFn} style = {styles.useAmountRow}>
							<View style = {[styles.useAmountRowInnerWrapper,styles.useBottomLine]}>
								<Text style = {styles.amountText}>使用余额（￥{shopBalance}）</Text>
								<Image source={useAmount?checkedIcon:unCheckedIcon}/>
							</View>
						</DefaultButton>
					}

					<View style = {styles.receiptDemoWrapper}>
						<Text style = {styles.receiptDemoText}>小票样式</Text>
						<View style = {styles.receiptDemoImgWrapper}>
							<DefaultButton onPress = {this.selectPhoto.bind(this,"imageUrl")}>
								{
									uploadImg?
										<CachedImage source={{uri:uploadImg}} style={styles.receiptDemoImg}/>
										:
										<View style = {styles.receiptBtn}>
											<Image style={styles.cameraIcon} source={cameraIcon}/>
											<Text style = {styles.uploadText}>上传小票样式</Text>
											<Text style = {styles.tipsText}>注意请上传字迹清晰的</Text>
											<Text style = {[styles.tipsText,styles.mt10]}>完整小票图片</Text>
										</View>
								}

							</DefaultButton>
						</View>
					</View>
				</ScrollView>

				<View style = {styles.bottomRow}>
					{
                        paramRedPacket.paymentAmount>0&&
						<Text style = {styles.amountTips}>还需支付{paramRedPacket.paymentAmount}</Text>
                    }
					<View style = {styles.submitBtn}>
						<SubmitButton onPress={this.submit.bind(this)}>提交订单</SubmitButton>
					</View>
					<Text style = {styles.submitTips}>红包过期后，剩余金额24小时内退还</Text>

				</View>
			</View>
		)
	}
}

const styles = createStyle({
	wrapper:{
		flex:1,
		backgroundColor:"#f4f4f4",
	},
	nextBtn:{
		color:"#FF5940",
		fontSize:16,
	},
	imgWrapper:{
		padding:15,
		flexDirection:"row"
	},
	img:{
		height:screenWidth * 75/375,
		width:screenWidth * 75/375,
		borderRadius:5,
	},
	totalOutWrapper:{
		paddingHorizontal:15,
		paddingVertical:15
	},
	totalInnerWrapper:{
		backgroundColor:"#fff",
		height:60,
		paddingHorizontal:15,
		flexDirection:"row",
		alignItems:"center",
		borderRadius:5,
	},
	totalText:{
		fontSize:16,
		color:"#333",
		flex:1
	},
	totalInput:{
		color:"#ff5940",
		fontSize:30,
		fontWeight:"bold",
		height:60,
		flex:1,
		textAlign:"right"
	},
	desWrapper:{
		paddingTop:6,
		backgroundColor:"#fff",
		paddingHorizontal:15,

	},
	desInnerWrapper:{

		paddingRight:15,
		paddingBottom:15,

	},
	desBottomLine:{
		borderBottomWidth:hairlineWidth,
		borderColor:"#ececec",
	},
	desInput:{
		// flex:1,
		height:60,
		padding:0,
		fontSize:16,
		color:"#999"
	},
	bottomRow:{
		position:"absolute",
		bottom:0,
		// backgroundColor:"#fff",
		// flexDirection:"row",
		paddingVertical:10,
		paddingHorizontal:15,
		// flex:1,
		width:screenWidth
	},
	submitTips:{
		fontSize:12,
		color:"#999",
		marginTop:9,
		textAlign:"center"
	},
	submitBtn:{
		height:44,
		flex:1
	},
	useAmountRow:{
		backgroundColor:"#fff",
		paddingLeft:15,
	},
	useAmountRowInnerWrapper:{
		flexDirection:"row",
		justifyContent:"space-between",
		alignItems:"center",
		paddingRight:15,
		height:56,
	},
	useBottomLine:{
		borderBottomWidth:hairlineWidth,
		borderColor:"#ececec",
	},
	amountText:{
		fontSize:16,
		color:"#333"
	},
	amountTips:{
		fontSize:16,
		marginBottom:8,
		color:"#333",
		textAlign:"center"
	},
	receiptDemoWrapper:{
		backgroundColor:"#fff",
		paddingBottom:20,
		paddingHorizontal:15,
	},
	receiptDemoText:{
		paddingTop:18,
		paddingBottom:10,
		color:"#333",
		fontSize:16
	},
	receiptDemoImgWrapper:{
		justifyContent:"center",
		alignItems:"center"
	},
	receiptBtn:{
		// height:202,
		width:152,
		borderWidth:1,
		borderColor:"#B3B3B3",
		borderRadius:5,
		paddingVertical:15,
		alignItems:"center"
	},
	receiptDemoImg:{
		height:202,
		width:152,
		borderRadius:5,
	},
	cameraIcon:{
		marginTop:20,
		marginBottom:14,
	},
	uploadText:{
		color:"#FF5940",
		marginBottom:45,
	},
	tipsText:{
		fontSize:12,
		color:"#999"
	},
	mt10:{
		marginTop:8
	},
	scrollWrapper:{
		flex:1,
		marginBottom:115
	}
});
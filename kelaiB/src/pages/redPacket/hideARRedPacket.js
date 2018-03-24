

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
    SubmitButton,
    Crop
} from "../../components";



import RowInput from "../../components/shop/rowInput";
import showPicker from "../../components/ysUI/picker/picker";
import HideRedPaperAddImage from '../../components/redPacket/hideRedPaperAddImage';
import Modal from "react-native-modalbox";
import Api from "../../config/Api";
import Pubsub from "../../util/pubsub";
import globalData from "../../util/globalData";


const checkedIcon = require("../../images/pay/checked.png");
const unCheckedIcon = require("../../images/pay/un-checked.png");

import ImageDemoUrl from "../../config/imageDemoUrl";


export default class Info extends React.PureComponent{
    constructor(props){
        super(props);
        this.reset = this.reset.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.hideRedPacket = this.hideRedPacket.bind(this);
        this.state = {
            imageList:[],
			relativeImageList:[],
            validity:"一个月",
            useAmount:true,
            balanceMoney:'',
            balanceNum:'',
            redPacketAVG:'',
			shopBalance:0,
            paramARRed:{
                shopId:"",
				totalAmount:"",//总金额
                redPacketImage:"",
                paymentAmount:"",
                balanceAmount:0,
                count:"",
                blessing:"",
				isBalancePay:false,//是否余额全额支付
            }
        };
        this.scrollView = null;
		this.currentIndex = 0;//标记当前选中的img下标
        this.useAmountFn = this.useAmountFn.bind(this);
        this.addImage = this.addImage.bind(this);
        this.chooseImage = this.chooseImage.bind(this);
        this.checkLarger = this.checkLarger.bind(this);
        this.replaceImage = this.replaceImage.bind(this);
        this.cancelModal = this.cancelModal.bind(this);
        this.sureAddImage = this.sureAddImage.bind(this);
        this.onChangeBlessing = this.onChangeBlessing.bind(this);
    }
    componentDidMount(){
        this.pubsub_token = Pubsub.subscribe("updateARImageList",(arg,obj)=>{
            this.setState({
                imageList:obj.imageList,
				relativeImageList:obj.relativeImageList.concat([])
            })
        });
        this.getARSet();
    }
	getARSet(){
    	let {shopId} = globalData.userInfo;
    	ajax({
			url:Api.getARRedPacketSet,
			body:{shopId:34},
		}).then((result)=>{
    		if(result.status == 1){
    			let {arImages} = result.data || [];
    			let imgArr = [];
    			let relativeImgArr = [];

    			arImages.map((item)=>{
					imgArr.push({url:item.absolutePath});
					relativeImgArr.push(item.relativePath);
				});
    			this.setState({
					shopBalance:result.data.balance,
					imageList:imgArr,
					relativeImageList:relativeImgArr,
				})
			}
		})
	}
    componentWillUnmount(){
        this.pubsub_token && Pubsub.unsubscribe(this.pubsub_token);
    }
	cancelModal(){
        this.modal.close();
        this.addModal.close();
    }
	replaceImage(){
		this.modal.close();
		this.crop("replace");
    }
    crop(type){
		Crop({
			height:screenWidth,
			width:screenWidth
		},(response)=>{
			let path = response.path;
			let names = path.substr(path.lastIndexOf("/")+1,path.length-1);
			if(path){
				this.updateImage(path,names,type);
			}
		})
    }
    updateImage(path,fileName,type){
		upload({
			url:Api.uploadARImage,
			method:"post",
			body:{
				name:fileName,
				uri:path,
			}

		}).then((result)=>{
			if(result.status ==1){
				let {imageList,relativeImageList} = this.state;
				if(type == "replace"){
					imageList[this.currentIndex].url = result.data.absolutePath;

				}else{
				    imageList.push({url:result.data.absolutePath})
                }
				relativeImageList.push(result.data.relativePath);
				this.setState({
					imageList:[].concat(imageList),
					relativeImageList:[].concat(relativeImageList)
				})
			}else{
				this.props.modal.toast({
					content:result.message,
				})
			}
		});
    }
	checkLarger(){
	    this.modal.close();
        let {navigation} = this.props;
        let {imageList,relativeImageList} = this.state;
        navigation.navigate("activityViewImage",{imageList,index:this.currentIndex,relativeImageList})
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
        let {useAmount,paramARRed,balanceMoney,shopBalance} = this.state;
        paramARRed.paymentAmount=!useAmount?((balanceMoney - shopBalance)>0?(balanceMoney - shopBalance):0):balanceMoney;
        this.setState({
            paramARRed:Object.assign({},paramARRed),
            useAmount:!useAmount
        })

    }

    // 选择照片
    chooseImage(index){
        this.currentIndex = index;
        this.modal.open();
    }
    /// 添加照片
    addImage(){
		// this.addModal.open();
		this.crop("add");
    }
	sureAddImage(){
        this.addModal.close();
		this.crop("add");
	}

    testUserInput(){
	    let {balanceMoney,balanceNum,imageList,paramARRed}=this.state;
        let msg='';
        let flag=true;
        let msgValue=[
			{
				key:imageList.length>0,
				msg:"请上传藏红包的图片"
			},
            {
                key:balanceMoney,
                msg:"请输入红包总额"
            },
            {
                key:balanceNum,
                msg:"请输入红包个数"
            },
			{
				key:paramARRed.blessing,
				msg:"请输入祝福语"
			}
        ];
        for(let i=0;i<msgValue.length;i++){
            if(!msgValue[i].key){
                msg=msgValue[i].msg;
                flag=false;
                break;
            }else {
                msg=""
            }
        }
        if(msg){
            this.props.modal.toast({
                content:msg
            })
        }
        return flag;
    }

    /// 藏红包
    hideRedPacket(){
		let {shopId} = globalData.userInfo;
		let {paramARRed,shopBalance,relativeImageList}=this.state;

		let {totalAmount} = paramARRed;

		if(totalAmount <= shopBalance){
			paramARRed.isBalancePay = true;
			paramARRed.balanceAmount = totalAmount;
		}else{
			paramARRed.balanceAmount = shopBalance;
			paramARRed.isBalancePay = false;
		}
		paramARRed.shopId = 34;
		paramARRed.redPacketImage = relativeImageList.join(",");
        if(!this.testUserInput()){return};
        ajax({
			url:Api.aRRedPacketOrder,
			body:paramARRed,
			method:"post"
		}).then((result)=>{
        	if(result.status === 1){
				if(paramARRed.isBalancePay){  //余额全额支付，会直接跳成功页面

				}else{
					this.props.navigation.navigate(
						"payNow",
						{
							balanceAmount:paramARRed.balanceAmount,
							orderInfo:result.data,
							des:`店内红包${paramARRed.count}个`
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

    onChangeText(type,value){
        let {paramARRed,}= this.state;
        paramARRed[type]=value;
        // console.log(value);
        // if(!/^([1-9][0-9]*)?$/.test(value)){
        //     return;
        // }
        if(type==="totalAmount"){
            this.getAmountTxt(value);
            this.setState({
                paramARRed:Object.assign({},paramARRed),
                balanceMoney:value
            })
        }else {
            this.getContText(value)

        }

    }

    getContText(value){
        let {paramARRed} = this.state;
        let num1 = paramARRed.totalAmount;
        let AVG = (num1/value).toFixed(2);
        if(value==''&&value==0){
            this.setState({
                redPacketAVG:'',
                balanceNum:value
            });
        }else {
            this.setState({
                redPacketAVG:AVG,
                balanceNum:value
            });
        }

    }

    getAmountTxt(value){
        let {useAmount,paramARRed,balanceNum,shopBalance} = this.state;
        paramARRed.paymentAmount=useAmount?((value - shopBalance)>0?(value - shopBalance):0):value;
        if(balanceNum==''&&balanceNum==0){
            this.setState({
                redPacketAVG:'',
            })
        }else {
            this.setState({
                redPacketAVG:(value/balanceNum).toFixed(2),
            })
        }
    }
	onChangeBlessing(value){
    	let {paramARRed} = this.state;
    	paramARRed.blessing = value;
    	this.setState({
			paramARRed:Object.assign({},paramARRed)
		})
	}
    render(){
        let {imageList,balanceNum,useAmount,paramARRed,balanceMoney,redPacketAVG,shopBalance} = this.state;
        return(
			<View style = {styles.wrapper} >
				<Header
                    {...this.props}
					title="藏红包"/>
				<ScrollView ref = {(c)=>{this.scrollView = c}} style = {styles.scrollViewStyle}>
                    <HideRedPaperAddImage
                        images={imageList}
                        chooseImage={this.chooseImage}
                        addImage={this.addImage}
                    />

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
					<RowInput
						rightText = "个"
                        keyboardType = "numeric"
						leftText = "红包个数"
                        onChangeText={this.onChangeText.bind(this,"count")}
                        value={balanceNum}
                    />
					<View style = {styles.desWrapper}>
						<View style = {[styles.desInnerWrapper,styles.desBottomLine]}>
							<BaseInput
								multiline = {true}
								ref = "textInput"
								placeholder = "小小红包不成敬意，欢迎光临"
								onBlur = {this.reset}
								onFocus={this.onFocus.bind(this, 'textInput')}
								onChangeText={this.onChangeBlessing}
								textAlignVertical = "top"
								style = {styles.desInput}/>
						</View>
					</View>
					{
						shopBalance>0 &&
						<DefaultButton onPress={this.useAmountFn} style = {styles.useAmountRow}>
							<Text style = {styles.amountText}>使用余额（￥{shopBalance}）</Text>
							<Image source={useAmount?checkedIcon:unCheckedIcon}/>
						</DefaultButton>
					}

					<Text style={styles.redPacketAverageTip}>平均：{redPacketAVG}元/个</Text>
				</ScrollView>

				<View style = {styles.bottomRow}>
                    {
                        paramARRed.paymentAmount>0 &&
                        <Text style={styles.extraAmount}>还需支付{paramARRed.paymentAmount}元</Text>
                    }
					<View style = {styles.submitBtn}>
						<SubmitButton
                            onPress={this.hideRedPacket}
                        >藏红包</SubmitButton>
					</View>
                    <Text style={styles.tipText}>关闭红包后，剩余金额24小时退还</Text>
				</View>
                <Modal
                    position = "bottom"
                    backdropOpacity={0.3}
                    style = {[styles.modal,{height:undefined}]}
                    ref = {(c)=>{this.modal = c}}>
                    <DefaultButton onPress = {this.checkLarger} style = {styles.modalContent}>
                        <Text style={styles.modalContentText}>查看大图</Text>
                    </DefaultButton>
                    <DefaultButton onPress = {this.replaceImage} style = {[styles.cancelView]}>
                        <Text style={styles.modalDeleteText}>相册选图替换</Text>
                    </DefaultButton>
                    <View style = {styles.transparentView}/>
                    <DefaultButton onPress = {this.cancelModal} style = {[styles.cancelView]}>
                        <Text style = {styles.modalCancelText}>取消</Text>
                    </DefaultButton>
                </Modal>

                <Modal
                    position = "bottom"
                    backdropOpacity={0.3}
                    style = {[styles.modal,{height:undefined}]}
                    ref = {(c)=>{this.addModal = c}}>
                    <DefaultButton onPress = {this.sureAddImage} style = {[styles.cancelView]}>
                        <Text style={styles.modalDeleteText}>从手机相册选择</Text>
                    </DefaultButton>
                    <View style = {styles.transparentView}/>
                    <DefaultButton onPress = {this.cancelModal} style = {[styles.cancelView]}>
                        <Text style = {styles.modalCancelText}>取消</Text>
                    </DefaultButton>
                </Modal>
			</View>
        )
    }
}

const styles = createStyle({
    wrapper:{
        flex:1,
        backgroundColor:"#f4f4f4",
    },
	scrollViewStyle:{
        flex:1,
        marginBottom:100
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
        paddingBottom:15,
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
        fontWeight:'500',
        height:60,
        flex:1,
        textAlign:"right"
    },
    desWrapper:{
        paddingTop:6,
        backgroundColor:"#fff",
        paddingLeft:15
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
        height:80,
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
        width:screenWidth,
		justifyContent:'center',
        alignItems:'center',
    },
    submitTips:{
        fontSize:12,
        color:"#999",
        marginTop:9,
        textAlign:"center"
    },
    submitBtn:{
        height:44,
        flex:1,
        width:screenWidth - 30,
        marginVertical:10,

    },
    useAmountRow:{
        height:56,
        backgroundColor:"#fff",
        flexDirection:"row",
        paddingHorizontal:15,
        justifyContent:"space-between",
        alignItems:"center"
    },
    amountText:{
        fontSize:16,
        color:"#333"
    },
    extraAmount: {
    	fontSize:16,
		color:'#333'
	},
    redPacketAverageTip:{
        color:'#ff5940',
        fontSize:12,
        marginTop:10,
        marginLeft:15
    },
    tipText:{
        // paddingVertical:10,
        color:'#999',
        fontSize:12
    },
	modal:{
        alignItems:"center",
        justifyContent:"center",
        width:screenWidth,
        backgroundColor:"rgba(0,0,0,.3)"
    },
	cancelView:{
        alignItems:"center",
        justifyContent:"center",
        height:50,
        backgroundColor:"#fff",
        width:screenWidth
    },
	transparentView:{
        height:6
    },
	modalDeleteText:{
        color:"#333",
        fontSize:18,
    },
    modalCancelText:{
        color:"#333",
        fontSize:18
    },
	modalContent:{
		alignItems:"center",
		justifyContent:"center",
		backgroundColor:"#fff",
		width:screenWidth,
        borderBottomWidth:hairlineWidth,
        borderColor:"#cbcbcb",
        height:50
    },
	modalContentText:{
        color:"#333",
        fontSize:18
    }
});
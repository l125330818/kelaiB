import React from 'react';
import {
    View,
    Text,
    TextInput,

} from 'react-native';

import {
    Header,
    DefaultButton,
    SubmitButton,
}from "../../components";

import {
    sendVerCode,
    bindPhone
} from "../../actions/shopApply/shopApplyAction";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Api from "../../config/Api";

 class BindPhone extends React.PureComponent{

    constructor(props){
        super(props);
        this.state={
            btnTitle:'获取验证码',
            sendValue:false,
            param:{
				mobile:"",
				invitationCode:"",
				verifyCode:"",
            },
			submitDisabled:true,
        };
        this.inputText=this.inputText.bind(this);
        this.sendCode=this.sendCode.bind(this);
        this.submit=this.submit.bind(this);
        this.minutes=60
    }

    componentWillUnmount(){
        this.timeDown && clearInterval(this.timeDown);
    }
    sendCode(){
        let {modal,sendVerCode,} = this.props;
        let mobileReg =/^1[3|4|5|7|8][0-9]\d{8}$/;
        let {mobile}=this.state.param;
        if(!mobileReg.test(mobile)){
            modal.toast({
                content:"请输入正确的手机号"
            });
            return;
        }
		sendVerCode({mobile},(result)=>{
        	if(result.status == 1){
				modal.toast({
					content:"短信已发送至您手机，请注意查收"
				});
			}else{
				modal.toast({
					content:result.message
				});
			}
			this.setState({
				btnTitle:'60s',
				sendValue:true,
			});
			this.timeDown = setInterval(()=>{
				--this.minutes;
				if(this.minutes<=0){
					this.setState({
						btnTitle:'获取验证码',
						sendValue:false,
					});
					clearInterval(this.timeDown);
					this.minutes=60;
					return;
				}else {
					this.setState({
						btnTitle:`${this.minutes}S`,
						sendValue:true,
					})
				}
			},1000)
        })
    }

    inputText(type,text){ //获取phone number
        let {param} = this.state;
        param[type] = text;
        let newParam = Object.assign({},param);
        this.setState({
			param:Object.assign({},param),
			submitDisabled:!(newParam.mobile.length === 11 && newParam.verifyCode.length === 6)
        })
    }
    submit(){
        let {param} = this.state;
        let {bindPhone,modal,navigation} = this.props;
		navigation.navigate("shopApply");
		bindPhone(param,(result)=>{
		    if(result.status == 1){
		    	modal.toast({
					content:"绑定成功"
				});
				navigation.navigate("shopApply");
			}else{
				modal.toast({
					content:result.message
				});
			}
        })
     }
    render() {
        let {btnTitle,sendValue,submitDisabled}=this.state;
        return (
            <View style={styles.bindPhone}>
                <Header {...this.props} title="绑定手机"/>
                    <View style={styles.marginBox}>
                        <View style={styles.phoneNum}>
                            <TextInput
                                placeholder="手机号"
                                style={styles.textSize}
                                underlineColorAndroid='transparent'
                                keyboardType = "numeric"
                                maxLength={11}
                                onChangeText={this.inputText.bind(this,"mobile")}
                            />
                        </View>
                        <View style={styles.CodeBox}>
                            <View style={styles.codeInput}>
                                <TextInput
                                    placeholder="验证码"
                                    keyboardType = "numeric"
                                    maxLength={6}
                                    style={[styles.textSize,styles.textFlex]}
                                    onChangeText={this.inputText.bind(this,"verifyCode")}
                                    underlineColorAndroid='transparent'
                                />
                            </View>
                            <View style={styles.codeBtn}>
                                <DefaultButton
                                    disabled={sendValue}
                                    onPress={this.sendCode.bind(this)}
                                >
                                    <Text style={[styles.codeText,sendValue?styles.textStyleGray:styles.textStyleRed]}>{btnTitle}</Text>
                                </DefaultButton>
                            </View>
                        </View>
                        <View style={styles.phoneNum}>
                            <TextInput
                                placeholder="邀请码"
                                style={styles.textSize}
                                onChangeText={this.inputText.bind(this,"invitationCode")}
                                underlineColorAndroid='transparent'
                            />
                        </View>
                        <View style={styles.subBtn}>
                            <SubmitButton disabled={submitDisabled} onPress = {this.submit}>
                                <Text>提交</Text>
                            </SubmitButton>
                        </View>
                    </View>
            </View>

        )

    }
}
export default connect(
	(state)=>{
		return{
		}
	},
	(dispatch)=>{
		return{
			sendVerCode:bindActionCreators(sendVerCode, dispatch),
			bindPhone:bindActionCreators(bindPhone, dispatch)
		}
	}
)(BindPhone)

const styles = createStyle({
    bindPhone:{
        flex:1,
        backgroundColor:'#fff'
    },

    marginBox:{
        marginHorizontal:15,
        marginTop:28,
    },

    phoneNum:{
        height:46/667*screenHeight,
        borderBottomColor:'#ECECEC',
        borderBottomWidth:hairlineWidth,
        justifyContent:'center',
        paddingHorizontal:15,
    },

    textSize:{
        fontSize:16
    },

    textFlex:{
        flex:1
    },

    CodeBox:{
        height:46/667*screenHeight,
        flexDirection:'row',
        justifyContent:'space-between'
    },

    codeInput:{
        flex:1,
        borderBottomColor:'#ECECEC',
        borderBottomWidth:hairlineWidth,
        marginRight:15,
        paddingHorizontal:15,
    },
    codeBtn:{
        width:150,
        paddingHorizontal:15,
        justifyContent:'center',
        borderBottomColor:'#ECECEC',
        borderBottomWidth:hairlineWidth,
        alignItems:'center'
    },
    codeText:{
        fontSize:16,
    },
    textStyleGray:{
        color:'#BFBFBF',
    },
    textStyleRed:{
        color:'#FF5940',
    },

    subBtn:{
        marginTop:87/667*screenHeight,
		flexDirection:"row",
    },

});
import React from "react";
import {
    View,
    Text,
    TextInput,
    Keyboard,
} from "react-native"

import {
    Header,
    DefaultButton,
} from "../../components"
import Api from "../../config/Api";


export default class AlterPassword extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            btnTitle:'获取验证码',
            phoneNumber:'187****1287',
            flag:false,
            codeValue:'111111',
            inputEditable:false,
            codeSend:'将'
        };
        this.getCode=this.getCode.bind(this);
        this.changeText=this.changeText.bind(this);
        this.timeMitue = 60;
    }

    componentWillUnmount(){
        this.timeDown && clearInterval(this.timeDown);
        Keyboard.dismiss();
    }

    getCodeNum(){ //获取验证后
        this.setState({
            btnTitle:'60S后获取',
            flag:true,
            inputEditable:true,
            codeSend:'已'
        });
        this.props.modal.toast({
            content:'验证码已发送'
        });
        this.timeDown=setInterval(()=>{
            --this.timeMitue;
            if(this.timeMitue<=0){
                this.setState({
                    btnTitle:'获取验证码',
                    flag:false,
                });
                clearInterval(this.timeDown);
                this.timeMitue=60;
                return;
            }else {
                this.setState({
                    btnTitle:`${this.timeMitue}S后获取`,
                    flag:true,
                })
            }
        },1000);
    }

    getCode(){
        let {phoneNumber} =this.state;
        this.getCodeNum();
        // ajax({
        //     url:Api.bindPhone,
        //     body:phoneNumber,
        //     method:'post',
        //
        // }.then((result)=>{
        //     if(result===1){
        //         this.setState({
        //             codeValue:result.codeValue,
        //         })
        //     }
        // }))
    }

    changeText(value){
        let {codeValue} =this.state;
        if(value.length<6){return}
        if(codeValue!==value){
            this.props.modal.toast({
                content:'验证码不正确',
            })
        }else {
            Keyboard.dismiss();
            this.props.navigation.navigate('alterDrawPassword')
        }
    }
    render(){
        let {btnTitle,phoneNumber,flag,inputEditable,codeSend}=this.state;
        return(
            <View style={styles.container}>
                <Header title="手机号码验证" {...this.props}/>
                <View style={styles.codeContainer}>
                    <View style={styles.codeBox}>
                        <View style={styles.phoneNumBox}>
                            <Text style={styles.phoneNum1}>验证码{codeSend}发送至</Text>
                            <Text style={styles.phoneNum2}>你的手机{phoneNumber}</Text>
                        </View>
                        <View style={styles.codeInputBox}>
                            <TextInput
                                placeholder="请输入验证码"
                                keyboardType = "numeric"
                                maxLength={6}
                                underlineColorAndroid='transparent'
                                style={styles.codeInput}
                                onChangeText={this.changeText}
                                editable={inputEditable}
                            />
                            <DefaultButton
                                style={[styles.codeBtn,flag&&styles.getCodeBtn]}
                                onPress={this.getCode}
                                disabled={flag}
                            >
                                <Text style={styles.btnText}>{btnTitle}</Text>
                            </DefaultButton>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = createStyle({
    container:{
        flex:1,
    },
    codeContainer:{
        flex:1,
        paddingHorizontal:12,
        paddingTop:15,
    },

    codeBox:{
        backgroundColor:'#F7F7F7',
        paddingHorizontal:16,
        paddingTop:25,
        paddingBottom:41,
    },

    phoneNumBox:{
        alignItems:'center'
    },
    phoneNum1:{
        marginBottom:4,
        color:'#999'
    },
    phoneNum2:{
        marginBottom:12,
        color:'#999'
    },

    codeInputBox:{
        flexDirection:'row',
        backgroundColor:'#fff',
        paddingVertical:5,
        alignItems:'center',
        height:44,
        borderRadius:22,
        paddingHorizontal:5,
    },

    codeInput:{
        flex:1,
        paddingHorizontal:12,
        height:44,
        fontSize:16,

    },

    codeBtn:{
        width:95,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FF5940',
        height:36,
        borderRadius:18,
    },
    getCodeBtn:{
        backgroundColor:'#FFBDB3'
    },
    btnText:{
        color:'#fff'
    },

});
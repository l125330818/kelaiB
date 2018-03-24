import React from "react";
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Keyboard,
} from "react-native"
import {
    Header,
    SubmitButton,
    BaseInput,
} from "../../components"
import Api from "../../config/Api";

const eyeOpen=require("../../images/setting/password-eyeopen.png");
const eyeClose=require("../../images/setting/password-eyeclose.png");


export default class AlterDrawPassword extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            flag:true,
            passwordValue:''
        };

        this.eyeOpen=this.eyeOpen.bind(this);
        this.passwordInput=this.passwordInput.bind(this);
        this.alter=this.alter.bind(this);
    }


    componentDidMount(){

    }

    eyeOpen(){
        let {flag}=this.state;
        this.setState({
            flag:!flag,
        });
    }

    passwordInput(value){
        if(!/^[0-9]*?$/.test(value)){return}
        this.setState({
            passwordValue:value,
        });
    }

    alter(){
        let {passwordValue}=this.state;
        Keyboard.dismiss();
        if(passwordValue.length<6){
            this.props.modal.toast({
                content:'请输入6位数字密码'
            })
        }else {
            this.props.modal.toast({
                content:'密码修改成功'
            });
            setTimeout(()=>{
                this.props.navigation.navigate('login')
            },2000);

            // ajax()
        }

    }

    render(){
        let {flag,passwordValue}=this.state;
        return(
            <View style={styles.flex1}>
                <Header title="修改提现密码" {...this.props}/>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <BaseInput
                            keyboardType = "numeric"
                            placeholder="请输入6位数字密码"
                            maxLength={6}
                            style={styles.passInput}
                            value={passwordValue}
                            secureTextEntry={flag}
                            autoFocus={true}
                            selection={{start:passwordValue.length,end:passwordValue.length}}
                            onChangeText={this.passwordInput}
                        />
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={this.eyeOpen}
                            style={styles.imgBtn}
                        >
                            <Image source={flag?eyeClose:eyeOpen} style={styles.inputImg}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.alterBtn}>
                        <SubmitButton
                            onPress={this.alter}
                        >
                            <Text style={styles.btnFont}>完成</Text>
                        </SubmitButton>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = createStyle({
    flex1:{
        flex:1
    },
    container:{
        paddingTop:73,
        paddingHorizontal:15,
    },

    inputContainer:{
        flexDirection:'row',
        borderRadius:22,
        height:44,
        paddingHorizontal:20,
        backgroundColor:'#fff',
        alignItems:'center'
    },
    passInput:{
        flex:1,
        fontSize:16,
        height:44,
    },
    inputImg:{

    },
    imgBtn:{
        height:44,
        justifyContent:'center',
    },
    alterBtn:{
        marginTop:30,
        height:44,
    },
    btnFont:{
        fontSize:18,
        color:'#fff'
    }
});
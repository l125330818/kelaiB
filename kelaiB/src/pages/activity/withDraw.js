import React from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
} from 'react-native';


import {
    Header,
    DefaultButton,
    SubmitButton,
    BaseInput,

}from "../../components";
import PayPassword from "../../../src/components/ysUI/dialog/payPassword"

const withDrawAli = require("../../images/activity/aliWithDraw.png");

export default class WithDraw extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            allMoney:"300",

            shopId:'',
            password:'',
            payeeAccount:'',
            amount:'',

            flag:false,
            aliId:'123456123456123456aaaa@123.com',
        };
        this.withDrawAll = this.withDrawAll.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.aliPayAccounts = this.aliPayAccounts.bind(this);
        this.aliPayDetail = this.aliPayDetail.bind(this);
        this.submitBtn = this.submitBtn.bind(this);
    }


    componentDidMount(){
    }

    withDrawAll(){
        let {allMoney} = this.state;
        console.log(allMoney);
        let amount = deepCopy(allMoney);
        this.setState({
            amount:amount,
        })
    }
    aliPayDetail(){
        let {aliId} = this.state;
        this.props.modal.confirm({
            content: <Text>原支付宝账户为{aliId}立即更改。</Text>,
            onSubmit:()=>{

            },
            onCancel:()=>{
                this.setState({
                    flag:true,
                },()=>{
                    this.aliPayTextInput.blur();
                });

            },
            title:"更改提现账户",
            submitText:'取消',
            cancelText:'更改',
        });
    }

    aliPayAccounts(value){
        this.setState({
            payeeAccount:value,
        });
    }
    onChangeText(value){
        if(!/^([1-9][0-9]*)?$/.test(value)){
            return;
        }
        if(value.length>9){
            this.props.modal.toast({
                content:'提现金额不能超过9位'
            });
            return;
        }
        this.setState({
            amount:value
        })
    }

    checkDetail(){
        let {payeeAccount,amount,allMoney}=this.state;
        let msg='';
        let flag=true;
        let msgText=[
            {
                key:payeeAccount,
                msg:'请输入提现帐号',
            },
            {
                key:amount,
                msg:'请输入提现金额',
            },
            {
                key:parseInt(amount)>parseInt(allMoney)?'':true,
                msg:'可用余额不足',
            },

        ];
        for(let i=0;i<msgText.length;i++){
            if(!msgText[i].key){
                flag=false;
                msg=msgText[i].msg;
                break;
            }else {
                msg=''
            }
        }
        if(msg){
            this.props.modal.toast({
                content:msg
            });
        }
        return flag;
    }
    submitBtn(){
        // let {payeeAccount,amount,allMoney}=this.state;
        // parseInt(amount)>parseInt(allMoney)&&this.props.modal.toast({content:'可用余额不足'});
        // amount===''&& this.props.modal.toast({content:'请输入提现金额'});
        // payeeAccount===''&& this.props.modal.toast({content:'请输入提现帐号'});
        if(!this.checkDetail()){return}
        this.password.passwordModal.open();

    }

    render(){
        let {amount,allMoney,payeeAccount,aliId,flag} =this.state;

        return(
            <View style={styles.withDrawBody}>
                <Header {...this.props} title="提现"/>
                <View style={styles.aliPayId}>
                    <View style={styles.aliPayIdTitle}>
                        <Image source={withDrawAli} style={styles.aliPayIdTitleImg}/>
                        <Text style={styles.aliPayIdTitleTxt}>提现到你的支付宝</Text>
                    </View>
                    {
                        flag?
                        <View style={styles.aliPayIdInput}>
                            <BaseInput
                                ref={(r)=>{this.aliPayTextInput = r}}
                                placeholder="请输入您的支付宝账号"
                                underlineColorAndroid="transparent"
                                maxLength={30}
                                value={payeeAccount}
                                onChangeText={this.aliPayAccounts}
                            />
                        </View> :
                        <View style={styles.aliPayIdInput}>
                            <DefaultButton
                                onPress={this.aliPayDetail}
                                activeOpacity={0}
                            >
                                <Text>
                                    {aliId}
                                    {/*{payeeAccount}*/}
                                </Text>
                            </DefaultButton>
                        </View>
                    }

                </View>
                <View style={styles.aliPayDetail}>
                    <View style={styles.aliPayDetailTxt}>
                        <Text style={styles.aliPayDetailText}>提现金额</Text>
                    </View>
                    <View style={styles.aliPayDetailInput}>
                        <Text style={styles.aliPayDetailIcon}>￥</Text>
                        <BaseInput
                            placeholder="请输入提取金额"
                            style={styles.aliPayDetailInputTxt}
                            underlineColorAndroid='transparent'
                            // maxLength={9}
                            value = {amount}
                            onChangeText={this.onChangeText}
                        />
                    </View>
                    <View style={styles.aliPayDetailRemain}>
                        <Text style={styles.aliPayDetailRemainTxt}>可用余额{allMoney}元</Text>
                        <DefaultButton
                            onPress={this.withDrawAll}
                            activeOpacity={0}
                        >
                            <Text style={styles.aliPayDetailRemainBtn}>全部提现</Text>
                        </DefaultButton>
                    </View>
                </View>
                <View style={styles.aliPayDetailSubmit}>
                    <SubmitButton
                        onPress={this.submitBtn}
                    >
                        <Text>确定</Text>
                    </SubmitButton>
                </View>
                <PayPassword
                    {...this.props}
                    ref={(c)=>{this.password=c}}
                />
            </View>
        )
    }
}

const styles = createStyle({
    withDrawBody:{
        flex:1,
        backgroundColor:'#F4F4F4',
    },

    aliPayId:{
        backgroundColor:'#fff',
        paddingHorizontal:15,
        paddingVertical:11,
        marginVertical:10,
    },
    aliPayIdTitle:{
        flexDirection:'row',
        alignItems:'center',
    },
    aliPayIdTitleImg:{
        marginRight:15,
        width:21,
        height:21,
    },
    aliPayIdTitleTxt:{
        fontSize:16,
    },
    aliPayIdInput:{
        marginTop:13,
        borderBottomColor:'#BFBFBF',
        borderBottomWidth:hairlineWidth,
        marginLeft:35,
    },

    aliPayDetail:{
        backgroundColor:'#fff',
        paddingHorizontal:15,
        paddingBottom:5
    },
    aliPayDetailTxt:{
        marginVertical:13,
    },
    aliPayDetailText:{
        fontSize:15,
    },
    aliPayDetailInput:{
        flexDirection:'row',
        paddingVertical:8,
        borderBottomWidth:hairlineWidth,
        borderBottomColor:'#BFBFBF',
    },
    aliPayDetailIcon:{
        fontSize:30,
        color:'#333',
        marginTop:4,
    },
    aliPayDetailInputTxt:{
        fontSize:30,
        flex:1,
    },
    aliPayDetailRemain:{
        flexDirection:'row',
        justifyContent:"space-between",
        paddingVertical:9,
    },
    aliPayDetailRemainTxt:{
        color:'#999999',
    },
    aliPayDetailRemainBtn:{
        color:'#587DF8',
    },

    aliPayDetailSubmit:{
        flexDirection:"row",
        paddingHorizontal:15,
        position:"absolute",
        bottom:10
    }

});
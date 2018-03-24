import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,

} from 'react-native';

import {
    Header,
    DefaultButton,
}from "../../components";



const cashBackShadowSmall = require("../../images/cashbackDetail/cashback-shadow.png");



export default class CashbackDetail extends React.PureComponent{

    constructor(props){
        super(props);
        this.state={
            flag:true,
        };
        this.nonUse=this.nonUse.bind(this);
        this.onUse=this.onUse.bind(this)
    }

    nonUse(){
        this.props.modal.confirm({
            content: <Text>停用后，用户无法领取消费返现红包，余额将24小时内返还您的账户</Text>,
            onSubmit:()=>{
                // console.log("我是submit")
                this.setState({
                    flag:false,
                });
            },
            onCancel:()=>{
                // console.log("我是cancel")
            },
            title:"停用消费返现",
            submitText:'停用',
            cancelText:'取消',
        });
    }
    onUse(){
        this.props.modal.confirm({
            content: <Text>启用返现后，消费者就可以领取消费返现。</Text>,
            onSubmit:()=>{
                // console.log("我是submit")
                this.setState({
                    flag:true,
                });
            },
            onCancel:()=>{
                // console.log("我是cancel")
            },
            title:"启用返现",
            submitText:'启用',
            cancelText:'取消',
        });

    }

    render(){
        let {flag}=this.state;
        return(
            <View style={styles.bodyStyle}>
                <Header title={"返现详情"}/>
                <View style={styles.cashBackPurse}>
                    <ImageBackground
                        resizeMode="stretch"
                        source={cashBackShadowSmall}
                        style={[styles.purseBoxImg]}
                    >
                        <View style={styles.purseBox}>
                            <View  style={styles.cashBackSmall}>
                                <View style={styles.cashBackTotal}>
                                    <View style={styles.cashBackMoney}>
                                        <Text style={[styles.cashBackMoneyI,!flag && styles.fontColorOff]}>￥</Text>
                                        <Text style={[styles.moneyBig,!flag && styles.fontColorOff]}>190.00</Text>
                                    </View>
                                    <Text style={styles.textBigWhite}>返现总额</Text>
                                </View>
                            </View>
                            <View style={styles.balanceDetail}>
                                <View style={styles.flex1}>
                                    <View style={styles.balanceDetailFlex}>
                                        <Text style={styles.balanceDetailTxt}>已领</Text>
                                        <Text style={[styles.balanceDetailNum,!flag && styles.fontColorOff]}>￥200.33</Text>
                                    </View>
                                    <View style={[styles.balanceDetailFlex,styles.balnaceMargin]}>
                                        <Text style={styles.balanceDetailTxt}>已领</Text>
                                        <Text style={[styles.balanceDetailNum,!flag && styles.fontColorOff]}>88个</Text>
                                    </View>
                                </View>
                                <View style={styles.flex1}>
                                    <View style={styles.balanceDetailFlex}>
                                        <Text style={[styles.balanceDetailTxt,styles.balanceDetailWidth]}>剩余</Text>
                                        <Text style={[styles.balanceDetailNum,!flag && styles.fontColorOff]}>￥200.33</Text>
                                    </View>
                                    <View style={[styles.balanceDetailFlex,styles.balnaceMargin]}>
                                        <Text style={[styles.balanceDetailTxt,styles.balanceDetailWidth]}>返现比例</Text>
                                        <Text style={[styles.balanceDetailNum,!flag && styles.fontColorOff]}>6%</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                <View style={styles.btnOff}>
                    {
                        flag?
                        <DefaultButton
                            style={[styles.purseBoxClick,styles.purseBoxOff]}
                            onPress={this.nonUse}
                            activeOpacity={0}
                        >
                            <Text style={[styles.closeTextOff]}>停用</Text>
                        </DefaultButton>
                            :
                        <DefaultButton
                            style={[styles.purseBoxClick,styles.purseBoxOn]}
                            onPress={this.onUse}
                            activeOpacity={0}
                        >
                            <Text style={[styles.closeTextOn]}>启用</Text>
                        </DefaultButton>

                    }


                </View>

                <View style={styles.userList}>
                    <View style={styles.userInfoBox}>
                        <View style={styles.userInfoBoxBorder}>
                            <View style={styles.userInfoD}>
                                <View style={styles.userInfoImg}>
                                    <Image source={require('../../images/pay/ali-pay.png')} style={styles.userInfoImgSize}/>
                                </View>
                                <View>
                                    <Text >进击的小红帽</Text>
                                    <Text style={styles.userInfoNameTxt}>消费总额:¥568.00</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.moneyNumStyle}>-1.23</Text>
                                <Text style={styles.userInfoDetail}>消费总额:¥568.00</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}

const styles =createStyle({
    bodyStyle:{
        backgroundColor:'#F7F7F7',
        flex:1,
    },

    cashBackPurse:{

    },

    purseBoxImg:{
        marginHorizontal:15,
        marginVertical:10,
        padding:4
    },

    //开启button
    btnOff:{
        position:'absolute',
        top:(isIos?84:66),
        right:25
    },
    purseBoxClick:{
        width:54,
        height:21,
        borderWidth:1,
        borderRadius:27,
        alignItems:'center',
        justifyContent:'center',

    },
    purseBoxOff:{
        borderColor:'#FD6141',
    },
    purseBoxOn:{
        borderColor:'#666',
    },
    closeTextOn:{
        fontSize:12,
        color:'#666',
    },
    closeTextOff:{
        fontSize:12,
        color:'#FD6141',
    },


    //
    purseBox:{
        paddingHorizontal:10,
        paddingTop:30,
        paddingBottom:15,
        borderRadius:5,
        backgroundColor:'#FFF',
    },

    cashBackSmall:{
        alignItems:'center',
    },

    cashBackTotal:{
        justifyContent:'center',
        alignItems:'center',
        marginBottom:8
    },

    cashBackMoney:{
        flexDirection:'row',
    },
    cashBackMoneyI:{
        fontSize:24,
        // fontSize:15,
        color:'#FD6141',
        marginTop:16
    },

    moneyBig:{
        fontSize:40,
        // fontSize:30,
        color:'#FD6141',
    },


    //已领详情
    balanceDetail:{
        borderTopWidth:1,
        flexDirection:'row',
        paddingTop:21,
        borderTopColor:'#E6E6E6',
    },
    flex1:{
        flex:1,
        paddingLeft:15,
        justifyContent:'space-between'
    },
    balanceDetailFlex:{
        flexDirection:'row',
        alignItems:'center'
    },
    balnaceMargin:{
        marginTop:20,
    },

    balanceDetailTxt:{
        fontSize:12,
        color:'#999',
        textAlign:'right',
        marginRight:13,
    },
    balanceDetailWidth:{
        width:48,
    },

    balanceDetailNum:{
        fontSize:14,
        // fontSize:18,
        color:'#FD6141',
    },

    textBigWhite:{
        fontSize:12,
        color:'#999'
    },

    userList:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },

    userInfoBox:{
        // flex:1,
        // paddingVertical:15,
    },

    userInfoBoxBorder:{
        // height:70/667*screenHeight,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft:15,
        borderBottomWidth:1,
        borderBottomColor:'#ECECEC',
        paddingVertical:15,
        paddingRight:15
    },

    userInfoD:{
        flexDirection:'row',
        alignItems:'center',
    },

    userInfoImg:{
        marginRight:12,
    },
    userInfoImgSize:{
        width:41,
        height:41,
        borderRadius:20,
    },

    userInfoNameTxt:{
        marginTop:10
    },

    userInfoDetail:{
        fontSize:12,
        color:'#999',
        marginTop:8,
    },

    moneyNumStyle:{
        fontSize:19,
        textAlign:'right'
    },

    fontColorOff:{
        color:'#666',
    },
});
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



export default class RedPacketDetail extends React.PureComponent{

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
            content: <Text>停用后，用户无法领取到店红包，红包内的余 额将24小时内返还您的账户。</Text>,
            onSubmit:()=>{
                // console.log("我是submit")
                this.setState({
                    flag:false,
                });
            },
            onCancel:()=>{
                // console.log("我是cancel")
            },
            title:"停止红包发放",
            submitText:'停用',
            cancelText:'取消',
        });
    }
    onUse(){
        this.props.modal.confirm({
            content: <Text>启用红包后，消费者就可以领取到店红包。</Text>,
            onSubmit:()=>{
                // console.log("我是submit")
                this.setState({
                    flag:true,
                });
            },
            onCancel:()=>{
                // console.log("我是cancel")
            },
            title:"启用到店红包",
            submitText:'启用',
            cancelText:'取消',
        });

    }

    render(){
        let {flag}=this.state;
        return(
            <View style={styles.bodyStyle}>
                <Header title={"红包详情"}/>
                <View style={styles.cashBackPurse}>
                    <ImageBackground
                        resizeMode="stretch"
                        source={cashBackShadowSmall}
                        style={[styles.purseBoxImg]}
                    >
                        <View style={[styles.purseBox,!flag && styles.purseBoxFFF]}>
                            <View  style={styles.cashBackSmall}>
                                <View style={styles.cashBackTotal}>
                                    <View style={styles.cashBackMoney}>
                                        <Text style={[styles.cashBackMoneyI,!flag && styles.fontColorOff]}>￥</Text>
                                        <Text style={[styles.moneyBig,!flag && styles.fontColorOff]}>190.00</Text>
                                    </View>
                                    <Text style={[styles.textBigWhite,!flag &&styles.balanceDetailTxtOn]}>历史总额</Text>
                                </View>
                            </View>
                            <View style={[styles.balanceDetail,!flag && styles.balanceDetailOn]}>
                                <View style={styles.flex1}>
                                    <View style={styles.balanceDetailFlex}>
                                        <Text style={[styles.balanceDetailTxt,!flag &&styles.balanceDetailTxtOn]}>已领</Text>
                                        <Text style={[styles.balanceDetailNum,!flag && styles.fontColorOff]}>￥200.33</Text>
                                    </View>
                                    <View style={[styles.balanceDetailFlex,styles.balnaceMargin]}>
                                        <Text style={[styles.balanceDetailTxt,!flag &&styles.balanceDetailTxtOn]}>已领</Text>
                                        <Text style={[styles.balanceDetailNum,!flag && styles.fontColorOff]}>88个</Text>
                                    </View>
                                </View>
                                <View style={styles.flex1}>
                                    <View style={styles.balanceDetailFlex}>
                                        <Text style={[styles.balanceDetailTxt,!flag &&styles.balanceDetailTxtOn]}>剩余</Text>
                                        <Text style={[styles.balanceDetailNum,!flag && styles.fontColorOff]}>￥200.33</Text>
                                    </View>
                                    <View style={[styles.balanceDetailFlex,styles.balnaceMargin]}>
                                        <Text style={[styles.balanceDetailTxt,!flag &&styles.balanceDetailTxtOn]}>剩余</Text>
                                        <Text style={[styles.balanceDetailNum,!flag && styles.fontColorOff]}>0个</Text>
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
                            <View style={styles.userInfo}>
                                <View style={styles.userInfoImg}>
                                    <Image source={require('../../images/pay/ali-pay.png')} style={styles.userInfoImgSize}/>
                                </View>
                                <View >
                                    <Text >进击的小红帽</Text>
                                    <Text style={styles.userInfoNameTxt}>消费总额:¥568.00</Text>
                                </View>
                            </View>
                            <View >
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
        marginVertical:6,
        padding:4
    },

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
        borderColor:'#F5F5F5',
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
        color:'#FFF',
    },

    purseBox:{
        paddingHorizontal:10,
        paddingTop:30,
        paddingBottom:15,
        borderRadius:5,
        backgroundColor:'#FF5940',
    },
    purseBoxFFF:{
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
        color:'#FFF',
        marginTop:16
    },

    moneyBig:{
        fontSize:40,
        // fontSize:30,
        color:'#FFF',
    },


    //已领详情
    flex1:{
        flex:1,
        paddingLeft:15,
        justifyContent:'space-between'
    },
    balanceDetailFlex:{
        flexDirection:'row',
        // flex:1,
        alignItems:'center'
    },
    balnaceMargin:{
        marginTop:20,
    },

    balanceDetail:{
        borderTopWidth:1,
        flexDirection:'row',
        paddingTop:21,
        borderTopColor:'rgba(255,255,255,.4)',
    },
    balanceDetailOn:{
        borderTopColor:'#E6E6E6',
    },


    balanceDetailTxt:{
        fontSize:12,
        color:'rgba(255,255,255,.6)',
        textAlign:'right',
        marginRight:13,
    },
    balanceDetailTxtOn:{
        color:'#999',
    },

    balanceDetailNum:{
        // fontSize:18,
        fontSize:14,
        color:'#FFF',
    },

    textBigWhite:{
        fontSize:12,
        color:'rgba(255,255,255,.6)'
    },

    userList:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },

    userInfoBox:{
        flex:1,
    },

    userInfoBoxBorder:{
        // height:70/667*screenHeight,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft:15,
        borderBottomWidth:hairlineWidth,
        borderBottomColor:'#ECECEC',
        paddingVertical:15,
        paddingRight:15
    },

    userInfo:{
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
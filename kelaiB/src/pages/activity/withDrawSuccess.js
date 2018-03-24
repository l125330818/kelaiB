import React from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';

import {
    DefaultButton,
}from "../../components";

const successImg = require("../../images/activity/activity-withdraw-success.png");
const paySuccessImg = require("../../images/activity/activity-paymentSuccess.png");

export default class WithDrawSuccess extends React.PureComponent{

    static defaultProps={
        type:2
    };
    render(){
        let {type}=this.props;
        return(
            <View style={styles.successBodyStyle}>
                <View style={styles.successImgBox}>
                    <Image source={type===1?successImg:paySuccessImg} />
                    {
                        type===1?<Text style={styles.bothImgBoxTxt}>提现申请已提交</Text>:
                              <Text style={[styles.payImgBoxTxt,styles.bothImgBoxTxt]}>支付成功</Text>
                    }
                </View>
                {

                   type===1?
                    <View style={styles.successTextBox}>
                        <View style={styles.successTextFlex}>
                            <Text style={styles.withDrawText9}>预计到账时间</Text>
                            <Text styel={styles.withDrawText6}>2小时内</Text>
                        </View>

                        <View style={styles.successTextFlex}>
                            <Text style={styles.withDrawText9}>提现到支付宝</Text>
                            <Text styel={styles.withDrawText6}>187****8976</Text>
                        </View>
                        <View style={styles.successTextFlex}>
                            <Text style={styles.withDrawText9}>提现金额</Text>
                            <Text styel={styles.withDrawText6}>¥8.00</Text>
                        </View>
                    </View>:<View style={styles.successTextBox}>
                                <View style={styles.successTextFlex}>
                                   <Text style={styles.withDrawText9}>支付方式</Text>
                                   <Text styel={styles.withDrawText6}>微信支付</Text>
                                </View>
                                <View style={styles.successTextFlex}>
                                   <Text style={styles.withDrawText9}>支付金额</Text>
                                   <Text styel={styles.withDrawText6}>¥8.00</Text>
                                </View>
                            </View>

                }

                <DefaultButton style={styles.successBtn}>
                    <Text style={{fontSize:18,color:'#FF5940'}}>完成</Text>
                </DefaultButton>
            </View>
        )
    }

}

const styles = createStyle({
    successBodyStyle:{
        flex:1,
        backgroundColor:'#fff',
        paddingHorizontal:27,
    },

    successImgBox:{
        marginTop:74/667*screenHeight,
        marginBottom:53/667*screenHeight,
        alignItems:'center',
    },
    bothImgBoxTxt:{
        marginTop:25,
        fontSize:18,
    },
    payImgBoxTxt:{
        color:'#54CC12',
    },

    successTextBox:{
        paddingVertical:10,
        borderTopColor:'#E6E6E6',
        borderTopWidth:hairlineWidth,
    },
    withDrawText9:{
        color:'#999'
    },
    withDrawText6:{
        color:'#666'
    },


    successTextFlex:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:15,
    },

    successBtn:{
        alignItems:'center',
        borderWidth:1,
        borderColor:'#FF5940',
        height:44,
        justifyContent:'center',
        borderRadius:22,
        marginTop:25/667*screenHeight,
    },
});
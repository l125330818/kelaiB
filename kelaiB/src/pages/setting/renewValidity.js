import React from 'react';
import {
    View,
    Text,
} from 'react-native';

import {
    Header,
    SubmitButton,
} from '../../components';

import showPicker from "../../components/ysUI/picker/picker";
import RowSelect from "../../components/shop/rowSelect";

export default class RenewTime extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            validity:["三个月"],
            maturity:"2017年12月30日",
            payAccount:"500.00",
            payMode:'微信支付',
            payTime:'9月10日 10:20',
            payNum:'+100',
        }
    }

    getValidity(){
        let data=[
            "三个月",
            "六个月",
            "一年",
            "两年",
            "三年",
        ];
        return data;
    }
    
    select(type){
        let {validity} =this.state;
        if(type==="renValidity"){
            showPicker(this.getValidity(),validity,(value)=>{
                this.setState({
                    validity:value,
                });
            })
        }
    }

    render(){
        let {validity,maturity,payAccount,payNum,payMode,payTime}=this.state;
        return(
            <View style={styles.containerFlex1}>
                <Header title="产品续费"/>
                <View style={styles.containerFlex1}>
                    <View style={[styles.containerRow,styles.validityBox]}>
                        <Text style={styles.validityBlack}>您的产品有效期至</Text>
                        <Text style={styles.validityRed}>{maturity}</Text>
                        <Text style={styles.validityBlack}>,该产品</Text>
                        <Text style={styles.validityRed}>168元/月。</Text>
                    </View>
                    <RowSelect
                        leftText = "续费时长"
                        onPress = {this.select.bind(this,"renValidity")}
                        rightText = {validity}
                    />
                    <View style={styles.payAccountBox}>
                        <View style={styles.payAccountTitle}>
                            <Text style={styles.payAccountTitle1}>
                                支付金额
                            </Text>
                        </View>
                        <View style={styles.payAccountMoney}>
                            <Text style={styles.payAccountTitle2}>￥</Text>
                            <Text style={styles.payAccountTitle2}>{payAccount}</Text>
                        </View>
                    </View>
                    <View style={styles.accountText}>
                        <Text style={[styles.validityBlack,styles.accountMargin]}>续费说明：</Text>
                        <View style={styles.validitySub}>
                            <SubmitButton>确认</SubmitButton>
                        </View>
                    </View>
                    <View style={styles.accountList}>
                        <View style={styles.payAccountTitle}>
                            <Text style={styles.payAccountTitle1}>
                                续费记录
                            </Text>
                        </View>
                        <View style={styles.accountListBorder}>
                            <View>
                                <Text style={styles.accountListFont1}>{payMode}</Text>
                                <Text style={styles.validityBlack}>{payTime}</Text>
                            </View>
                            <View>
                                <Text style={styles.accountListFont2}>{payNum}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = createStyle({
    containerFlex1:{
        flex:1
    },

    containerRow:{
        flexDirection:'row',
    },

    containerAlignCenter:{
        alignItems:'center',
    },

    containerJustCenter:{
        justifyContent:'center',
    },

    validityBox:{
        paddingTop:12,
        paddingHorizontal:15,
    },
    validityRed:{
        fontSize:12,
        color:'#FF5940',
    },
    validityBlack:{
        fontSize:12,
        color:'#999999',
    },

    payAccountBox:{
        height:122/667*screenHeight,
        backgroundColor:'#FFF',
        paddingHorizontal:8,
        marginTop:10,
    },
    payAccountTitle:{
        height:41/667*screenHeight,
        justifyContent:'center',
        paddingLeft:4,
    },
    payAccountMoney:{
        paddingTop:10,
        paddingBottom:30,
        flexDirection:'row',
    },
    payAccountTitle1:{
        fontSize:15,
        color:'#999',
    },
    payAccountTitle2:{
        fontSize:30,
        color:'#333',
    },
    accountText:{
        paddingHorizontal:15
    },
    accountMargin:{
        marginVertical:8,
    },
    validitySub:{
        // height:44,
        marginVertical:20,
        paddingTop:18,
        paddingBottom:16,
    },
    accountList:{
        flex:1,
        backgroundColor:'#fff',
        paddingLeft:12,
    },
    accountListBorder:{
        borderBottomColor:'#ECECEC',
        borderBottomWidth:hairlineWidth,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:70,
        paddingRight:13,
    },

    accountListFont1:{
        fontSize:16,
        color:'#333',
        marginBottom:4,
    },
    accountListFont2:{
        fontSize:19,
        color:'#FF5940',
    },

});
import React from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';

import {
    Header,
}from "../../components";

const redPacketImg = require('../../images/cashbackDetail/redPacket.png');
const expenditureImg = require('../../images/cashbackDetail/expenditure.png');
import Api from "../../config/Api";


export default class HideRedPacket extends React.PureComponent{

    static defaultProps = {
        type:1
    };
    constructor(props){
        super(props);

    }


    componentDidMount(){

    }

    render(){
        let {type}=this.props;
        return(
            <View style={styles.RedPacketBody}>
                <Header title="明细详情"/>
                <View style={styles.detailTitle}>
                    <Image source={type===1?redPacketImg:expenditureImg} style={styles.detailImage}/>
                    {type===1?<Text style={styles.redPacketText}>藏红包</Text>:
                        <Text style={styles.redPacketText}>消费返现</Text>}
                </View>
                <View style={styles.textDetail}>

                    <View style={styles.detailTextHeader}>
                        <Text style={styles.accountTitle}>支付金额</Text>
                        <Text style={styles.payMoney}>￥1000.00</Text>
                    </View>

                    <View style={styles.accountTextBox}>
                        <View style={[styles.detailTextBox,styles.detailTextMargin]}>
                            <Text style={styles.accountTitle}>当前状态</Text>
                            <Text>使用中</Text>
                        </View>
                        <View style={styles.detailTextBox}>
                            <Text style={styles.accountTitle}>支付时间</Text>
                            <Text>2017-1-23 14:23:21</Text>
                        </View>
                        <View style={styles.detailTextBox}>
                            <Text style={styles.accountTitle}>支付方式</Text>
                            <Text>支付宝+余额</Text>
                        </View>
                        <View style={styles.detailTextBox}>
                            <Text style={styles.accountTitle}>交易单号</Text>
                            <Text>34534645643563563635</Text>
                        </View>
                        <View style={styles.detailTextBox}>
                            <Text style={styles.accountTitle}>有效期至</Text>
                            <Text>2017-12-23 14:23:21</Text>
                        </View>
                    </View>

                </View>

            </View>
        )
    }
}

const styles = createStyle({
    RedPacketBody:{
        flex:1,
        backgroundColor:'#F4F4F4',
    },

    detailTitle:{
        flexDirection:'row',
        alignItems:'center',
        height:51/667*screenHeight,
        backgroundColor:'#fff',
        marginTop:10,
    },

    detailImage:{
        height:40,
        width:40,
        marginHorizontal:15,
    },

    redPacketText:{
        fontSize:16,
    },


    textDetail:{
        marginTop:10,
        backgroundColor:'#fff',
        paddingHorizontal:15,
        height:207/667*screenHeight,
    },

    detailTextHeader:{
        height:61/667*screenHeight,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:hairlineWidth,
        borderBottomColor:'#ECECEC'
    },

    detailTextMargin:{
        marginTop:16,
    },

    detailTextBox:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
    },

    accountTextBox:{
        height:145/667*screenHeight,
        justifyContent:'center'
    },

    payMoney:{
        fontSize:21,
    },

    accountTitle:{
        color:'#999'
    },

});
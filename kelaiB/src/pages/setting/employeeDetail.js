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
}from "../../components";

export default class EmployeeDetail extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={

        };
    }

    render(){
        return(
            <View style={styles.shopperDetailBody}>
                <Header title="员工详情"/>
                <View style={styles.shopperName}>
                    <Image source={require('../../images/pay/ali-pay.png')} style={styles.shopperNameImg}/>
                    <Text style={styles.shopperNameText}>进击的小红帽</Text>
                </View>
                <View style={styles.remarkName}>
                    <Text style={styles.remarkNameText}>备注名</Text>
                    <TextInput
                        placeholder="输入备注名称"
                        style={styles.remarkNameInput}
                        underlineColorAndroid='transparent'
                    />
                </View>
                <View style={styles.remarkName}>
                    <Text style={styles.remarkNameText}>手机号码</Text>
                    <TextInput
                        placeholder="输入手机号码"
                        style={styles.remarkNameInput}
                        underlineColorAndroid='transparent'
                    />
                </View>
                <View style={styles.detailBox}>
                    <View style={styles.flexRowBox}>
                        <Text style={styles.styleTitle}>在店时长</Text>
                        <Text>43分钟</Text>
                    </View>
                    <View style={styles.flexRowBox}>
                        <Text style={styles.styleTitle}>第几次来</Text>
                        <Text>12次</Text>
                    </View>
                    <View style={styles.flexRowBox}>
                        <Text style={styles.styleTitle}>进店时间</Text>
                        <Text>2017-9-12 10:23:23</Text>
                    </View>
                    <View style={styles.flexRowBox}>
                        <Text style={styles.styleTitle}>离店时间</Text>
                        <Text>2017-9-12 10:23:23</Text>
                    </View>
                </View>
                <View style={styles.remarkMore}>
                    <View style={styles.remarkMoreTitle}>
                        <Text style={styles.remarkMoreTitleTxt}>更多备注信息</Text>
                    </View>
                    <View style={styles.remarkMoreInput}>
                        <TextInput
                            placeholder="输入更多备注信息..."
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View style={styles.remarkMoreBtnBox}>
                        <DefaultButton style={styles.remarkMoreBtn}>
                            <Text style={styles.remarkMoreBtnTxt}>添加名片或相关图片</Text>
                        </DefaultButton>
                    </View>
                </View>

            </View>
        )
    }
}

const styles = createStyle({

    shopperDetailBody:{
        flex:1,
        backgroundColor:'#F4F4F4',
    },

    shopperName:{
        marginTop:10,
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:15,
        height:61/667*screenHeight,
    },
    shopperNameImg:{
        marginRight:10,
        height:40,
        width:40,
        borderRadius:20,
    },
    shopperNameText:{
        fontSize:17,
    },

    remarkName:{
        marginTop:10,
        backgroundColor:'#fff',
        height:51/667*screenHeight,
        paddingHorizontal:15,
        flexDirection:'row',
        alignItems:'center',
    },
    remarkNameText:{
        flex:1,
        fontSize:16,
    },
    remarkNameInput:{
        flex:1,
        textAlign:'right',
    },

    detailBox:{
        marginTop:10,
        backgroundColor:'#fff',
        paddingHorizontal:15,
        height:96/667*screenHeight,
    },
    flexRowBox:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    styleTitle:{
        color:'#999',
    },


    remarkMore:{
        marginTop:10,
        backgroundColor:'#fff',
        paddingHorizontal:15,
        height:227/667*screenHeight,
    },
    remarkMoreTitle:{
        height:40/667*screenHeight,
        justifyContent:'center',
    },
    remarkMoreTitleTxt:{
        fontSize:15,
        color:'#999',
    },
    remarkMoreInput:{
        height:40/667*screenHeight,
        borderBottomWidth:hairlineWidth,
        borderBottomColor:'#E5E5E5',
    },
    remarkMoreBtnBox:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    remarkMoreBtn:{
        width:250/375*screenWidth,
        height:112/667*screenHeight,
        borderWidth:1,
        borderColor:'#e0e0e0',
        alignItems:'center',
        justifyContent:'center',
    },
    remarkMoreBtnTxt:{
        color:'#FF5940',
    },

    diyList:{
        flex:1,
        paddingHorizontal:10,
        // paddingVertical:15,
        flexDirection:'row',
        justifyContent:'flex-start',
        flexWrap:'wrap',
    },
    diyListAddBtn:{
        width:94,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15,
        borderWidth:hairlineWidth,
        borderColor:'#FF5940',
        marginTop:15,
        marginLeft:5
    },
    diyListAddBtnTxt:{
        color:'#FF5940',
    },
    diyListBtn:{
        width:83,
        height:31,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15,
        marginLeft:5,
        marginTop:15
        // backgroundColor:'#E6E6E6',
    },
    diyListBtnRed:{
        backgroundColor:'#FF5940',
    },
    diyListBtnGray:{
        backgroundColor:'#E6E6E6',
    },
    diyListTextWhite:{
        color:'#fff'
    },
    diyListTextBlack:{
        color:'#999999'
    },

});
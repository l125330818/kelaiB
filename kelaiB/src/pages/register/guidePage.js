import React from 'react';
import ReactNative,{
    View,
    Image,
    Text,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
} from "react-native";

import {
    DefaultButton,
} from "../../components";


import Swiper from 'react-native-swiper';



const page0 = require("../../images/register/guidePage-0.png");
const page1 = require("../../images/register/guidePage-1.png");
const page2 = require("../../images/register/guidePage-2.png");
const pageFont = require("../../images/register/guidePage-font.png");

export default class guidePage extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            list:[
                {flag:true,url:page0,text1:'客流分析',text2:'实时观测客流数据',},
                {flag:true,url:page1,text1:'客户感知',text2:'促进更顺利的成交',},
                {flag:true,url:page2,text1:'店内活动',text2:'提升到店率，增强顾客粘性',},
                {flag:false,url:pageFont},
            ],
        };
        this.jump=this.jump.bind(this)

    }
    jump(){
        this.props.navigation.navigate('login')
    }
    pageNext(){
        this.swiperRef.scrollBy(1);
    }

    render(){
        let {list}=this.state;
        return(
            <View style={styles.guideFlex1}>
                <StatusBar
                    barStyle={"light-content"}
                    backgroundColor = "#FF5941"
                />
                <View style={styles.swiperContainer}>
                    <Swiper
                        loop={false}
                        style={styles.swiperBox}
                        ref={(c)=>{this.swiperRef = c}}
                        showsButtons={false}
                        paginationStyle={styles.pagination}
                        dotStyle={styles.paginationDot}
                        activeDotStyle={styles.paginationActiveDot}
                    >
                        {
                            list.map((item,index)=>{
                                return(
                                    item.flag?
                                    <ImageBackground
                                        source={item.url}
                                        resizeMode="stretch"
                                        style={styles.guideBackGround}
                                        key={index}
                                    >
                                        <TouchableOpacity
                                            style={styles.guideBtn}
                                            onPress={this.pageNext.bind(this)}
                                            activeOpacity={1}

                                        >
                                            <Text style={styles.swiperText1}>{item.text1}</Text>
                                            <Text style={styles.swiperText2}>{item.text2}</Text>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                        :
                                    <View style={styles.swiper4} key={index}>
                                        <Image
                                            source={pageFont}
                                        />
                                        <DefaultButton style={styles.swiperBtn4} onPress={this.jump}>
                                            <Text style={styles.btnFont4}>立即体验</Text>
                                        </DefaultButton>
                                    </View>
                                )

                            })
                        }
                    </Swiper>
                </View>
                <DefaultButton onPress = {this.jump} style={styles.headBtn}>
                    <Text style={styles.headBtnTxt}>跳过</Text>
                </DefaultButton>
            </View>
        )
    }
}

const styles = createStyle({
    guideFlex1:{
        flex:1,
    },
    headBtn:{
        position:'absolute',
        alignItems:'center',
        justifyContent:'center',
        top:(isIos?35:15)/667*screenHeight,
        right:15/667*screenHeight,
        height:26/667*screenHeight,
        width:51/375*screenWidth,
        borderRadius:26/667*screenHeight/2,
        backgroundColor:'rgba(255,255,255,.2)',
    },
    headBtnTxt:{
        fontSize:12,
        color:'#fff',
    },

    //swiper-pagination
    pagination:{
        bottom:25/667*screenHeight,
    },
    paginationDot:{
        backgroundColor:'#BDBDBD',
		marginLeft:12,
		marginRight:12,
		height:8,
		width:8
    },
    paginationActiveDot:{
        backgroundColor:'#505050',
		marginLeft:12,
        marginRight:12,
        height:8,
        width:8
    },
    //swiper
    swiperContainer:{
        flex:1,
        backgroundColor:'#FF5941',
    },
    swiperBox:{
        marginTop:(isIos?46:26)/667*screenHeight,

    },
    guideBackGround:{
        flex:1,
        alignItems:'center'
    },
    guideBtn:{
        height:622/667*screenHeight,
        width:screenWidth,
        alignItems:'center'
    },
    swiperText1:{
        fontSize:30,
        color:'#FF5A43',
        marginTop:(isIos?501:486)/667*screenHeight,
        fontWeight:"bold"
    },
    swiperText2:{
        fontSize:16,
        color:'#FF5941',
        marginTop:15,
    },



    swiper4:{
        flex:1,
        backgroundColor:'#FF5941',
        alignItems:'center',
        paddingTop:122/667*screenHeight,
    },
    swiperBtn4:{
        width:200/375*screenWidth,
        height:41/667*screenHeight,
        borderRadius:41/667*screenHeight/2,
        marginTop:252/667*screenHeight,
        borderColor:'#FFFFFF',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center'
    },
    btnFont4:{
        fontSize:16,
        color:'#fff'
    },

});
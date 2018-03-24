import React from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';

import {
    Header,
    DefaultButton,
} from '../../components';

const aboutUsImg = require("../../images/setting/set-aboutUs.png");

export default class AboutUs extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            phoneNum:"186 8356 2198",
            emailNum:"hw@yisan.tech",
        };
        this.callPhone=this.callPhone.bind(this);
        this.copyEmail=this.copyEmail.bind(this);
    }
    callPhone(){
        let {phoneNum} =this.state;
        this.props.modal.confirm({
            content: <Text>{phoneNum}</Text>,
            onSubmit:()=>{

            },
            onCancel:()=>{

            },
            title:"",
            submitText:'呼叫',
            cancelText:'取消',
        })
    }
    copyEmail(){
        let {emailNum} =this.state;
        this.props.modal.confirm({
            content: <Text>{emailNum}</Text>,
            onSubmit:()=>{

            },
            onCancel:()=>{

            },
            title:"",
            submitText:'复制',
            cancelText:'取消',
        })
    }
    render(){
        let {phoneNum,emailNum}=this.state;
        return(
            <View style={styles.containerFlex1}>
                <Header title="关于我们"/>
                <View style={styles.containerFlex1}>
                    <View style={styles.aboutUsImgBox}>
                        <View>
                           <Image source={aboutUsImg}/>
                        </View>
                        <View style={styles.aboutUsText}>
                            <Text style={styles.aboutUsfont1}>客多客</Text>
                            <Text style={styles.aboutUsfont2}>客至钱来</Text>
                        </View>
                    </View>
                    <View style={styles.aboutUsContainer}>
                        <View style={styles.phoneContainer}>
                            <View>
                                <Text style={styles.aboutFont1}>客服电话</Text>
                            </View>
                            <DefaultButton
                                onPress={this.callPhone}
                            >
                                <Text style={styles.aboutFont2}>{phoneNum}</Text>
                            </DefaultButton>
                        </View>
                        <View style={styles.phoneContainer}>
                            <View>
                                <Text style={styles.aboutFont1}>客服电话</Text>
                            </View>
                            <DefaultButton
                                onPress={this.copyEmail}
                            >
                                <Text style={styles.aboutFont2}>{emailNum}</Text>
                            </DefaultButton>
                        </View>

                    </View>
                    <View style={styles.aboutUsFooter}>
                        <Text style={styles.aboutUsFooterText}>Copyright 2017 成都易叁科技有限公司</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = createStyle({
    containerFlex1:{
        flex:1,
        backgroundColor:'#fff'
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

    aboutUsImgBox:{
        position:'relative',
        alignItems:'center',
        paddingTop:50,
        paddingBottom:80,
    },
    aboutUsImg:{
        width:90,
        height:90,
    },
    aboutUsText:{
        position:'absolute',
        top:160,
    },

    aboutUsfont1:{
        fontSize:18,
        color:'#333',
        textAlign:'center'
    },
    aboutUsfont2:{
        fontSize:12,
        color:'#999',
        marginTop:10,
        textAlign:'center'
    },

    aboutUsContainer:{
        flex:1,
        paddingHorizontal:10,
    },
    phoneContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:14,
        borderBottomWidth:hairlineWidth,
        borderBottomColor:'#ECECEC'
    },

    aboutFont1:{
        fontSize:16,
        color:'#333'
    },
    aboutFont2:{
        fontSize:16,
        color:'#999'
    },

    aboutUsFooter:{
        position:'relative',
        alignItems:'center',
    },
    aboutUsFooterText:{
        position:'absolute',
        bottom:25,
        fontSize:12,
        color:'#666666',
    },

});
import React,{PureComponent} from "react";
import {
    View,
    Image,
    Text,
    ScrollView,
    TextInput,
    StyleSheet,
    TouchableOpacity,

} from "react-native";


export default class SettingHeader extends PureComponent{
    constructor(props){
        super(props);
    }

    render (){
        return (
            <View style={[...this.props, styles.container]}>
                <TouchableOpacity onPress={this.props.tapCodeStr}>
                <View style={styles.centerView}>
                    <View style={styles.iconContainer}>
                        <Image style={styles.icon} source={require('../../images/activity/receipt-detail-icon.png')}/>
                        <Text style={styles.shopName}>鱼屋</Text>
                        <View style={{position:'absolute', left:15, right:15, height:0.5, bottom:0, backgroundColor:'#e5e5e5'}}></View>
                    </View>
                    <View style={styles.bottomView}>
                        <Text style={styles.codeStyle}>DH1288IC</Text>
                        <Text style={styles.codeTip}>邀请码</Text>
                    </View>
                    <Image style={styles.jumpIconStyle} source={require('../../images/setting/icon_setting_jump.png')}/>
                </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
       justifyContent:'center'
    },
    centerView:{
        backgroundColor:'white',
        borderRadius:5.0,
        marginTop:9,
        marginLeft:15,
        marginRight:15,
        height:151,
        marginBottom:15
    },
    iconContainer:{
      height:60,
        flexDirection:'row',
        alignItems:'center',

    },
    icon:{
        width:41,
        height:41,
        borderRadius:20.5,
        marginLeft:15
    },
    shopName:{
        color:'#333',
        marginLeft:15,
        fontSize:17,
        fontWeight:'500'
    },
    codeStyle:{
        fontSize:21,
        color:'#333',
    },
    codeTip:{
        fontSize:12,
        color:'#999',
        marginTop:4
    },
    bottomView:{
        width:'100%',
        height:90,
        alignItems:'center',
        justifyContent:'center'
    },
    jumpIconStyle:{
        position:'absolute',
        right:15,
        bottom:15
    }
})
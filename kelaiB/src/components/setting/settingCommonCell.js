import React,{PureComponent} from "react";
import {
    View,
    Image,
    Text,
    ScrollView,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from "react-native";

const width = Dimensions.get('window').width;
export default class SettingCommonCell extends PureComponent {
    render() {
        return (
            <TouchableOpacity opacity={0.4} onPress={this.props.onPress}>
            <View style={styles.container}>
                <View style={styles.leftView}>
                    <Image source={this.props.iconSource} style={styles.icon}/>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
                <View style={styles.rightView}>
                    {
                        this.props.subtitle && <Text style={styles.subTitle}>{this.props.subtitle.length && this.props.subtitle}</Text>
                    }
                    <Image style={styles.nextIcon} source={require('../../images/setting/icon_setting_next.png')}/>
                </View>
                <View style={styles.line}></View>
            </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        height:55,
        width:width,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    leftView:{
        height:'100%',
        alignItems:'center',
        flexDirection:'row'
    },
    icon: {
        marginLeft: 15,
        marginRight:15
    },
    rightView:{
        height:'100%',
        alignItems:'center',
        flexDirection:'row'
    },
    nextIcon:{
        marginRight:15,
        marginLeft:15
    },
    subTitle:{
        color:'#999',
        fontSize:14
    },
    line:{
        height:0.5,
        backgroundColor:'#e5e5e5',
        position:'absolute',
        left:15,
        right:0,
        bottom:0
    }
})

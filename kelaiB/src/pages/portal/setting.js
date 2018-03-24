/**
 * Created by luojie on 2017/10/11.
 */
import React,{PureComponent} from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
	Dimensions,
	ScrollView,
	ListView,
	FlatList,
	RefreshControl,
} from "react-native";

import * as Storage from "../../util/storage";
import CustomHeader from "../../components/ysUI/header/customHeader"
import SettingHeader from '../../../src/components/setting/settingHeader'
import SettingCommonCell from '../../../src/components/setting/settingCommonCell'
import DefaultButton from '../../../src/components/ysUI/button/defaultButton'

const homeDefaultIcon = require("../../images/portal/home.png");
const homeSelectIcon = require("../../images/portal/home-select.png");
const scanIcon = require("../../images/setting/icon_scan.png");
const messageIcon = require('../../images/setting/icon_message.png');


const {width, height} = Dimensions.get('window');
export default class Wallet extends PureComponent {
    static navigationOptions = {
        header: null,
        tabBarLabel: "设置",
        showLabel: false,
        tabBarIcon: ({tintColor, focused}) => {
            let imgSource = focused ? homeSelectIcon : homeDefaultIcon
            return (<Image source={imgSource}/>)
        },

    }

    constructor(props) {
        super(props);
        this.renderLeft = this.renderLeft.bind(this);
        this.renderRight = this.renderRight.bind(this);
        this.tapCodeStr = this.tapCodeStr.bind(this);
        this.shopIdentity = this.shopIdentity.bind(this);
        this.staffManager = this.staffManager.bind(this);
        this.feedBack = this.feedBack.bind(this);
        this.loginOut = this.loginOut.bind(this);
    }

    componentDidMount() {

    }

    renderLeft() {
        return (
			<DefaultButton onPress={this.leftPress.bind(this)}>
				<Image style={{padding:10, paddingLeft:0}} source={scanIcon}/>
			</DefaultButton>
        )
    }

    renderRight(){
        return (
            <DefaultButton onPress={this.rightPress.bind(this)}>
                <Image style={{padding:10, paddingRight:0}} source={messageIcon}/>
            </DefaultButton>
        )
    }

    /// 点击店铺名字
    tapCodeStr(){
        console.log('邀请码');
    }

    /// 商户认证
    shopIdentity(){
        console.log('商户认证');
    }
    /// 员工管理
    staffManager(){
        console.log('员工管理');
    }
    /// 反馈中心
    feedBack(){
        console.log('反馈中心');
    }
    /// 退出登陆
    loginOut(){
		Storage.setItem("isLogin","0").then(()=>{
			this.props.navigation.navigate("login");
		});
    }
    render() {
        return (
			<View style={styles.container}>
				<CustomHeader
					title="设置"
					renderLeft={this.renderLeft}
                    renderRight={this.renderRight}
				/>
                <ScrollView style={{flex:1}}>
                    <SettingHeader
                        style={styles.headerView}
                        tapCodeStr={this.tapCodeStr}
                    />
                    <SettingCommonCell
                        iconSource={require('../../images/setting/icon_setting_shop.png')}
                        onPress = {this.shopIdentity}
                        title='商户认证'
                        subtitle="已认证"
                    />
                    <SettingCommonCell
                        iconSource={require('../../images/setting/icon_setting_manager.png')}
                        onPress = {this.staffManager}
                        title='员工管理'
                    />
                    <SettingCommonCell
                        iconSource={require('../../images/setting/icon_setting_feedback.png')}
                        onPress = {this.feedBack}
                        title="反馈中心"
                    />

                    <DefaultButton
                        onPress={this.loginOut}
                        style={styles.logOut}
                        children={<Text style={styles.logOutText}>退出登陆</Text>}
                    />
                </ScrollView>
            </View>
        )
    }

    /// 点击扫一扫
    leftPress() {
        console.log("扫一扫");
    }

    /// 点击消息
    rightPress(){
        console.log('消息');
    }
}

const styles = StyleSheet.create({

	container: {
		flex: 1,
		backgroundColor:"#F7F7F7"
	},
    headerView:{
	    width:width,
        height:170,

    },
    logOut: {
	    backgroundColor:'white',
        height:56,
        justifyContent:'center',
        paddingLeft:15
    },
    logOutText:{
	    color:'#333',
        fontSize:16,

    }
});
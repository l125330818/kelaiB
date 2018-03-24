import React,{PureComponent} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
}from "react-native";
import Modal from "react-native-modalbox";
import {
    DefaultButton
} from "../../";
import Api from "../../../config/Api";

import SplashScreen from 'react-native-splash-screen';
const payClose = require("../../../images/pay/payPasswordClose.png");
const deleteImg = require("../../../images/pay/keyboard-Delete-defaul.png");
const deleteImgDown = require("../../../images/pay/keyboard-Delete-keyDown.png");

export  default  class payPassword extends React.PureComponent{
    constructor(props){
        super(props);
        this.state= {
            url:deleteImg,
            keyNum: [
                {numArr: [{key: 1}, {key: 2}, {key: 3}]},
                {numArr: [{key: 4}, {key: 5}, {key: 6}]},
                {numArr: [{key: 7}, {key: 8}, {key: 9}]},
                {numArr: [{key:'null'}, {key: 0}, {key:'delete'}]},
            ],
            userKeyDown: [
                {key:1,value:''},
                {key:2,value:''},
                {key:3,value:''},
                {key:4,value:''},
                {key:5,value:''},
                {key:6,value:''},
            ],
        };
        this.closeModal=this.closeModal.bind(this);
        this.pwdStr = [];
    }

    componentDidMount(){
		SplashScreen.hide();
        this.passwordModal.open();
    }
    closeModal(){
        this.passwordModal.close();
    }
	onPressKey(e){
		let {userKeyDown} = this.state;

		if(e === "null" ) return;
        if(e === "delete"){
            this.pwdStr.pop();
			userKeyDown[this.pwdStr.length].value = "";
        }else{
			if(this.pwdStr.length >= 6 ){
                return;
            }
			this.pwdStr.push(e);
			this.pwdStr.map((item,index)=>{
				userKeyDown[index].value = item;
			});
        }
		this.setState({
			userKeyDown:[].concat(userKeyDown)
		})
    }
    render(){
        let {keyNum,userKeyDown} = this.state;
        return(
            <Modal
                ref={(c)=>{this.passwordModal=c}}
                style={styles.modalContainer}
                swipeToClose={false}
                backdropOpacity={0.3}
            >
                <View style={styles.passwordContainer}>
                    <View style = {styles.titleWrapper}>
                        <Text style = {styles.titleText}>请输入提现密码</Text>
                        <DefaultButton style = {styles.closeImg} onPress = {this.closeModal}>
                            <Image  source={payClose}/>
                        </DefaultButton>
                    </View>
                    <View style = {styles.contentWrapper}>
                        <Text style = {styles.tipsText}>提现</Text>
                        <Text style = {styles.withDrawMoneyText}>￥{1000.00}</Text>
                        <View style = {styles.inputOutWrapper}>
                            <View style = {styles.inputInnerWrapper}>
                                {
									userKeyDown.map((item,index)=>{
									    return(
                                            <View key = {index} style = {styles.inputCell}>
                                                {
                                                    item.value !== "" &&
                                                    <View style = {styles.inputCircle}/>
												}
                                            </View>
										)
                                    })
                                }
                            </View>
                        </View>
                    </View>

                </View>
                <View style = {styles.keyboardWrapper}>
					{
						keyNum.map((item,index)=>{
							return (
                                <Keyboard
                                    onPress = {this.onPressKey.bind(this)}
                                    key = {index}
                                    keys = {item.numArr}/>
							)
						})
					}
                </View>
            </Modal>
        )
    }
}

class Keyboard extends React.PureComponent{
    constructor(props){
        super(props);
    }
    render(){
        let {keys} = this.props;
        return(
            <View style = {styles.keyboardRowWrapper}>
                <View style = {styles.keyboardRow}>
                    {
                        keys.map((item,index)=>{
                            return <KeyNum {...this.props} key = {index} num = {item}/>
                        })
                    }
                </View>
            </View>
        )
    }
}

class KeyNum extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            active:false,
        };
        this.onPressKey = this.onPressKey.bind(this);
        this.onPressIn = this.onPressIn.bind(this);
        this.onPressOut = this.onPressOut.bind(this);
    }
	onPressKey(){
        let {onPress,num} = this.props;
        onPress && onPress(num.key);
    }
	onPressIn(){
	    this.setState({
            active:true,
        })
    }
	onPressOut(){
		this.setState({
			active:false,
		})
    }
    getKey(){
		let {active} = this.state;
		let {num} = this.props;
		let key = num.key;
		switch (key){
            case "null":
                return(
                    <DefaultButton
                        onPress = {this.onPressKey}
                        onPressIn = {this.onPressIn}
                        onPressOut = {this.onPressOut}
                        style = {[styles.keyboardCell,styles.activeKeyboardCell]}>

                    </DefaultButton>
                );
                break;
            case "delete":
				return(
                    <DefaultButton
                        onPress = {this.onPressKey}
                        onPressIn = {this.onPressIn}
                        onPressOut = {this.onPressOut}
                        style = {[styles.keyboardCell,styles.activeKeyboardCell]}>
                        {
                            active?
                                <Image source={deleteImgDown}/>
                                :
                                <Image source={deleteImg}/>
                        }
                    </DefaultButton>
				);
				break;
            default:
				return (
                    <DefaultButton
                        onPress = {this.onPressKey}
                        onPressIn = {this.onPressIn}
                        onPressOut = {this.onPressOut}
                        style = {[styles.keyboardCell,active && styles.activeKeyboardCell]}>
                        <Text style = {styles.keyboardNum}>{key}</Text>
                    </DefaultButton>
                )
        }
    }
    render(){
        return this.getKey()
    }
}

const styles=createStyle({
    alignCenter:{
        alignItems:'center',
    },

    modalContainer:{
        justifyContent:'flex-end',
        backgroundColor:'rgba(0,0,0,0.6)',
    },

    passwordContainer:{
        marginHorizontal:32,
        backgroundColor:'#F7F7F7',
        marginBottom:68,
        borderRadius:5,
    },
	titleWrapper:{
        height:50,
        justifyContent:"center",
        alignItems:"center",
        borderBottomWidth:hairlineWidth,
        borderColor:"#E6E6E6",
		position:'relative',

	},
	titleText:{
        fontSize:18,
        color:"#333",
        fontWeight:"bold"
    },
	closeImg:{
        position:"absolute",
        left:11,
        top:20
    },
	contentWrapper:{
        paddingBottom:17,
        paddingTop:15,
        paddingHorizontal:19,
        alignItems:"center"
    },
	tipsText:{
        fontSize:18,
        color:"#333"
    },
	withDrawMoneyText:{
        fontSize:50,
        color:"#333"
    },
	inputOutWrapper:{
        flexDirection:"row",
		marginTop:20,
		backgroundColor:"#fff"

	},
	inputInnerWrapper:{
        flex:1,
        borderRadius:5,
        height:46,
        borderColor:"#ccc",
        borderWidth:hairlineWidth,
        flexDirection:"row"
    },
	inputCell:{
        flex:1,
        borderRightWidth:hairlineWidth,
        borderColor:"#E6E6E6",
        justifyContent:"center",
        alignItems:"center",
    },
	inputCircle:{
        height:10,
        width:10,
        backgroundColor:"#333",
        borderRadius:5
    },
	keyboardWrapper:{
        backgroundColor:"#fff"
    },
	keyboardRowWrapper:{
        height:54,
        flexDirection:"row"
    },
	keyboardRow:{
        flex:1,
        borderBottomWidth:hairlineWidth,
        borderColor:"#8c8c8c",
		flexDirection:"row"
    },
	keyboardCell:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        borderRightWidth:hairlineWidth,
		borderColor:"#8c8c8c"
    },
	keyboardNum:{
        fontSize:28,
        color:"#333"
    },
	activeKeyboardCell:{
        backgroundColor:"#D1D5DB"
    }

});
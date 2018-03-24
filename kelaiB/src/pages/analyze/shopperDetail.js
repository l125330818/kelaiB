import React from 'react';
import {
    View,
    Text,
    Image,
    Keyboard,
} from 'react-native';


import {
    Header,
    DefaultButton,
    SubmitButton,
    BaseInput,
}from "../../components";

import Modal from "react-native-modalbox";

export default class ShopperDetail extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            list:[
                // {target:"哈哈",checked:true},
            ],
            newDetail:'',
            keyboardHeight:''
        };
        this.addUserTagBtn=this.addUserTagBtn.bind(this);
        this.clickSubmit=this.clickSubmit.bind(this);
        this.defaultInput=this.defaultInput.bind(this);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    _keyboardDidShow(e){
        this.setState({
            keyboardHeight:e.endCoordinates.height,
        })

    }

    _keyboardDidHide(){
        this.setState({
            keyboardHeight:0
        })
    }


    componentDidMount(){
        Keyboard.dismiss();
    }

    showUserTag(index){
        let {list} = this.state;
        let newList = deepCopy(list);
        newList[index].checked = !newList[index].checked;
        this.setState({
            list:newList
        });
    }

    defaultInput(value){
        let {keyboardHeight}=this.state;
        this.setState({
            newDetail:value,
        })
    }

    addUserTagBtn(){
        this.addUserTag.open();
        this.setState({
            keyboardHeight:0,
        })
    }

    clickSubmit(){
        Keyboard.dismiss();
        let {list,newDetail}=this.state;
        this.addUserTag.close();
        list.push({target:newDetail,child:true});
        this.setState({
            list:[].concat(list),
        })
    };

    render(){
        let {list,keyboardHeight}=this.state;
        return(
            <View style={styles.shopperDetailBody}>
                <Header title="顾客详情" {...this.props}/>
                <View style={styles.shopperName}>
                    <Image source={require('../../images/pay/ali-pay.png')} style={styles.shopperNameImg}/>
                    <Text style={styles.shopperNameText}>进击的小红帽</Text>
                </View>
                <View style={styles.remarkName}>
                    <Text style={styles.remarkNameText}>备注名</Text>
                    <BaseInput
                        placeholder="输入备注名称"
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
                </View>
                <View style={styles.remarkMore}>
                    <View style={styles.remarkMoreTitle}>
                        <Text style={styles.remarkMoreTitleTxt}>更多备注信息</Text>
                    </View>
                    <View style={styles.remarkMoreInput}>
                        <BaseInput
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
                <View style={styles.diyList}>
                    {
                        list.map((item,index)=>{
                            return(
                                <DefaultButton
                                    key = {index}
                                    style={[styles.diyListBtn,item.checked?styles.diyListBtnRed:styles.diyListBtnGray]}
                                    onPress={this.showUserTag.bind(this,index)}>
                                    <Text style={item.checked?styles.diyListTextWhite:styles.diyListTextBlack}>{item.target}</Text>
                                </DefaultButton>
                            )
                        })
                    }

                    <DefaultButton
                        style={styles.diyListAddBtn}
                        onPress={this.addUserTagBtn}
                    >
                        <Text style={styles.diyListAddBtnTxt}>+添加标签</Text>
                    </DefaultButton>

                </View>
                <Modal
                    ref={(c)=>{this.addUserTag=c}}
                    swipeToClose={false}
                    backButtonClose={true}
                    backdropPressToClose={true}
                    position = "center"
                    style={[styles.modalContainer,]}
                >
                    <View style={[styles.modalCenter,{marginBottom:keyboardHeight}]}>
                        <View style={styles.modalTextBox}>
                            <Text style={styles.modalText}>添加标签</Text>
                            <View style={styles.modalInputBox}>
                                <BaseInput
                                    placeholder="自定义标签，最多4个字"
                                    underlineColorAndroid='transparent'
                                    maxLength={4}
                                    style={styles.modalInput}
                                    onChangeText={this.defaultInput}
                                />
                            </View>
                        </View>
                        <View style={styles.modalSub}>
                            <SubmitButton
                                onPress={this.clickSubmit}
                            >
                                提交
                            </SubmitButton>
                        </View>
                    </View>
                </Modal>
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
        borderLeftColor:'#FF5940',
        borderLeftWidth:1,
        paddingLeft:10,
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
        flexDirection:'row',
        justifyContent:'center',
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


    modalContainer:{
        backgroundColor:'rgba(0,0,0,0)',
        width:screenWidth-30,
        height:undefined,
    },
    modalCenter:{
        width:screenWidth-30,
        paddingHorizontal:15,
        backgroundColor:'#fff',
        paddingTop:28,
        paddingBottom:21,
        borderRadius:5,
        // marginBottom:100,
    },
    modalTextBox:{
        marginBottom:37,
        alignItems:'center'
    },
    modalText:{
        fontSize:18,
        color:'#333',
        fontWeight:'bold',
    },
    modalInputBox:{
        height:41,
        marginTop:14,
        flexDirection:'row',
        marginHorizontal:52,
        borderBottomWidth:hairlineWidth,
        borderBottomColor:'#E6E6E6'
    },
    modalInput:{
        flex:1,
        height:41,
        textAlign:'center',
    },

    modalSub:{
        height:44,
    },

});
import React from "react";
import {
    View,
    Text,
    Image,
} from "react-native";

import { DefaultButton} from '../../../components'

import Modal from "react-native-modalbox";

const closeIcon = require("../../../images/setting/dialog-close.png");
const succeedIcon = require("../../../images/setting/scanCode-succeed.png");
const unSucceedIcon = require("../../../images/setting/scanCode-false.png");

export default class scanCodeSucceed extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            coupon:'满200减50',

        };
        this.closeModal=this.closeModal.bind(this)
    }

    componentDidMount(){
        this.modalRef.open();
    }

    static defaultProps={
        type:2,
    };

    closeModal(){
        this.modalRef.close();
    }

    render(){
        let {coupon} =this.state;
        let {type}=this.props;
        return(
            <Modal
                position = "center"
                ref={(e)=>{this.modalRef = e}}
                style={styles.modalContainer}
                backdropOpacity={0.4}
                swipeToClose={false}
            >
                <View>
                    <View style={styles.titleContainer}>
                        {
                            type===1?
                                <Text style={styles.titleText}>{coupon}</Text>
                                :
                                <Text style={styles.titleTextGary}>非本店的优惠券</Text>
                        }
                        <View style={styles.closeIcon}>
                            <DefaultButton
                                onPress={this.closeModal}
                                style={styles.closeBtn}
                            >
                                <Image source={closeIcon}/>
                            </DefaultButton>
                        </View>
                    </View>
                    <View style={styles.detailContainer}>
                        <Image source={type===1?succeedIcon:unSucceedIcon}/>
                        {
                            type===1?
                                <Text style={styles.detailText}>优惠券识别成功!</Text>
                                :
                                <Text style={styles.detailTextRed}>优惠券不匹配</Text>
                        }
                    </View>
                </View>
            </Modal>
        )
    }

}

const styles=createStyle({
    modalContainer:{
        backgroundColor:'rgba(0,0,0,0)',
        justifyContent:'center',
        alignItems:'center',
        width:screenWidth-60,
        height:undefined,
    },
    titleContainer:{
        width:screenWidth-60,
        alignItems:'center',
        paddingVertical:50,
        position:'relative',
        backgroundColor:'#FFE9E6',
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
    },
    titleText:{
        color:'#4D4D4D',
        fontSize:30,
        fontWeight:'bold',
    },
    titleTextGary:{
        color:'#666',
        fontSize:30,
        fontWeight:'bold',
    },
    closeIcon:{
        position:'absolute',
        top:17,
        right:17,

    },
    closeBtn:{
        width:34,
        height:34,
        alignItems:'flex-end',
        justifyContent:'flex-start',
    },

    detailContainer:{
        backgroundColor:'#fff',
        alignItems:'center',
        paddingVertical:46,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
    },

    detailText:{
        fontSize:20,
        color:'#54CC12',
        textAlign:'center',
        marginTop:17,
    },

    detailTextRed:{
        color:'#FF5940',
        fontSize:20,
        textAlign:'center',
        marginTop:17,
    },
});
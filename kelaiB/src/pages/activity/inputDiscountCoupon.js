import React from 'react';
import {
    View,
    Text,
    TextInput,
} from "react-native";

import {
    DefaultButton,
    SubmitButton,
    BaseInput,
} from "../../components"

import Modal from 'react-native-modalbox'

export default class InputDiscountCoupon extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            inputValue:''
        };
        this.inputChangeText=this.inputChangeText.bind(this);
    }

    componentDidMount(){
        this.discountRef.open();
        // console.log(this.viewBox)
    }

    inputChangeText(value){

        this.setState({
            inputValue:value,
        });
    }

    render(){
        let {inputValue} =this.state;
        return(
            <Modal
                ref={(e)=>{this.discountRef = e}}
                // position = "center"
                style={styles.modalContainer}
                backdropOpacity={0.4}
                swipeToClose={false}
            >

                <View style={styles.textViewContainer}>
                    <View style={styles.codeInputContainer}>
                        <BaseInput
                            placeholder="请输入优惠码"
                            maxLength={8}
                            value={inputValue}
                            style={styles.codeInput}
                            onChangeText={this.inputChangeText}
                        />
                    </View>
                    <View style={styles.subBtnContainer}>
                        <SubmitButton>
                            确定
                        </SubmitButton>
                    </View>

                    <View style={styles.cancelContainer}>
                        <DefaultButton>
                            <Text style={styles.cancelText}>取消</Text>
                        </DefaultButton>
                    </View>
                </View>

            </Modal>
        )
    }
}

const styles=createStyle({
    modalContainer:{
        backgroundColor:'rgba(0,0,0,0)',
        height:undefined,
        paddingHorizontal:15,
    },
    textViewContainer:{
        backgroundColor:'#fff',
        paddingHorizontal:16,
        paddingTop:60,
        paddingBottom:47,
        borderRadius:5,
    },

    codeInputContainer:{
        borderBottomColor:'#E5E5E5',
        borderBottomWidth:hairlineWidth,
        paddingHorizontal:13,
    },

    codeInput:{
        fontSize:16,
    },

    cancelContainer:{
        position:'absolute',
        top:15,
        right:15,
    },
    cancelText:{
        fontSize:18,
        color:'#999999'
    },

    subBtnContainer:{
        height:45,
        marginTop:25,
    },
});
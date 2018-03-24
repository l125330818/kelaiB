import React,{PureComponent} from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    FlatList,
    RefreshControl,
    ImageBackground
} from "react-native";

export default class ActionSheet extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            show:false
        }
    }
    render (){
        return (

            <View style={styles.container}>

            </View>
        )
    }

    showActionSheet(){

    }

    hideActionSheet(){
        this.setState({

        })
    }
}

const styles = StyleSheet.create({
    container:{
        // transparent:0,
        width:screenWidth,
        height:screenHeight,
        position:'absolute',
        left:0,
        right:0,
        bottom:0,
        top:0
    }
})

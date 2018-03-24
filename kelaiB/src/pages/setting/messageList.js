import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet
} from "react-native";

export default class Messagelist extends  React.PureComponent {
    render (){
        return (
            <View style={styles.container}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f7f7f7'
    }
})
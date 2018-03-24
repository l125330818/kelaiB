import React from "react";
import {

    View,
    Image,
    Text,
} from "react-native";

import {Header} from "../../components"

const defaultImg =require("../../images/setting/defaultPage.png");
export default class defaultPage extends React.PureComponent{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Header/>
                <View style={styles.viewContainer}>
                    <Image source={defaultImg}/>
                    <Text style={styles.defaultText}>
                        抱歉，您还没有交易明细！
                    </Text>
                </View>
            </View>
        )
    }
}

const styles=createStyle({
    container:{flex:1},
    viewContainer:{
        flex:1,
        alignItems:'center',
        paddingHorizontal:85,
        paddingTop:82/667*screenHeight,
        backgroundColor:'#fff'
    },

    defaultText:{
        marginTop:35,
        color:'#997E7A',
        textAlign:'center',
    },
});
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
import DefaultButton from '../../components/ysUI/button/defaultButton'

export default class MessageListCell extends PureComponent {
    render () {
        return <DefaultButton
            children={<View style={styles.container}>
                <View style={styles.topView}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.time}>{this.props.time}</Text>
                </View>
                <Text style={styles.content}>{this.props.content}</Text>
            </View>}
        />
    }
}

const styles = Styles.create({
    container:{
        backgroundColor:'white'
    },
    topView:{
        height:55,
        width:width,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:15,
        alignItems:'center'
    },
    title:{
        fontWeight:'500',
        fontSize:17,
        color:'#333'
    },
    time:{
        color:'#999',
        fontSize:12,
    },
    content:{
        paddingBottom:19,
        marginVertical:15,
        fontSize:14,
        color:'#999'
    }
})
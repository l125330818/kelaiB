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

import DefaultButton from '../ysUI/button/defaultButton'
const screenWidth  = Dimensions.get('window').width;

import {CachedImage} from "react-native-img-cache";

const addimage = require('../../images/pay/icon_add_image.png')
export default class HideRedPaperAddImageView extends PureComponent {

    render () {
        return <View style={styles.container}>
            <Text style={styles.tip}>藏红包的图片</Text>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContainerStyle}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {this.renderItems()}

            </ScrollView>

        </View>
    }

    renderItems(){
        let {images} = this.props;

        let dom = images.map((item,index)=>{
            return(
                <DefaultButton onPress={this.clickImage.bind(this,index)}  key={index}>
                    <CachedImage style={styles.image} source={{uri:item.url}}/>
                </DefaultButton>
            )
        });
		dom.push(
		    <DefaultButton onPress={()=>{ this.clickImage(-1)}}  key={'-1'}>
                <CachedImage style={styles.image} source={addimage}/>
             </DefaultButton>)

        return dom;
    }

    clickImage(index){
       if (index == -1){ /// 添加照片
            this.props.addImage && this.props.addImage();
       } else { /// 选择添加的图片
		   // Crop({
           //     height:300,
           //     width:300
           // },(path)=>{
			//
           // })
		   this.props.chooseImage && this.props.chooseImage(index);
       }

    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#f7f7f7'
    },
    tip:{
        color:'#999',
        fontSize:14,
        marginTop:20,
        marginLeft:15,
        marginBottom:4,
    },
    scrollContainerStyle:{
        paddingHorizontal:15,
        paddingBottom:15,
    },
    scrollView:{
        width:screenWidth
    },
    image:{
        width:85/375 * screenWidth,
        height:85/375 * screenWidth,
        marginRight:15,
        borderRadius:5
    },

})
import React from "react";
import {
    View,
    Image,
    Text,
    Platform,
    StatusBar,
	BackHandler,
}from "react-native";

import {

    DefaultButton,
}from "../../components"

const backIcon = require("../../images/components/back.png");

import {CachedImage} from "react-native-img-cache";
import Pubsub from "../../util/pubsub";

import Swiper from 'react-native-swiper';
import Modal from "react-native-modalbox";

export default class ActivityViewImage extends React.PureComponent{

    constructor(props){
        super(props);
        let {imageList,index,relativeImageList} = props.navigation.state.params;
        this.state={
            currentIndex:index+1,
            defaultIndex:index,
            list:imageList,
			showSwiper:false,
			relativeImageList
        };
        this.delete = this.delete.bind(this);
        this.onChangeIndex = this.onChangeIndex.bind(this);
        this.sureDelete = this.sureDelete.bind(this);
        this.cancelModal = this.cancelModal.bind(this);
        this.goBack = this.goBack.bind(this);
    }
    static defaultProps = {
        index:0,
    };

	componentDidMount(){
		this.timer = setTimeout(()=>{
			this.setState({
				showSwiper:true
			})
		},500);
		BackHandler.addEventListener('hardwareBackPress', this.goBack );
	}
	componentUnWillMount(){
		BackHandler.addEventListener('hardwareBackPress', this.goBack);
	}
    onChangeIndex(index){
       this.setState({
           currentIndex:index+1,
       });
    }
	delete(){
        this.modal.open();
    }
	sureDelete(){
		let {currentIndex,list,relativeImageList} = this.state;
		list.splice(currentIndex-1,1);
		relativeImageList.splice(currentIndex-1,1);
		let index = list.length === 0 ?0:currentIndex;
		this.setState({
			list:[].concat(list),
			relativeImageList:relativeImageList.concat([]),
			currentIndex:index
		});
		this.modal.close();
	}
	cancelModal(){
		this.modal.close();
	}
	goBack(){
		let {list,relativeImageList} = this.state;
		let {navigation,} = this.props;
		Pubsub.publish("updateARImageList",{imageList:list,relativeImageList});
		navigation.goBack();
	}
    render(){
        let {list,currentIndex,defaultIndex,showSwiper} = this.state;
        return(
            <View style={styles.viewImgHead}>
                <View style={styles.viewImgTitle}>
                    <StatusBar
                        // barStyle = "dark-content"
                         backgroundColor = "#191919"
                        />
                    <View style={styles.backView}>
                        <DefaultButton style={styles.flexIcon} onPress={this.goBack}>
                            <Image source={backIcon}/>
                        </DefaultButton>
                    </View>
                    <View style={styles.viewImgHead}>
                        <Text style={styles.titleText}>{`${currentIndex}/${list.length}`}</Text>
                    </View>
                    <View style={[styles.leftBtn]}>
                        <DefaultButton onPress = {this.delete}>
                            <Text style={styles.titleText}>删除</Text>
                        </DefaultButton>
                    </View>

                </View>
				<View style = {styles.content}>
					{
						showSwiper &&
						<Swiper
							showsPagination={false}
							onIndexChanged={this.onChangeIndex}
							loop={false}
							index={defaultIndex}
						>
							{
								list.map((item,index)=>{
									// console.log(index)
									return(
										<View style={styles.viewImgHead} key={index}>
											<CachedImage
												source={{uri:item.url}}
												style={styles.swiperImg}
											/>
										</View>
									)
								})
							}
						</Swiper>
					}
				</View>

                <Modal
                    position = "bottom"
                    backdropOpacity={0.3}
                    style = {[styles.modal,{height:undefined}]}
                    ref = {(c)=>{this.modal = c}}>
                    <View style = {styles.modalContent}>
                        <Text style={styles.modalContentText}>要删除这张图片吗？</Text>
                    </View>
                    <DefaultButton onPress={this.sureDelete} style = {[styles.cancelView]}>
                        <Text style={styles.modalDeleteText}>删除</Text>
                    </DefaultButton>
                    <View style = {styles.transparentView}/>
                    <DefaultButton onPress={this.cancelModal} style = {[styles.cancelView]}>
                        <Text style = {styles.modalCancelText}>取消</Text>
                    </DefaultButton>
                </Modal>
            </View>
        )
    }
}

const styles = createStyle({
    viewImgHead:{
        flex:1,
		alignItems:"center",
		justifyContent:"center"
    },
	backView:{
    	width:40,
		flexDirection:"row",
		height:40
	},
    flexIcon:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'center'
    },
    leftBtn:{

    },
    content:{
    	backgroundColor:"#000",
		flex:1,
		justifyContent:"center",
		height:screenHeight,
		width:screenWidth
	},
    viewImgTitle:{
        height:Platform.OS == 'ios' ? 64 : 44,
        paddingTop:Platform.OS == 'ios' ? 20 : 5,
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:10,
        position:"relative",
        backgroundColor:"#191919"
    },
    titleText:{
        fontSize:17,
        color:"#fff",
        textAlign:"center",
    },
    swiperImg:{
        width:screenWidth,
        height:screenWidth,
    },
	modal:{
		alignItems:"center",
		justifyContent:"center",
		width:screenWidth,
		backgroundColor:"rgba(0,0,0,.3)"
	},
	cancelView:{
		alignItems:"center",
		justifyContent:"center",
		height:50,
		backgroundColor:"#fff",
		width:screenWidth
	},
	transparentView:{
		height:6
	},
	modalDeleteText:{
		color:"#FF5940",
		fontSize:18,
	},
	modalCancelText:{
		color:"#333",
		fontSize:18
	},
	modalContent:{
		alignItems:"center",
		justifyContent:"center",
		backgroundColor:"#fff",
		width:screenWidth,
		paddingVertical:25,
		borderBottomWidth:hairlineWidth,
		borderColor:"#cbcbcb"
	},
	modalContentText:{
		color:"#999",
		fontSize:12
	}

});
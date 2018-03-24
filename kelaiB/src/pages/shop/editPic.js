/**
 * Created by luojie on 2017/11/10.
 */
import React from "react";
import {
	View,
	Text,
	ScrollView,
	Image,
} from "react-native";

import {
	CustomHeader,
	DefaultButton,
	SubmitButton
} from "../../components";
import showImagePicker from "../../components/ysUI/picker/imagePicker";
import ImagePicker from 'react-native-image-crop-picker';
import checkedIcon from "../../images/shop/edit-checked.png";

const closeIcon = require("../../images/components/black-back.png");

export default class Info extends React.PureComponent{
	constructor(props){
		super(props);
		this.renderLeft = this.renderLeft.bind(this);
		this.renderRight = this.renderRight.bind(this);
		this.close = this.close.bind(this);
		this.next = this.next.bind(this);
		this.delete = this.delete.bind(this);
		this.state = {
			defaultList:[
				{url:"",value:1},
				{url:"",value:2},
				{url:"",value:3},
				{url:"",value:4},
				{url:"",value:5},
				{url:"",value:6},
				{url:"",value:7},
				{url:"",value:8},
				{url:"",value:9},
			],
			imgList:[
				{url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511846050764&di=1fd2179004c6b28c7518a4ae0cac931e&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2Fd%2Ffile%2F201701%2F16%2F779db6efe9d4520e07e8bfb8b9e55175.jpg",id:1},
				{url:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1768077515,3255730529&fm=11&gp=0.jpg",id:2},
				{url:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2204714399,1444377312&fm=27&gp=0.jpg",id:3},
				{url:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2337557546,3853217561&fm=27&gp=0.jpg",id:4},
			],
			list:[],
		}
	}
	componentDidMount(){
		this.handleImgData();

	}
	handleImgData(){
		let {defaultList,imgList} = this.state;
		let newList = deepCopy(defaultList);
		let listIndex = 0;
		for (var i = 0;i<imgList.length;i++){
			newList[listIndex].url = imgList[i].url;
			listIndex ++;
		}
		this.setState({
			list:newList,
		})
	}
	renderLeft(){
		return(
			<DefaultButton onPress={this.close}>
				<Image source={closeIcon}/>
			</DefaultButton>
		)
	}
	renderRight(){
		return(
			<DefaultButton onPress={this.next}>
				<Text style = {styles.nextBtn}>保存</Text>
			</DefaultButton>
		)
	}
	close(){}
	next(){}
	checkImg(index){
		let {list} = this.state;
		let newList = deepCopy(list);
		newList[index].checked =  !newList[index].checked;
		this.setState({
			list:newList,
		})
	}
	delete(){
		let {list,imgList} = this.state;
		let newArr = deepCopy(imgList);
		for(let i=list.length-1;i>=0;i--){
			if(list[i].checked){
				newArr.splice(i,1)
			}
		}
		this.setState({
			imgList:newArr
		},()=>{
			this.handleImgData();
		})
	}
	selectPhoto(){
		// showImagePicker((response)=>{
		// 	if(!response.uri){
		// 		return;
		// 	}
		// 	let {imgList} = this.state;
		// 	let newArr = deepCopy(imgList);
		// 	newArr.push({
		// 		url:response.uri
		// 	});
		// 	this.setState({
		// 		imgList:newArr
		// 	},()=>{
		// 		this.handleImgData();
		// 	})
		// })
		ImagePicker.openPicker({
			width: 300,
			height: 400,
			cropping: true,
			cropperCircleOverlay:true
		}).then(image => {
			if(!image){
				return;
			}
			let {imgList} = this.state;
			let newArr = deepCopy(imgList);
			newArr.push({
				url:image
			});
			this.setState({
				imgList:newArr
			},()=>{
				this.handleImgData();
			})
			console.log(' 图片路径：'+ image);
		});
	}
	renderImg(){
		let {list} = this.state;
		let dom = list.map((item,index)=>{
			if(index === 0 ){
				return(
					item.url?
						<DefaultButton
							onPress = {this.checkImg.bind(this,index)}
							key = {index}
							style = {[styles.firstImgWrapper]}>
							<Image style={[styles.firstImg,item.checked && styles.activeBorder]} source={{uri:item.url}}/>
							{
								item.checked &&
								<Image style = {styles.checkedImg} source={checkedIcon}/>
							}
						</DefaultButton>
						:
						<DefaultButton onPress = {this.selectPhoto.bind(this)}  key = {index}  style = {styles.firstImgWrapper}>
							<View style = {styles.firstView}>
								<Text style={styles.firstText}>{1}</Text>
							</View>
						</DefaultButton>
				)
			}else{
				return(
					item.url?
						<DefaultButton
							key = {index}
							onPress = {this.checkImg.bind(this,index)}
							style = {[styles.imgButtonWrapper,index %2 == 1 && styles.mr10]}>
							<Image
								source={{uri:item.url}}
								resizeMode={"cover"}
								style = {[styles.rowImg,item.checked && styles.activeBorder]}/>
							{
								item.checked &&
								<Image style = {styles.checkedImg} source={checkedIcon}/>
							}

						</DefaultButton>
						:
						<DefaultButton  onPress = {this.selectPhoto.bind(this)}  key = {index}  style = {[styles.imgButtonWrapper,index %2 == 1 && styles.mr10 ]}>
							<Text style={styles.firstText}>{index+1}</Text>
						</DefaultButton>
				)
			}
		});
		return dom;
	}
	render(){

		let {permitValidity,defaultList} = this.state;
		return(
			<View style = {styles.wrapper}>
				<CustomHeader
					renderLeft = {this.renderLeft}
					renderRight = {this.renderRight}
					title="编辑图片"/>
				<ScrollView style = {{flex:1}}>
					<View style = {styles.content}>
						<View style = {styles.imgRowWrapper}>
							{
								this.renderImg()
							}
						</View>
					</View>
				</ScrollView>
				<View style = {styles.bottomRow}>
					<SubmitButton onPress={this.delete}>删除</SubmitButton>
				</View>
			</View>

		)
	}
}

const styles = createStyle({
	wrapper:{
		flex:1,
		backgroundColor:"#fff",
	},
	bottomRow:{
		position:"absolute",
		bottom:0,
		backgroundColor:"#fff",
		height:60,
		flexDirection:"row",
		paddingVertical:10,
		paddingHorizontal:15,
		flex:1,
		width:screenWidth
	},
	nextBtn:{
		color:"#FF5940",
		fontSize:16,
	},
	content:{
		paddingHorizontal:15,
		paddingBottom:60
	},
	firstImgWrapper:{
		flexDirection:"row",
		width:screenWidth-30,
		position:"relative"
	},
	firstImg:{
		flex:1,
		height:162/667 * screenHeight,
	},
	imgRowWrapper:{
		flexDirection:"row",
		marginTop:10,
		flexWrap:"wrap"
	},
	rowImg:{
		flex:1,
		height:79/667 * screenHeight,
	},
	imgButtonWrapper:{
		flexDirection:"row",
		marginTop:10,
		width:(screenWidth-40)/2,
		alignItems:"center",
		justifyContent:"center",
		backgroundColor:"#e5e5e5",
		height:79/667 * screenHeight,
		position:"relative",
		overflow:"hidden"
	},
	activeBorder:{
		borderWidth:2,
		borderColor:"#FF5940"
	},
	firstView:{
		flex:1,
		height:162/667 * screenHeight,
		backgroundColor:"#e5e5e5",
		justifyContent:"center",
		alignItems:"center"
	},
	firstText:{
		fontSize:75,
		color:"#CECECE"
	},
	mr10:{
		marginRight:10
	},
	checkedImg:{
		position:"absolute",
		top:5,
		right:5,
		height:16,
		width:16
	}
});
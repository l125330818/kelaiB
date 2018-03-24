/**
 * Created by luojie on 2017/11/10.
 */
import React from "react";
import {
	View,
	Text,
	Image,
	ScrollView,
} from "react-native";

import {DefaultButton} from "../index";
import Api from "../../config/Api";
import Util from "../../util/util";
import GlobalData from "../../util/globalData";
import * as Storage from "../../util/storage";
import {CachedImage} from "react-native-img-cache";


const moreArrow = require("../../images/components/more-arrow.png");
const defaultShopLogo = require("../../images/components/logo.png");

export default class List extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			list:[]
		}
	}
	onPress(shopId){
		let {type,navigation} = this.props;
		GlobalData.userInfo.shopId = shopId;
		Storage.setItem("shopId",shopId+"");
		switch (type){
			case 1:
				navigation.navigate("shopApplyBaseInfo",{shopId});
				break;
			case 2:
				navigation.navigate("index",{shopId});
				break;
		}
	}
	componentDidMount(){
		let {type} = this.props;
		ajax({
			url:Api.getApplyShop,
			method:"post",
			body:{
				type,
				pageIndex:1,
				pageNo:100,
			},
		}).then((result)=>{
			if(result.status == 1){
				this.setState({
					list:result.data.items
				})

			}else{
				this.props.modal.toast({
					content:result.message
				})
			}
		})
	}
	render(){
		let {list} = this.state;
		return(
			<ScrollView style = {styles.wrapper}>
				{
					list.length>0 && list.map((item,index)=>{
						return(
							<DefaultButton
								key = {index}
								style = {styles.row}
								onPress = {this.onPress.bind(this,item.shopId)}>
								<View style = {styles.leftRow}>
									<CachedImage source={item.logo?{uri:item.logo}:defaultShopLogo}
										   style={[styles.img]}/>
									<View style = {styles.infoRow}>
										<Text style={styles.shopName}>{item.name}</Text>
										<Text style = {styles.className}>{item.category}</Text>
										<Text style={styles.date}>{Util.getTimeStr(item.createTime)}</Text>
									</View>
								</View>
								<View>
									<Image source={moreArrow}/>
								</View>
							</DefaultButton>
						)
					})
				}
			</ScrollView>
		)
	}
}

const styles = createStyle({
	wrapper:{
		marginBottom:70
	},
	img:{
		height:77,
		width:98,
		borderRadius:5,
		marginRight:15
	},
	row:{
		marginTop:10,
		padding:15,
		flexDirection:'row',
		justifyContent:"space-between",
		alignItems:"center",
		backgroundColor:"#fff"
	},
	leftRow:{
		flex:1,
		flexDirection:'row',
	},
	infoRow:{
		justifyContent:"center"
	},
	shopName:{
		fontSize:21,
		fontWeight:"bold",
	},
	className:{
		fontSize:12,
		color:"#999",
		marginVertical:11
	},
	date:{
		fontSize:12,
		color:"#999"
	}

});
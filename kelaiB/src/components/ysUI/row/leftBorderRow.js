/**
 * Created by luojie on 2017/10/13.
 */

import React from "react";
import {
	View,
	Text,
	Image,
} from "react-native";
import DefaultButton from "../button/defaultButton";
const moreIcon = require("../../../images/components/more.png");

export default class Row extends React.PureComponent{
	constructor(props){
		super(props);
		this.onPress = this.onPress.bind(this);
	}
	static defaultProps = {
		title:"",
		more:false, //是否显示更多按钮
	}
	onPress(){
		let {onPress} = this.props;
		onPress && onPress();
	}
	render(){
		let {title,more,rightText} = this.props;
		return(
			<View style = {styles.wrapper}>
				<DefaultButton onPress={this.onPress} style = {styles.inShopTitle}>
					<View style = {styles.shopWrapper}>
						<Text style = {styles.color999}>{title}</Text>
					</View>
					<View style = {styles.moreRow}>
						{
							rightText &&
							<Text style = {styles.color999}>待填写</Text>
						}
						{
							more && <Image style={styles.more} source={moreIcon}/>
						}
					</View>
				</DefaultButton>
			</View>
		)
	}
}

const styles = createStyle({
	inShopTitle:{
		paddingVertical:13,
		flexDirection:"row",
		justifyContent:"space-between",
		alignItems:"center"
	},
	shopWrapper:{
		borderLeftWidth:2,
		borderColor:"#FD6141",
		paddingLeft:10
	},
	color999:{
		color:"#999"
	},
	wrapper:{
		paddingHorizontal:15
	},
	more:{
		height:11,
		width:7,
		marginLeft:10
	},
	moreRow:{
		flexDirection:"row",
		alignItems:"center",
	}
})
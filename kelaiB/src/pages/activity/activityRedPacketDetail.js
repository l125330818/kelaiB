/**
 * Created by luojie on 2017/11/28.
 */
import React from "react";
import {
	View,
	Text,
	Image,
	SectionList
} from "react-native";

import {
	Header,
} from "../../components";

const redPacketIcon = require("../../images/activity/red-packet-detail-icon.png");
const receiptIcon = require("../../images/activity/receipt-detail-icon.png");

export default class Demo extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			sections:[
				{date:"2017年9月",
					data:[
						{type:1,value:10.33,date:"11月28日 15:44"},
						{type:1,value:10.33,date:"11月28日 15:44"},
						{type:1,value:10.33,date:"11月28日 15:44"},
						{type:1,value:10.33,date:"11月28日 15:44"},
						{type:1,value:10.33,date:"11月28日 15:44"},
						{type:1,value:10.33,date:"11月28日 15:44"},
						{type:1,value:10.33,date:"11月28日 15:44"},
				]},
				{date:"2017年10月",data:[
					{type:2,value:10.33,date:"11月28日 15:44"},
					{type:2,value:10.33,date:"11月28日 15:44"},
					{type:2,value:10.33,date:"11月28日 15:44"},
					{type:2,value:10.33,date:"11月28日 15:44"},
					{type:2,value:10.33,date:"11月28日 15:44"},
					{type:2,value:10.33,date:"11月28日 15:44"},
					{type:2,value:10.33,date:"11月28日 15:44"},
				]},
			]
		}
		this.renderSectionHeader = this.renderSectionHeader.bind(this);
		this.renderItem = this.renderItem.bind(this);
	}
	renderSectionHeader(headerData){
		let {date} = headerData.section;
		return(
			<View style = {styles.titleWrapper}>
				<View style = {styles.leftLine}/>
				<Text style = {styles.titleText}>{date}</Text>
			</View>
		)
	}
	renderItem(rowData){
		let {type,value,date} = rowData.item;
		return(
			<View style = {styles.itemRowWrapper}>
				<View style = {styles.itemRow}>
					<View>
						<View style = {styles.imgWrapper}>
							<Image style = {styles.img} source={type==1?receiptIcon:redPacketIcon}/>
							<Text style = {styles.typeText}>{type==1?"小票返现":"藏红包"}</Text>
						</View>
						<Text style = {styles.dateText}>{date}</Text>
					</View>

					<Text style = {styles.accountText}>{value}</Text>
				</View>
			</View>
		)
	}
	render() {
		let {sections} = this.state;
		return (
			<View style = {styles.wrapper}>
				<Header title = {"明细"}/>
				<View style = {{flex:1}}>
					<SectionList
						renderItem = {this.renderItem}
						sections = {sections}
						renderSectionHeader = {this.renderSectionHeader}/>
					<View style = {styles.itemRowWrapper}>
						<View style = {styles.itemRow}>
							<View>
								<View style = {styles.imgWrapper}>
									<Image style = {styles.img} source={redPacketIcon}/>
									<Text style = {styles.typeText}>藏红包</Text>
								</View>
								<Text style = {styles.dateText}>11-28 15:31:06</Text>
							</View>
							<View>
								<Text style = {styles.returnAccount}>+23.23</Text>
								<Text style = {styles.returnText}>剩余返还</Text>
							</View>
						</View>
					</View>

				</View>
			</View>
		)
	}
}

const styles = createStyle({
	wrapper:{
		flex:1,
		backgroundColor:"#f4f4f4"
	},
	titleWrapper:{
		height:41,
		paddingHorizontal:15,
		flexDirection:"row",
		alignItems:"center",
		backgroundColor:"#f4f4f4"
	},
	leftLine:{
		height:14,
		borderLeftWidth:2,
		borderColor:"#FD6141",
		marginRight:10
	},
	titleText:{
		color:"#999",
		fontSize:15,
	},
	itemRowWrapper:{
		backgroundColor:"#fff",
		paddingLeft:15,
	},
	itemRow:{
		height:70/667 * screenHeight,
		flexDirection:"row",
		justifyContent:"space-between",
		paddingRight:15,
		borderBottomWidth:hairlineWidth,
		borderColor:"#ECECEC",
		alignItems:"center",
	},
	imgWrapper:{
		flexDirection:"row",
		alignItems:"center"
	},
	img:{
		height:23,
		width:23,
		marginRight:10
	},
	typeText:{
		fontSize:16,
		color:"#333"
	},
	dateText:{
		color:"#999",
		marginLeft:33,
		fontSize:12,
	},
	accountText:{
		color:"#333",
		fontSize:19
	},
	returnAccount:{
		fontSize:19,
		color:"#FD6141"
	},
	returnText:{
		fontSize:12,
		color:"#999",
		textAlign:"right"
	}
})
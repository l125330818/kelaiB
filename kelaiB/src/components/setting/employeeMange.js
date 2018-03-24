/**
 * Created by luojie on 2017/12/18.
 */
import React from "react";
import {
	View,
	Text,
	Image
} from "react-native";

import {
	YFlatList
} from "../../components";

const userLogo = require("../../images/demo/logo.jpeg");

export default class Demo extends React.PureComponent {
	constructor(props) {
		super(props);
		this.renderItem = this.renderItem.bind(this);
		this.state = {
			list:[
				{key:"1",name:"张二狗张二狗张二狗",time:"2017-01-01",dayNum:"30493"},
				{key:"2",name:"王小二",time:"2017-01-02",dayNum:"341"},
			]
		}
	}
	renderItem(data){
		let {item} = data;
		return (
			<View style = {styles.employeeRow}>
				<View style = {styles.row}>
					<View style = {styles.employeeCell1}>
						<Image source = {userLogo}style = {styles.rowImg}/>
						<Text numberOfLines={1} style = {styles.employeeName}>{item.name}</Text>
					</View>
					<View style = {styles.employeeCell2}>
						<Text style = {styles.color999}>{item.time}</Text>
					</View>
					<View style = {styles.employeeCell2}>
						<Text style = {styles.color999}>{item.dayNum}天</Text>

					</View>
				</View>
			</View>
		)
	}
	render() {
		let {list} = this.state;
		return (
			<View style = {styles.wrapper}>
				<View style = {styles.title}>
					<View style = {styles.cell1}/>
					<View style = {styles.cell2}>
						<Text style={styles.color999}>加入日期</Text>
					</View>
					<View style = {styles.cell2}>
						<Text style={styles.color999}>在职天数</Text>
					</View>
				</View>
				<YFlatList
					data = {list}
					renderItem = {this.renderItem}/>
			</View>
		)
	}
}

const styles = createStyle({
	wrapper:{
		flex:1,
		backgroundColor:"#f4f4f4",
	},
	color999:{
		color:"#999"
	},
	title:{
		height:31,
		flexDirection:"row",
		alignItems:"center",
		paddingLeft:15
	},
	cell1:{
		flex:2
	},
	cell2:{
		flex:1,
	},
	employeeRow:{
		paddingLeft:15,
		backgroundColor:"#fff"
	},
	row:{
		paddingVertical:14,
		borderBottomWidth:hairlineWidth,
		borderColor:"#ececec",
		flexDirection:"row",
		alignItems:"center"
	},
	employeeCell1:{
		flex:2,
		flexDirection:"row",
		alignItems:"center"

	},
	employeeCell2:{
		flex:1,
	},
	rowImg:{
		height:40,
		width:40,
		borderRadius:20,
		marginRight:10,
	},
	employeeName:{
		color:"#333",
		fontSize:16,
		flex:1
	},
});
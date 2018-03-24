/**
 * Created by luojie on 2017/12/18.
 * 员工考勤
 */
import React from "react";
import {
	View,
	Text,
	Image,
} from "react-native";
import {
	DefaultButton
} from "../";

import Calendar from "react-native-calendar";
import showPicker from "../../components/ysUI/picker/picker";

const dateIcon = require("../../images/portal/history-icon.png");
const userLogo = require("../../images/demo/logo.jpeg");


export default class Salary extends React.PureComponent {
	constructor(props) {
		super(props);
		this.dayHeadings = ["日","一","二","三","四","五","六",];
		this.onSwipeNext = this.onSwipeNext.bind(this);
		this.selectDate = this.selectDate.bind(this);
		let year = new Date().getFullYear();
		let month = new Date().getMonth()+1;
		month = month<10?"0"+month:month;
		this.state = {
			currentDate:`${year}年${month}月`,
			currentSelectDate:[2,1],
			startDate:`${year}-${month}-01`
		}
	}
	onSwipeNext(e){
		let year = e.year(),month = e.month()+1;
		this.setState({
			currentDate:`${year}年${month<10?"0"+month:month}月`,
			startDate:`${year}-${month<10?"0"+month:month}-01`,
		})
	}
	getSelectData(){
		let arr1 = [],arr2 = [],len1 = 10,len2 = 12;
		for(let i = 2017;i< 2017+len1;i++){
			arr1.push(i);
		}
		for(let i = 1; i<=len2;i++){
			let num = i < 10? "0"+i : i;
			arr2.push(num);
		}
		return [arr1,arr2];
	}
	selectDate(){
		let {currentSelectDate} = this.state;
		showPicker(this.getSelectData(),currentSelectDate,(r)=>{
			let year = r[0],month = r[1];
			this.setState({
				currentDate:`${year}年${month}月`,
				currentSelectDate:r,
				startDate:`${year}-${month}-01`
			})
		})

	}
	render() {
		let {currentDate,startDate} = this.state;
		return (
			<View style = {styles.wrapper}>
				<View style = {styles.salaryCalendarSection}>
					<Text style = {styles.color666}>{currentDate}</Text>
					<DefaultButton onPress = {this.selectDate}>
						<Image source={dateIcon}/>
					</DefaultButton>
				</View>
				<Calendar
					customStyle={customStyle}
					weekStart = {0}
					scrollEnabled = {true}
					currentMonth = {startDate}
					dayHeadings = {this.dayHeadings}
					onSwipeNext = {this.onSwipeNext}
					onSwipePrev = {this.onSwipeNext}
					style = {styles.calendarContainer}/>
				<View style = {styles.employeeListWrapper}>
					<View style = {styles.employeeRow}>
						<View style = {styles.row}>
							<View style = {styles.employeeCell1}>
								<Image source = {userLogo}style = {styles.rowImg}/>
								<Text numberOfLines={1} style = {styles.employeeName}>张哥张哥张哥张哥张哥</Text>
							</View>
							<Text style={styles.color999}>3个小时</Text>
							<View style = {styles.employeeCell2}>
								<View style = {styles.cellLine}>
									<Text>{"09:30"}</Text>
								</View>
								<View>
									<Text>{"12:30"}</Text>
								</View>

							</View>
						</View>
					</View>
					<View style = {styles.employeeRow}>
						<View style = {styles.row}>
							<View style = {styles.employeeCell1}>
								<Image source = {userLogo}style = {styles.rowImg}/>
								<Text numberOfLines={1} style = {styles.employeeName}>张哥张哥张哥张哥张哥</Text>
							</View>
							<Text style={styles.color999}>3个小时</Text>
							<View style = {styles.employeeCell2}>
								<View style = {styles.cellLine}>
									<Text style={styles.color333}>{"09:30"}</Text>
								</View>
								<View>
									<Text style={styles.color333}>{"12:30"}</Text>
								</View>

							</View>
						</View>
					</View>
				</View>
			</View>
		)
	}
}

const customStyle = {
	weekendDayButton:{
		backgroundColor:"#fff"
	},
	calendarContainer:{
		backgroundColor:"#fff"
	},
	calendarHeading:{
		borderTopWidth:0,
		borderBottomWidth:0
	},
	dayButton:{
		borderTopWidth:0
	},
	dayHeading:{
		color:"#FF5940",
		fontSize:12
	},
	weekendHeading:{
		color:"#999",
		fontSize:12
	},
	selectedDayCircle:{
		backgroundColor:"#FF5940"
	},
	selectedDayText:{
		fontWeight:"normal"
	}
}
const styles = createStyle({
	wrapper:{
		flex:1
	},
	color333:{
		color:"#333"
	},
	color666:{
		color:"#666"
	},
	color999:{
		color:"#999"
	},
	salaryCalendarSection:{
		height:40,
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"space-between",
		paddingHorizontal:15,
	},
	calendarContainer:{
		backgroundColor:"#fff"
	},
	employeeListWrapper:{
		backgroundColor:"#fff",
		marginTop:10,
	},
	employeeRow:{
		paddingLeft:15,
	},
	row:{
		paddingVertical:14,
		paddingRight:15,
		borderBottomWidth:hairlineWidth,
		borderColor:"#ececec",
		flexDirection:"row",
		alignItems:"center"
	},
	employeeCell1:{
		flex:1,
		flexDirection:"row",
		alignItems:"center"

	},
	employeeCell2:{
		flex:1,
		alignItems:"flex-end"
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
	cellLine:{
		borderBottomWidth:hairlineWidth,
		borderColor:"#e5e5e5",
		paddingBottom:3,
		marginBottom:3
	}

});
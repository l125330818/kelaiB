/**
 * Created by luojie on 2017/12/18.
 */
import React from "react";
import {
	View,
	Text
} from "react-native";
import {
	Header,
	ScrollableTabView
} from "../../components";
import EmployeeSalary from "../../components/setting/employeeSalary";
import EmployeeMange from "../../components/setting/employeeMange";
import InviteDialog from "../../components/portal/customerDialog";

export default class Demo extends React.PureComponent {
	constructor(props) {
		super(props);
	}
	componentDidMount(){
		this.modal.open();
	}
	render() {
		return (
			<View style = {styles.wrapper}>
				<Header {...this.props} title={"员工"}/>
				<ScrollableTabView >
					<View style = {{flex:1}} tabLabel = "考勤">
						<EmployeeSalary/>
					</View>
					<View style = {{flex:1}} tabLabel = "管理">
						<EmployeeMange/>
					</View>
				</ScrollableTabView>
				<InviteDialog ref = {(r)=>{this.modal = r}}/>
			</View>
		)
	}
}

const styles = createStyle({
	wrapper:{
		flex:1,
		backgroundColor:"#f4f4f4"
	}
});
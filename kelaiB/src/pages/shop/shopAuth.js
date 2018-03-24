/**
 * Created by luojie on 2017/11/11.
 */
import React from "react";
import {
	View,
	Text,
	ScrollView
} from "react-native";

import {
	Header,
	LeftBorderRow,
	DefaultButton,
	SubmitButton
} from "../../components";
import GlobalData from "../../util/globalData";

export default class Demo extends React.PureComponent {
	constructor(props) {
		super(props);
	}
	componentDidMount(){
		// let {shopId} = this.props.state.param;
	}
	fill(type){
		let {shopId} = GlobalData.userInfo;
		console.log(shopId,"auth")
		let {navigation} = this.props;
		switch (type){
			case 1:
				navigation.navigate("fillBusinessLicense",{shopId});
				break;
			case 2:
				navigation.navigate("fillLegalPerson",{shopId});
				break;
			case 3:
				navigation.navigate("fillOtherLicence",{shopId});
				break;
		}

	}
	render() {
		return (
			<View style = {styles.wrapper}>
				<Header {...this.props} title = "商户认证"/>
				<ScrollView style = {{flex:1}}>
					<DefaultButton onPress = {this.fill.bind(this,1)} style = {styles.row}>
						<LeftBorderRow onPress = {this.fill.bind(this,1)} more = {true} rightText = "待填写" title = "营业执照"/>
						<View style = {styles.tipsOutWrapper}>
							<View style = {styles.tipsInnerWrapper}>
								<Text style = {styles.color999}>无营业执照商家需上传特许证件</Text>
							</View>
						</View>
					</DefaultButton>
					<DefaultButton onPress = {this.fill.bind(this,2)} style = {styles.row}>
						<LeftBorderRow onPress = {this.fill.bind(this,2)} more = {true} rightText = "待填写" title = "法人代表身份证照"/>
						<View style = {styles.tipsOutWrapper}>
							<View style = {styles.tipsInnerWrapper}>
								<Text style = {styles.color999}>需上传法人代表或特许证件申请人身份证，身份</Text>
								<Text style = {[styles.color999,styles.mt7]}>证可用其它有效证件代替</Text>
							</View>
						</View>
					</DefaultButton>
					<DefaultButton onPress = {this.fill.bind(this,3)} style = {styles.row}>
						<LeftBorderRow onPress = {this.fill.bind(this,3)} more = {true} rightText = "待填写" title = "其他许可证"/>
						<View style = {styles.tipsOutWrapper}>
							<View style = {styles.tipsInnerWrapper}>
								<Text style = {styles.color999}>可用有效特许证件代替许可证</Text>
							</View>
						</View>
					</DefaultButton>

				</ScrollView>
				<View style = {styles.bottomRow}>
					<Text style = {styles.submitTips}>填写前，请准备好法人身份证、营业执照、及相应许可证。</Text>
					<View style = {styles.submitBtn}>
						<SubmitButton>提交</SubmitButton>
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
	row:{
		marginTop:10,
		backgroundColor:"#fff"
	},
	tipsOutWrapper:{
		padding:15,
	},
	tipsInnerWrapper:{
		backgroundColor:"#f4f4f4",
		borderRadius:3,
		paddingVertical:14,
		paddingLeft:10
	},
	color999:{
		color:"#999"
	},
	mt7:{
		marginTop:5
	},
	bottomRow:{
		position:"absolute",
		bottom:0,
		backgroundColor:"#f4f4f4",
		// flexDirection:"row",
		paddingVertical:10,
		paddingHorizontal:15,
		flex:1,
		width:screenWidth
	},
	submitTips:{
		fontSize:12,
		color:"#999",
		marginBottom:9
	},
	submitBtn:{
		height:44,
		flex:1
	}
})
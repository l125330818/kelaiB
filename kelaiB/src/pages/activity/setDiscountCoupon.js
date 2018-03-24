/**
 * Created by luojie on 2017/11/29.
 */
import React from "react";
import {
	View,
	ImageBackground,
	Text,
	Image
} from "react-native";
import {
	SubmitButton,
	Header,

} from "../../components";

import RowInput from "../../components/shop/rowInput";
import RowSelect from "../../components/shop/rowSelect";
const shadowImg2 = require("../../images/activity/discount-shadow.png");
const discountCode = require("../../images/activity/discount-code.png");
const logo = require("../../images/demo/logo.jpeg");

export default class Demo extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			param:{
				discountMoney:0,
				discountMoneyCondition:0,
				validity:30
			},
			validity:"30天"
		}
	}
	onChangeText(type,value){
		let {param} = this.state;
		let newParam = deepCopy(param);
		newParam[type] = value;
		this.setState({
			param:newParam
		})

	}
	render() {
		let {validity,param} = this.state;
		let {discountMoney,discountMoneyCondition} = param;
		let {col} = this.props;
		let len = Math.ceil(126/667 * screenHeight/6);
		let arr = Array.from({length:len},()=>"");
		return (
			<View style = {styles.wrapper}>
				<Header title={"优惠券"}/>
				<View style = {styles.content}>
					<RowInput
						leftText = "优惠金额"
						placeholder = "0"
						maxLength = {4}
						rightText = "元"
						onChangeText = {this.onChangeText.bind(this,"discountMoney")}/>
					<RowInput
						leftText = "优惠条件(满)"
						placeholder = "优惠条件（如：200）"
						rightText = "元"
						onChangeText = {this.onChangeText.bind(this,"discountMoneyCondition")}/>
					<RowSelect
						leftText = "设置有效期"
						onPress = {this.select}
						rightText = {validity}/>
					<View style = {styles.itemWrapper}>
						<ImageBackground
							source = {shadowImg2}
							resizeMode = "stretch"
							style = {styles.shadowImg}>
							<View style = {styles.leftRow}>
								<View style = {styles.shopCell}>
									<Image style = {styles.logoImg} source={logo}/>
									<View>
										<Text style = {styles.shopNameText}>客多客</Text>
										<Text style={styles.validityText}>有效期：{"2017.10.10-2017.10.20"}</Text>
									</View>

								</View>
								<View style = {styles.codeImgWrapper}>
									<Image  source={discountCode}/>
								</View>
								<View style = {styles.codeWrapper}>
									<Text style = {styles.codeText}>券码</Text>
									<Text style = {styles.codeValueText}>KL00 0000 0000</Text>
								</View>
							</View>
							<View removeClippedSubviews = {true} style={[styles.dashLine]}>
								{
									arr.map((item, index) => {
										return <Text style={[styles.dashColItem]} key={'dash' + index}/>
									})
								}
							</View>
							<View style = {styles.rightRow}>
								<View style = {styles.flexRow}>
									<Text style = {styles.tag}>￥</Text>
									<Text style = {styles.discountMoneyText}>{discountMoney}</Text>
								</View>
								{
									discountMoneyCondition>0?
										<View style = {[styles.flexRow,styles.flexEnd]}>
											<Text style = {styles.colorWhite}>满{discountMoneyCondition}使用</Text>
										</View>
										:
										<View style = {[styles.flexRow,styles.flexEnd]}>
											<Text style = {styles.colorWhite}>满</Text>
											<View style = {styles.line}/>
											<Text style = {styles.colorWhite}>使用</Text>
										</View>
								}
							</View>
						</ImageBackground>
					</View>
				</View>
				<View style = {styles.bottomRow}>
					<SubmitButton>提交</SubmitButton>
				</View>
			</View>
		)
	}
}

const styles  = createStyle({
	wrapper:{
		flex:1,
		backgroundColor:"#f4f4f4",

	},
	content:{
		flex:1,
		marginTop:10,
	},
	itemWrapper:{
		paddingHorizontal:15
	},
	shadowImg:{
		height:126/667 * screenHeight,
		flexDirection:"row",
		marginTop:10,
		padding:3,

	},
	leftRow:{
		flex:1,
		backgroundColor:"#fff",
		borderBottomLeftRadius:5,
		borderTopLeftRadius:5,
		paddingLeft:15,
		paddingTop:15,
		paddingBottom:12,
	},
	rightRow:{
		width:130/375 * screenWidth,
		backgroundColor:"#ff5940",
		borderBottomRightRadius:5,
		borderTopRightRadius:5,
		borderWidth:0,
		alignItems:"center",
		justifyContent:"center"
	},
	dashLine: {
		overflow:"hidden"
	},
	dashColItem:{
		height: 4,
		width: 1,
		marginBottom: 2,
		backgroundColor: '#ccc',
	},
	bottomRow:{
		padding:15,
	},
	shopCell:{
		flexDirection:"row"
	},
	logoImg:{
		height:30,
		width:30,
		borderRadius:15,
		marginRight:10,
	},
	shopNameText:{
		fontSize:16,
		color:"#333"
	},
	validityText:{
		fontSize:10,
		color:"#999",
		marginTop:2
	},
	codeImgWrapper:{
		marginTop:15,
		marginBottom:10,
		alignItems:"center"
	},
	codeWrapper:{
		flexDirection:"row",
		justifyContent:"center",
		alignItems:"center"

	},
	codeText:{
		fontSize:12,
		color:"#666",
		marginRight:10
	},
	codeValueText:{
		fontSize:16,
		color:"#666"
	},
	flexRow:{
		flexDirection:"row",
		alignItems:"center"
	},
	tag:{
		fontSize:25,
		color:"#fff",
		marginTop:10

	},
	discountMoneyText:{
		fontSize:39,
		color:"#fff",
	},
	colorWhite:{
		color:"#fff",
		alignItems:"flex-end"
	},
	line:{
		width:20,
		borderBottomWidth:1,
		borderColor:"#fff",

	},
	flexEnd:{
		alignItems:"flex-end",
		justifyContent:"center"
	}
})
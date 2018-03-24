/**
 * Created by luojie on 2017/12/19.
 */
import React from "react";
import {
	View,
	Text,
} from "react-native";

import {
	Header,
	DefaultButton,
	BaseInput,
	SubmitButton
} from "../../components";

export default class Feedback extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex:1,
			title:"发现bug啦",
			placeholder:"请描述具体操作步骤及问题"
		}
	}
	buttonFn(activeIndex){
		let title = "",placeholder = "";
		switch (activeIndex){
			case 1:
				title = "发现bug啦";
				placeholder = "请描述具体操作步骤及问题";
				break;
			case 2:
				title = "提点建议";
				placeholder = "感谢您提出宝贵建议，你的建议让我们越做越好！";
				break;
			case 3:
				title = "随意吐槽";
				placeholder = "主人请随意吐槽！";
				break;
		}
		this.setState({
			activeIndex,
			title,
			placeholder
		});
	}
	submit(){

	}
	render() {
		let {activeIndex,title,placeholder} = this.state;
		return (
			<View style = {styles.wrapper}>
				<Header {...this.props} title = "反馈中心"/>
				<View style = {styles.classWrapper}>
					<View style = {styles.classTitle}>
						<Text style = {styles.classText}>反馈类别</Text>
					</View>
					<View style = {styles.classBtnWrapper}>
						<DefaultButton
							onPress = {this.buttonFn.bind(this,1)}
							style = {[styles.btn,activeIndex === 1 && styles.active]}>
							<Text style = {[styles.btnText,activeIndex === 1 && styles.activeText]}>bug</Text>
						</DefaultButton>
						<View style = {styles.fillWidth}/>
						<DefaultButton
							onPress = {this.buttonFn.bind(this,2)}
							style = {[styles.btn,activeIndex === 2 && styles.active]}>
							<Text style = {[styles.btnText,activeIndex === 2 && styles.activeText]}>产品建议</Text>
						</DefaultButton>
						<View style = {styles.fillWidth}/>
						<DefaultButton
							onPress = {this.buttonFn.bind(this,3)}
							style = {[styles.btn,activeIndex === 3 && styles.active]}>
							<Text style = {[styles.btnText,activeIndex === 3 && styles.activeText]}>吐槽一下</Text>
						</DefaultButton>
					</View>
				</View>
				<View style = {styles.classWrapper}>
					<View style = {styles.classTitle}>
						<Text style = {styles.classText}>{title}</Text>
					</View>
					<View style = {styles.contentWrapper}>
						<View style = {styles.inputWrapper}>
							<BaseInput
								multiline = {true}
								placeholder = {placeholder}
								style = {styles.input}/>
						</View>
					</View>
				</View>
				<View style = {styles.bottomRow}>
					<SubmitButton onPress = {this.submit}>提交</SubmitButton>
				</View>
			</View>
		)
	}
}

const styles = createStyle({
	wrapper:{
		flex:1,
		backgroundColor:"#f4f4f4",

	},
	classWrapper:{
		backgroundColor:"#fff",
		paddingLeft:15,
		marginTop:10
	},
	classTitle:{
		height:45,
		paddingBottom:8,
		justifyContent:"flex-end",
		borderBottomWidth:hairlineWidth,
		borderColor:"#e6e6e6"
	},
	classText:{
		color:"#333",
		fontSize:16,
	},
	classBtnWrapper:{
		paddingVertical:25,
		flexDirection:"row",
		paddingRight:15,
	},
	btn:{
		height:35,
		flex:1,
		backgroundColor:"#f0f0f0",
		borderRadius:3,
		alignItems:"center",
		justifyContent:"center"
	},
	active:{
		backgroundColor:"#FF5940",
	},
	activeText:{
		color:"#fff"
	},
	btnText:{
		color:"#666"
	},
	fillWidth:{
		width:5
	},
	contentWrapper:{
		paddingTop:8,
		paddingRight:15
	},
	inputWrapper:{
		backgroundColor:"#f0f0f0",
		height:100,
		borderRadius:5,
		paddingVertical:10
	},
	input:{
		paddingHorizontal:15,
		flex:1,
		paddingTop:0,
		fontSize:14,
		textAlignVertical:"top"
	},
	bottomRow:{
		backgroundColor:"#fff",
		flexDirection:"row",
		paddingVertical:30,
		paddingHorizontal:15,
		width:screenWidth
	}

});
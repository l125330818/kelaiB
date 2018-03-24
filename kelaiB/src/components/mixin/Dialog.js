/**
 * Created by luojie on 2017/9/12.
 */
import React,{PureComponent} from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
}from "react-native";
import Modal from "react-native-modalbox";
import Toast from "../ysUI/dialog/toast";
import Loading from "../ysUI/dialog/loading";
import {DefaultButton} from "../index";
import Pubsub from "../../util/pubsub";

/**
 *  toast使用：
 *  this.props.modal.toast({
 *  	content:"toast内容",  //支持string 和 dom节点
 *  	onClose:()=>{}   //toast关闭回调
 *  });
 *
 *  loading使用：
 *  显示:this.props.modal.showLoading();
 *  关闭:this.props.modal.closeLoading();
 * @param Comps
 * @constructor
 */

const Dialog = Comps => class extends React.PureComponent{
	constructor(props){
		super(props);
		this.defaultConfig = {
			confirm:{
				submitText:"确定",
				cancelText:"取消",
				content:null,
				onSubmit:()=>{},
				onCancel:()=>{},
				title:"温馨提示"
			}
		};
		this.state = {
			confirmConfig:Object.assign({},this.defaultConfig.confirm),
			toastState:false,
		};

		this.toastRef = null;
		this.confirmRef = null;
		this.loadingRef = null;
		this.toast = this.toast.bind(this);
		this.showLoading = this.showLoading.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.closeLoading = this.closeLoading.bind(this);

	}
	componentDidMount(){

		this.pubsub_token1 = Pubsub.subscribe("showLoading",()=>{
			this.showLoading();
		});
		this.pubsub_token2 = Pubsub.subscribe("closeLoading",()=>{
			this.closeLoading();
		});
		this.pubsub_token3 = Pubsub.subscribe("showToast",(t,opts)=>{
			this.toast(opts);
		});

	}
	componentWillUnmount(){
		this.pubsub_token1 && Pubsub.unsubscribe(this.pubsub_token1);
		this.pubsub_token2 && Pubsub.unsubscribe(this.pubsub_token2);
		this.pubsub_token3 && Pubsub.unsubscribe(this.pubsub_token3);
		this.timer1 && clearTimeout(this.timer1);
	}
	confirm(opts){
		let {confirmConfig} = this.state;
		let {content} = opts;
		confirmConfig = Object.assign(confirmConfig,opts);
		if(typeof  content == "string" && content.length>0){
			confirmConfig.content = <Text style = {styles.confirmContentText}>{content}</Text>
		};

		this.setState({
			confirmConfig:Object.assign({},confirmConfig),
		},()=>{
			this.confirmRef.open();
		});
	}
	toast(opts){
		this.toastRef.show(opts);
	}
	showLoading(){
		this.loadingRef.show();
	}
	closeLoading(){
		this.loadingRef.close();
	}
	onCancel(){
		let {onCancel} = this.state.confirmConfig;
		onCancel && onCancel();
		this.confirmRef.close();
	}
	onSubmit(){
		let {onSubmit} = this.state.confirmConfig;
		onSubmit && onSubmit();
		this.confirmRef.close();
	}
	render(){
		let {confirmConfig,toastState} = this.state;
		return(
			<View style = {{flex:1}}>
				<Comps {...this.props} modal = {this}/>
				<Modal ref = {(refs)=>{this.confirmRef = refs}}
					   position = "center"
					   backdropOpacity={0.3}
					   style = {[styles.modal,styles.modalAlert,{height:undefined}]}>

					<Text style = {styles.confirmTitle}>{confirmConfig.title}</Text>
					<View style = {styles.confirmContent}>
						{confirmConfig.content}
					</View>
					<View style = {[styles.confirmBtnWrapper]}>
						<DefaultButton onPress = {this.onCancel} style = {styles.confirmBtn}>
							<Text style = {styles.submitText}>{confirmConfig.cancelText}</Text>
						</DefaultButton>
						<View style = {styles.confirmLine}/>
						<DefaultButton onPress = {this.onSubmit} style = {styles.confirmBtn}>
							<Text  style = {styles.submitText}>{confirmConfig.submitText}</Text>
						</DefaultButton>
					</View>

				</Modal>

				<Loading ref = {(refs)=>{this.loadingRef = refs;}}/>


				<Toast ref = {(refs)=>{this.toastRef = refs;}}/>
			</View>
		)

	}
};
export {Dialog}

const styles = StyleSheet.create({
	modal:{
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius:4
	},
	modalToast:{
		backgroundColor:"transparent",
		width:Dimensions.get('window').width-60
	},
	modalToastContent:{
		borderRadius: 4,
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 40,
		paddingRight: 40,
	},
	modalAlert:{
		paddingTop:28,
		width:Dimensions.get('window').width-64,
	},
	modalAlertContent:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft:20,
		paddingRight:20,
		paddingTop:18,
		paddingBottom:33
	},
	confirmTitle:{
		color:"#333",
		fontSize:18,
		fontWeight:"bold"
	},
	confirmContent:{
		paddingTop:15,
		paddingBottom:25,
		paddingHorizontal:15
	},
	confirmBtnWrapper:{
		height:40,
		flexDirection:"row",
		borderTopWidth:1,
		borderColor:"#e6e6e6",
	},
	confirmBtn:{
		flex:1,
		justifyContent:"center",
		alignItems:"center"
	},
	confirmLine:{
		borderLeftWidth:hairlineWidth,
		borderColor:"#e6e6e6"
	},
	confirmContentText:{
		color:"#333",
		lineHeight:21,
	},
	submitText:{
		fontSize:16,
		color:"#398FEF"
	},
	loadingWrapper:{
		position: "absolute",
		left: 0,
		top: 0,
		height: screenHeight,
		width: screenWidth,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0)"
	}
})

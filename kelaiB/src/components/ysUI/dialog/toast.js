/**
 * Created by luojie on 2017/9/12.
 */
import React,{PureComponent} from "react";
import {
	View,
	Text,
	Dimensions,
	Animated
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default class Toast extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			width:0,
			height:0,
			show:false,
			fadeAnim: new Animated.Value(0),
			config:{
				content:null,//toast内容，目前支持string和dom节点，
				onClose:()=>{},//toast关闭后的回调
			}
		},

		this.toast = null;
		this.timeout = 2000;//默认关闭时间
		this.onLayout = this.onLayout.bind(this);
	}
	componentDidMount(){

	}
	onLayout(e){
		let {width,height} = e.nativeEvent.layout;
		this.setState({
			width,
			height
		})
	}
	show(opts){
		let {config} = this.state;
		let {content} = opts;
		let newConfig = deepCopy(config);
		newConfig = Object.assign(newConfig,opts);
		if( typeof content == "string" && content.length>0){
			newConfig.content =  <Text style={styles.text}>{content}</Text>
		}else{
			newConfig.content = content;
		}
		Animated.timing(                            // 随时间变化而执行的动画类型
			this.state.fadeAnim,                      // 动画中的变量值
			{
				toValue: 1,
				duration: 300,
			}
		).start();
		this.setState({
			config:newConfig,
			show:true,
		},()=>{
			this.timer && clearTimeout(this.timer);
			this.timer = setTimeout(()=>{

				Animated.timing(                            // 随时间变化而执行的动画类型
					this.state.fadeAnim,                      // 动画中的变量值
					{
						toValue: 0,
						duration: 300,
					}
				).start();
				opts.onClose && opts.onClose();
				setTimeout(()=>{
					this.setState({
						show:false
					});
				},300)
			},2000)
		})
	}
	render(){
		let {width,height,fadeAnim,config,show} = this.state;
		return(
			<Animated.View
				{...this.props}

				style = {[styles.wrap,{marginLeft:-(width/2),marginTop:-(height/2),opacity: fadeAnim,}]}>
				{
					show &&
					<View
						onLayout = {this.onLayout}
						style = {[styles.toastWrap,]}>
						{
							config.content
						}
					</View>
				}

			</Animated.View>
		)

	}

}
const styles = createStyle({
	wrap:{
		position:"absolute",
		backgroundColor:"transparent",
		left:screenWidth/2,
		top:screenHeight/2,
		maxWidth:screenWidth-100,
		overflow:"hidden"
	},
	toastWrap:{
		padding:15,
		backgroundColor:"rgba(19,19,19,.55)",
		justifyContent:"center",
		alignItems:"center",
		borderRadius:5,
	},
	text:{
		fontSize:16,
		color:"#fff",
		lineHeight:21
	}
});
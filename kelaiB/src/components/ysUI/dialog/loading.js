/**
 * Created by luojie on 2017/9/12.
 */
import React,{PureComponent} from "react";
import {
	View,
	Text,
	Dimensions,
	Animated,
	Image
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const loadingImg = require("../../../images/components/loading.gif");

export default class Loading extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			width:0,
			height:0,
			fadeAnim: new Animated.Value(0),
			show:false,
		}
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
		this.setState({
			show:true
		},()=>{
			Animated.timing(                            // 随时间变化而执行的动画类型
				this.state.fadeAnim,                      // 动画中的变量值
				{
					toValue: 1,
					duration: 300,
				}
			).start();
		})
	
	}
	close(){
		Animated.timing(                            // 随时间变化而执行的动画类型
			this.state.fadeAnim,                      // 动画中的变量值
			{
				toValue: 0,
				// duration: 100,
			}
		).start();
		setTimeout(()=>{
			this.setState({
				show:false
			})
		},10)
	}
	render(){
		let {width,height,fadeAnim,show} = this.state;
		return(
			show?
				<View style = {styles.loadingWrapper}>
					<Animated.View
						{...this.props}

						style = {[styles.wrap,{opacity: fadeAnim,}]}>

						<View
							style = {[styles.toastWrap,]}>

							<Image style = {styles.loadingImg} source={loadingImg}/>
							<Text style = {styles.text}>加载中</Text>
						</View>
					</Animated.View>
				</View>
				:
				null
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
		marginLeft:-110 / 667 *screenHeight / 2,
		marginTop:-110 / 667 *screenHeight / 2,
	},
	toastWrap:{
		height:110 / 667 *screenHeight,
		width:110 / 667 *screenHeight,
		backgroundColor:"rgba(19,19,19,.55)",
		justifyContent:"center",
		alignItems:"center",
		borderRadius:5,
	},
	text:{
		color:"#fff",
		marginTop:15
	},
	loadingImg:{
		height:30,
		width:30
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
});
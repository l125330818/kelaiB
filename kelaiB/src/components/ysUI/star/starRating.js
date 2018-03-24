/**
 * Created by luojie on 2017/9/26.
 */
import React from "react";
import {
	View,
	Image,
	TouchableOpacity
} from "react-native";

import blankStarIcon from "../../../images/components/blank-star.png";
import defaultStarIcon from "../../../images/components/star.png";

export default class Star extends React.PureComponent{
	constructor(props){
		super(props);
		this.arr = [1,1,1,1,1];
		let {iconWidth,iconMargin,score} = this.props;
		this.state = {
			width:(iconWidth + iconMargin*2) * score,
			wrapWidth:(iconWidth + iconMargin*2) * 5
		}
	}
	static defaultProps={
		score:0, //评分，支持小数点
		readOnly:false, //是否只读
		iconWidth:13,//图片大小
		iconMargin:1//图片左右边距
	};
	handlePress(index){
		let {wrapWidth,width} = this.state;
		let {onPress} = this.props;
		this.setState({
			width:(index+1) * (wrapWidth/5)
		},()=>{
			onPress && onPress(index+1);
		});
	}
	componentWillReceiveProps(nextProps){
		let {iconWidth,iconMargin} = this.props;
		if(nextProps.score != this.props.score){
			this.setState({
				width:(iconWidth + iconMargin*2) * nextProps.score,
			})
		}
	}
	render(){
		let {width,wrapWidth} = this.state;
		let {readOnly,blankIcon,starIcon,iconMargin,iconWidth} = this.props;
		let blank = blankIcon?blankIcon:blankStarIcon;
		let star = starIcon?starIcon:defaultStarIcon;
		console.log(wrapWidth,width)

		return(
			<View  style = {[styles.center]}>
				<View style = {[styles.wrap,{width:wrapWidth,height:(iconWidth + iconMargin * 2)}]}>
					<View style = {[styles.row]}>
						{
							this.arr.map(
								(item,index)=>{
									return(
										<TouchableOpacity
											activeOpacity={.8}
											key = {`blankStar${index}`}
											disabled = {readOnly}
											onPress = {this.handlePress.bind(this,index)}>
											<Image style = {{width:iconWidth,margin:iconMargin}}  source={blank}/>
										</TouchableOpacity>
									)
								}

							)
						}
					</View>
					<View style = {[styles.row,{width:width}]}>
						{
							this.arr.map(
								(item,index)=>{
									return(
										<TouchableOpacity
											activeOpacity={.8}
											key = {`star${index}`}
											disabled = {readOnly}
											onPress = {this.handlePress.bind(this,index)}>
											<Image style = {{width:iconWidth,margin:iconMargin,height:iconWidth}}  source={star}/>
										</TouchableOpacity>
									)
								}
							)
						}
					</View>
				</View>
			</View>
		)
	}
}

const styles = createStyle({
	center:{
		justifyContent:"center",
	},
	wrap:{
		position:"relative",
	},
	row:{
		flexDirection:"row",
		position:"absolute",
		overflow:"hidden",
		backfaceVisibility:"hidden",//android 背景不可见。
	}
});
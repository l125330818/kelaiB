/**
 * Created by jiangtao on 2017/5/2.
 */

import React, {PureComponent, PropTypes} from 'react'
import {
	View,
	Image,
	Dimensions,
	ScrollView,
	Alert,
	InteractionManager
} from 'react-native'

export default class DashLine extends PureComponent{
	constructor(){
		super();
		this.state={
			num:0,
			height:0
		};
	}


	onLayout(e){
		const { width , height } = e.nativeEvent.layout;
		let {num} = this.state;
		if(num){
			return;
		}
		this.setState({
			num:Math.ceil(width/9),
			height
		})
	}

	renderDashed(){
		const { num , height } = this.state;
		return Array.from({length:num}).map( (val,index)=> {
			return (
                <View style={[styles.dash,{height}]} key={index}/>
			)
		});
	}

	render(){
		const { style } = this.props;
		return(
            <View removeClippedSubviews = {true} style={[styles.line,style]} onLayout={(e)=>{this.onLayout(e)}} >
				{this.renderDashed()}
            </View>
		)
	}
}

const styles = createStyle({
	line:{
		overflow:'hidden',
		height:1,
		flexDirection:'row'
	},
	dash:{
		backgroundColor:'#cdcdcd',
		height:2,
		width:7,
		marginRight:2
	}
});
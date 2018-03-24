/**
 * Created by luojie on 2017/11/10.
 */
import React from "react";
import {View} from "react-native";
import ajax from "../../util/ajax";

const Network = Comps=> class extends React.PureComponent{
	constructor(props){
		super(props);
	}
	fetch(opts){
		return ajax(opts).catch(function(e){
			console.warn(e,"catch");
		});
	}
	render(){
		return(
			<View style = {{flex:1}}>
				<Comps {...this.props} network = {this}/>
			</View>
		)
	}
}
export {Network};
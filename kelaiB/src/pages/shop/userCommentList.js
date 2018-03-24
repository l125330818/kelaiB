/**
 * Created by luojie on 2017/11/27.
 */
import React from "react";
import {
	View,
	Text,
} from "react-native";
import {
	Header,
	ScrollableTabView
} from "../../components";
import CustomBar from "../../components/shop/customTab";
import CommentContent from "../../components/shop/userCommentContent";

export default class Demo extends React.PureComponent {
	constructor(props) {
		super(props);
		this.tab = [
			{name:"好评",type:1},
			{name:"中评",type:2},
			{name:"差评",type:3},
		];
	}

	render() {
		return (
			<View style = {styles.wrapper}>
				<Header {...this.props} title={"用户评价"}/>
				<ScrollableTabView renderTabBar = {()=><CustomBar tabNames={["好评","中评","差评"]}/>}>
					{
						this.tab.map((item,index)=>{
							return(
								<CommentContent key = {index}/>
							)
						})
					}
				</ScrollableTabView>
			</View>
		)
	}
}

const styles =  createStyle({
	wrapper:{
		flex:1,
		backgroundColor:"#f4f4f4"
	}
});
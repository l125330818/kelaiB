/**
 * Created by luojie on 2017/11/27.
 */
import React from "react";
import {
	View,
	Text,
} from "react-native";
import CommentList from "./commentList";
import {
	DefaultButton,
	StarRating
} from "../index";

export default class Demo extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style = {styles.wrapper}>
				<View style = {styles.commentListWrapper}>
					<DefaultButton style = {styles.commentListTitleWrapper}>
						<View style = {styles.commentListTileLeftRow}>
							<Text style = {styles.commentListTiltText}>用户评价</Text>
							<StarRating score = {3.4} readOnly = {true}/>
							<Text style = {styles.commentCount}>{13213}人评价</Text>
						</View>
					</DefaultButton>
					<CommentList/>
					<CommentList/>
					<CommentList/>
				</View>
			</View>
		)
	}
}

const styles = createStyle({
	wrapper:{
		flex:1,
		marginTop:10
	},
	commentListWrapper:{
		backgroundColor:"#fff",
	},
	commentListTitleWrapper:{
		paddingVertical:14,
		paddingHorizontal:15,
		flexDirection:"row",
		justifyContent:"space-between"
	},
	commentListTileLeftRow:{
		borderLeftWidth:2,
		borderColor:"#FD6141",
		paddingLeft:10,
		flexDirection:"row"
	},
	commentListTiltText:{
		fontSize:15,
		color:"#999",
		marginRight:14
	},
	commentCount:{
		fontSize:12,
		color:"#999",
		marginLeft:10,
	},
	color999:{
		color:"#999",

	}
});
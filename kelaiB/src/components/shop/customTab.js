/**
 * Created by luojie on 2017/9/29.
 * 自定义tab
 */
import React from "react";
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
	Animated
} from "react-native";
import PropTypes from "prop-types";

export default class TabBar extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			labelWidth:0
		}
	}

	static propTypes = {
		goToPage: PropTypes.func, // 跳转到对应tab的方法
		activeTab: PropTypes.number, // 当前被选中的tab下标
		tabs: PropTypes.array, // 所有tabs集合

		tabNames: PropTypes.array, // 保存Tab名称
		tabIconNames: PropTypes.array, // 保存Tab图标
	}

	setAnimationValue({value}) {

	}

	componentDidMount() {
		// Animated.Value监听范围 [0, tab数量-1]
		this.props.scrollValue.addListener(this.setAnimationValue);
	}
	layout(e){
		this.setState({
			labelWidth:e.nativeEvent.layout.width
		})
	}
	renderTabOption(tab, i) {
		let {activeTab,tabNames,value} = this.props;
		let color = activeTab == i ? "#FF5940" : "#666"; // 判断i是否是当前选中的tab，设置不同的颜色
		return (
			<View key = {"tab" + i}
				 style = {{flex:1}}>
				<TouchableOpacity
					activeOpacity={.8}
					onPress={()=>this.props.goToPage(i)}
					style={[styles.tab,]}>
					<View style={styles.tabItem}>
						<Text
							onLayout = {this.layout.bind(this)}
							style={{color: color}}>
							{tabNames[i]}
						</Text>
					</View>
				</TouchableOpacity>
			</View>

		);
	}

	render() {
		let {tabNames,scrollValue,tabs} = this.props;
		let {labelWidth} = this.state;
		const translateX = scrollValue.interpolate({
			inputRange: [0, 1],
			outputRange: [0,  (screenWidth / tabNames.length)],
		});
		return (
			<View style={styles.tabs}>
				{tabs.map((tab, i) => this.renderTabOption(tab, i))}
				<Animated.View
					style={[
						styles.active,
						{width: labelWidth+30,left:((screenWidth / tabNames.length)/2-labelWidth)},
						{
							transform: [
								{ translateX },
							]
						},

					]}
				/>
			</View>
		);
	}
}
const styles = createStyle({
	tabs: {
		flexDirection: 'row',
		height: 41,
		backgroundColor:"#fff"
		// borderBottomWidth:StyleSheet.hairlineWidth,
		// borderColor:"#e6e6e6"
	},

	tab: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position:"relative"

	},
	active:{
		height:2,
		backgroundColor:"red",
		borderBottomWidth:4,
		borderColor:"#FF5940",
		position:"absolute",
		bottom:-1.5,
	},
	tabItem: {
		flexDirection: 'column',
		alignItems: 'center',
	}
});


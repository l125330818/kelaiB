import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Animated,
	ART,
	StyleSheet,
	Text,
	View,
	ViewPropTypes,
} from 'react-native';

import Arc from './Arc';
import withAnimation from './withAnimation';

const CIRCLE = Math.PI * 2;

const AnimatedSurface = Animated.createAnimatedComponent(ART.Surface);
const AnimatedArc = Animated.createAnimatedComponent(Arc);

const RNViewPropTypes = ViewPropTypes || View.propTypes;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
		overflow: 'hidden',
	},
});

export class ProgressCircle extends Component {
	static propTypes = {
		animated: PropTypes.bool,
		borderColor: PropTypes.string,
		bgColor: PropTypes.string,  //进度条下面的背景色
		borderWidth: PropTypes.number,
		color: PropTypes.string,  //进度条颜色
		children: PropTypes.node,  //进度条内容
		direction: PropTypes.oneOf(['clockwise', 'counter-clockwise']),
		indeterminate: PropTypes.bool,  //是否需要转动
		progress: PropTypes.oneOfType([  //进程百分点(0~1)
			PropTypes.number,
			PropTypes.instanceOf(Animated.Value),
		]),
		rotation: PropTypes.instanceOf(Animated.Value),
		showsText: PropTypes.bool,
		smallCircle: PropTypes.bool,  //是否需要小白点
		size: PropTypes.number,
		style: RNViewPropTypes.style,
		textStyle: Text.propTypes.style,
		thickness: PropTypes.number,  //精度条宽度
		unfilledColor: PropTypes.string,
	};

	static defaultProps = {
		borderWidth: 1,
		color: 'rgba(0, 122, 255, 1)',
		bgColor: '#fff',
		direction: 'clockwise',
		progress: 0,
		showsText: false,
		size: 40,
		thickness: 3,
		smallCircle:false,
		indeterminate:true,
	};

	constructor(props, context) {
		super(props, context);

		this.progressValue = 0;
	}

	componentWillMount() {
		if (this.props.animated) {
			this.props.progress.addListener((event) => {
				this.progressValue = event.value;
				if (this.props.showsText || this.progressValue === 1) {
					this.forceUpdate();
				}
			});
		}
	}

	render() {
		const {
			animated,
			bgColor,
			borderWidth,
			color,
			children,
			direction,
			indeterminate,
			progress,
			rotation,
			size,
			style,
			strokeCap,
			thickness,
			smallCircle,
			...restProps
		} = this.props;

		const border = borderWidth;

		const radius = (size / 2) - border;
		const offset = {
			top: border,
			left: border,
		};
		const textOffset = border + thickness;
		const textSize = size - (textOffset * 2);

		const Surface = rotation ? AnimatedSurface : ART.Surface;
		const Shape = animated ? AnimatedArc : Arc;
		const angle = animated ? Animated.multiply(progress, CIRCLE) : progress * CIRCLE;

		return (
			<View style={[styles.container, style]} {...restProps}>
				<Surface
					width={size}
					height={size}
					style={{
						transform: [{
							rotate: indeterminate && rotation
								? rotation.interpolate({
									inputRange: [0, 1],
									outputRange: ['0deg', '360deg'],
								})
								: '0deg',
						}],
					}}
				>

					<Shape
						radius={radius}
						offset={offset}
						startAngle={0}
						endAngle={CIRCLE}
						direction={direction}
						stroke={bgColor}
						strokeCap={strokeCap}
						strokeWidth={thickness}
					/>
					<Shape
						radius={radius}
						offset={offset}
						startAngle={0}
						endAngle={angle}
						direction={direction}
						stroke={color}
						strokeCap={strokeCap}
						strokeWidth={thickness}
					/>
				</Surface>
				{
					smallCircle &&
					<View style = {{position:"absolute",left:size/2,top:border+(thickness-6)/2,height:6,width:6,borderRadius:3,backgroundColor:"#fff"}}/>
				}
				<View
					style={{
						position: 'absolute',
						left: textOffset,
						top: textOffset,
						width: textSize,
						height: textSize,
						borderRadius: textSize / 2,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{children}
				</View>
			</View>
		);
	}
}

export default withAnimation(ProgressCircle);
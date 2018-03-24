//
//  UIColor+Constant.h
//  kelaiAR
//
//  Created by Harvey on 2017/9/28.
//  Copyright © 2017年 Harvey. All rights reserved.
//

#import <UIKit/UIKit.h>
#define RGB(r,g,b)          RGBA(r,g,b,1)
#define RGBA(r,g,b,a)       ([UIColor colorWithRed:r/255.0 green:g/255.0 blue:b/255.0 alpha:a])

@interface UIColor (Constant)
/// nav bar 颜色
+ (UIColor *)assignNavBackGroundColor;
/// 红色
+ (UIColor *)assignRedColor;

/// 黄色
+ (UIColor *)assignYellowColor;

/// 灰色
+ (UIColor *)assignLightGrayColor;

/// 白色
+ (UIColor *)assignWhiteColor;

/// 分割线颜色
+ (UIColor *)assginSeparatorGrayColor;

/// 黑色
+ (UIColor *)assginLevel1TextColor;

/// 次要黑
+ (UIColor *)assginLevel2TextColor;

/// 暗色提示
+ (UIColor *)assginLevel3TextColor;

/// 蒙版色
+ (UIColor *)assginMaskColor;

/// 按钮红色按下
+ (UIColor *)assignDeepRedColor;

// 红包红色
+ (UIColor *)assignRedPaperRedColor;

/// 蓝色提示
+ (UIColor *)assignBlueColor;

/// 我的字体颜色
+ (UIColor *)assginMineTextColor;

/// 红包上黄色字体
+ (UIColor *)assignRedPaperTextYellowColor;

/// 按钮背景蓝色
+ (UIColor *)assignButtonBlueColor;

/// 黑色navbar
+ (UIColor *)assignNavBarBlackColor;

/// 没有数据提示颜色
+ (UIColor *)assignNoDataTipColor;
///
+ (UIColor *)colorWithHexString:(NSString *)color andAlpha:(CGFloat)alpha;
+ (UIColor *)colorWithHexString:(NSString *)color ;
@end

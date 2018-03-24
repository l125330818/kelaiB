//
//  UIColor+Constant.m
//  kelaiAR
//
//  Created by Harvey on 2017/9/28.
//  Copyright © 2017年 Harvey. All rights reserved.
//

#import "UIColor+Constant.h"



@implementation UIColor (Constant)
/// nav bar 颜色
+ (UIColor *)assignNavBackGroundColor {
    return [self colorWithHexString:@"#fc3e28"];
}
/// 红色
+ (UIColor *)assignRedColor {
    return [self colorWithHexString:@"#ff5940"];
}

/// 黄色
+ (UIColor *)assignYellowColor {
    return [self colorWithHexString:@"#ff8f2c"];
}

/// 灰色
+ (UIColor *)assignLightGrayColor {
    return [self colorWithHexString:@"#f7f7f7"];
}

/// 白色
+ (UIColor *)assignWhiteColor {
    return [self colorWithHexString:@"#ffffff"];
}

/// 分割线颜色
+ (UIColor *)assginSeparatorGrayColor {
    return [self colorWithHexString:@"#e6e6e6"];
}

/// 黑色
+ (UIColor *)assginLevel1TextColor {
    return [self colorWithHexString:@"#333333"];
}

/// 次要黑
+ (UIColor *)assginLevel2TextColor {
    return [self colorWithHexString:@"#666666"];;
}

/// 我的字体颜色
+ (UIColor *)assginMineTextColor{
    return [self colorWithHexString:@"#4d4d4d"];
}

/// 暗色提示
+ (UIColor *)assginLevel3TextColor {
    return [self colorWithHexString:@"#999999"];
}

/// 蒙版色
+ (UIColor *)assginMaskColor {
    return [self colorWithHexString:@"#000000" andAlpha:0.4];
}

/// 按钮红色按下
+ (UIColor *)assignDeepRedColor {
    return [self colorWithHexString:@"#e94026"];
}

// 红包红色
+ (UIColor *)assignRedPaperRedColor {
    return [self colorWithHexString:@"#E74F31"];
}

/// 蓝色提示
+ (UIColor *)assignBlueColor {
    return [UIColor colorWithHexString:@"#5e73a6"];
}

/// 红包上黄色字体
+ (UIColor *)assignRedPaperTextYellowColor {
    return [UIColor colorWithHexString:@"#FFE8C1"];
}

/// 按钮背景蓝色
+ (UIColor *)assignButtonBlueColor {
    return [UIColor colorWithHexString:@"#398fef"];
}

/// 黑色navbar
+ (UIColor *)assignNavBarBlackColor {
    return [UIColor colorWithHexString:@"#1a1a1a"];
}
+ (UIColor *)colorWithHexString:(NSString *)color{
    return [self colorWithHexString:color andAlpha:1];
}

/// 没有数据提示颜色
+ (UIColor *)assignNoDataTipColor {
    return [self colorWithHexString:@"#998c8a"];
}

+ (UIColor *)colorWithHexString:(NSString *)color andAlpha:(CGFloat)alpha {
    NSString *cString = [[color stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]] uppercaseString];
    
    // String should be 6 or 8 characters
    if ([cString length] < 6) {
        return [UIColor clearColor];
    }
    
    // strip 0X if it appears
    if ([cString hasPrefix:@"0X"])
        cString = [cString substringFromIndex:2];
    if ([cString hasPrefix:@"#"])
        cString = [cString substringFromIndex:1];
    if ([cString length] != 6)
        return [UIColor clearColor];
    
    // Separate into r, g, b substrings
    NSRange range;
    range.location = 0;
    range.length = 2;
    
    //r
    NSString *rString = [cString substringWithRange:range];
    
    //g
    range.location = 2;
    NSString *gString = [cString substringWithRange:range];
    
    //b
    range.location = 4;
    NSString *bString = [cString substringWithRange:range];
    
    // Scan values
    unsigned int r, g, b;
    [[NSScanner scannerWithString:rString] scanHexInt:&r];
    [[NSScanner scannerWithString:gString] scanHexInt:&g];
    [[NSScanner scannerWithString:bString] scanHexInt:&b];
    
    return [UIColor colorWithRed:((float) r / 255.0f) green:((float) g / 255.0f) blue:((float) b / 255.0f) alpha:alpha];
}


@end

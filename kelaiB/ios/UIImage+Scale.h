//
//  UIImage+Scale.h
//  kelaiAR
//
//  Created by Harvey on 2017/10/19.
//  Copyright © 2017年 Harvey. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIImage (Scale)
- (UIImage *)scaleToSize:(CGSize)size;

- (UIImage *)scaleImageToScale:(CGFloat)scale;

- (UIImage *)fixOrientation;

@end

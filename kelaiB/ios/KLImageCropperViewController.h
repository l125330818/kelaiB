//
//  VPImageCropperViewController.h
//  VPolor
//
//  Created by Vinson.D.Warm on 12/30/13.
//  Copyright (c) 2013 Huang Vinson. All rights reserved.
//

#import <UIKit/UIKit.h>

@class KLImageCropperViewController;

@protocol KLImageCropperDelegate <NSObject>

- (void)imageCropper:(KLImageCropperViewController *)cropperViewController didFinished:(UIImage *)editedImage;
- (void)imageCropperDidCancel:(KLImageCropperViewController *)cropperViewController;

@end

@interface KLImageCropperViewController : UIViewController

@property (nonatomic, assign) NSInteger tag;

@property (nonatomic, assign) id<KLImageCropperDelegate> delegate;

@property (nonatomic, assign) CGRect cropFrame;

- (id)initWithImage:(UIImage *)originalImage cropFrame:(CGRect)cropFrame limitScaleRatio:(NSInteger)limitRatio;

@end

//
//  IOSSelectImage.m
//  kelaiB
//
//  Created by Harvey on 2017/12/5.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "IOSSelectImage.h"
#import <UIKit/UIKit.h>
#import "UIColor+Constant.h"
#import "UIImage+Scale.h"
#import "KLImageCropperViewController.h"

#define WIN_SIZE [UIScreen mainScreen].bounds.size
@interface IOSSelectImage () <UIImagePickerControllerDelegate, UINavigationControllerDelegate, KLImageCropperDelegate>
@property (nonatomic, assign) CGFloat cropWidth;
@property (nonatomic, assign) CGFloat cropHeight;
@property (nonatomic, copy) RCTResponseSenderBlock callBack;
@end
@implementation IOSSelectImage

RCT_EXPORT_MODULE(IOSSelectImageManager);


- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

/// type:1 从相册选择
/// type:2 拍照
RCT_EXPORT_METHOD(selectImageWithType:(NSInteger)type cropWidth:(CGFloat)width cropHeight:(CGFloat)height callBack:(RCTResponseSenderBlock)callBack){
  self.cropWidth = width;
  self.cropHeight = height;
  self.callBack = callBack;
  [self selectPhotoWithType:type == 1 ? UIImagePickerControllerSourceTypePhotoLibrary : UIImagePickerControllerSourceTypeCamera];
}

#pragma mark --
#pragma mark -- private Methods
- (void)selectPhotoWithType:(UIImagePickerControllerSourceType)type{
  if (![UIImagePickerController isSourceTypeAvailable:type]) {
    return;
  }
  UIImagePickerController *pickerVc = [[UIImagePickerController alloc] init];
  pickerVc.delegate = self;
  pickerVc.allowsEditing = YES;
  pickerVc.sourceType = type;
  pickerVc.navigationBar.barTintColor = [UIColor whiteColor];
  pickerVc.navigationBar.translucent = NO;
  [pickerVc.navigationBar setTitleTextAttributes:@{NSForegroundColorAttributeName:[UIColor assginLevel1TextColor]}];
  pickerVc.navigationItem.leftBarButtonItem.tintColor = [UIColor assginLevel1TextColor];
  pickerVc.navigationBar.tintColor = [UIColor assginLevel1TextColor];
  pickerVc.navigationController.navigationBar.tintColor = [UIColor assginLevel1TextColor];
  pickerVc.navigationItem.rightBarButtonItem.tintColor = [UIColor assginLevel1TextColor];
  [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleDefault];
  pickerVc.allowsEditing = NO;
  [[UIApplication sharedApplication].delegate.window.rootViewController presentViewController:pickerVc animated:YES completion:nil];
  
}

#pragma mark --
#pragma mark -- UIImagePickerDelegate
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary<NSString *,id> *)info {
  UIImage *image = [info objectForKey:UIImagePickerControllerOriginalImage];
  if (image && picker.sourceType == UIImagePickerControllerSourceTypeCamera) {
    UIImageWriteToSavedPhotosAlbum(image, self, nil, nil);
  }
  image = [image fixOrientation];
  
  KLImageCropperViewController *cropperVc = [[KLImageCropperViewController alloc] initWithImage:image cropFrame:CGRectMake((WIN_SIZE.width - _cropWidth) / 2, (WIN_SIZE.height - _cropHeight) / 2, _cropWidth, _cropHeight) limitScaleRatio:3.0f];
  
  cropperVc.delegate = self;
  [picker dismissViewControllerAnimated:YES completion:^{
  [[UIApplication sharedApplication].delegate.window.rootViewController presentViewController:cropperVc animated:YES completion:nil];
  }];
}
- (void)imageCropper:(KLImageCropperViewController *)cropperViewController didFinished:(UIImage *)editedImage {
  NSString *pathTemp = NSTemporaryDirectory();
  NSTimeInterval interval = [[NSDate date] timeIntervalSince1970];
  NSString *imagePath = [pathTemp stringByAppendingPathComponent:[NSString stringWithFormat:@"%ld.png", (long)interval]];
  [UIImagePNGRepresentation(editedImage) writeToFile:imagePath atomically:YES];
  if (self.callBack) self.callBack(@[imagePath]);
  [cropperViewController dismissViewControllerAnimated:YES completion:nil];
}
- (void)imageCropperDidCancel:(KLImageCropperViewController *)cropperViewController {
  [cropperViewController dismissViewControllerAnimated:YES completion:nil];
}


@end

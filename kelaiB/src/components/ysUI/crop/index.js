/**
 * Created by luojie on 2017/12/7.
 * 图片裁剪
 */
import React from "react";
import {
	NativeModules
} from "react-native";

const IOSSelectImage = NativeModules.IOSSelectImageManager;
import imageCropPicker from 'react-native-image-crop-picker';

export default function imageCrop(opts,cb){
	return isIos?
		IOSSelectImage.selectImageWithType(1,opts.width,opts.height,(path)=>{
			cb({path})
		})
		:
		imageCropPicker.openPicker({
			width: opts.width,
			height: opts.height,
			cropping: true,
			mediaType:"photo"
		}).then(path=>{
			cb(path)
		})
}

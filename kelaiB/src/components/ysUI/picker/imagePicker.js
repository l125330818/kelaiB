/**
 * Created by luojie on 2017/11/11.
 * 滚动选择picker
 */
import  ImagePicker from 'react-native-image-picker';
export default function showImagePicker(select){
	let photoOptions = {
		//底部弹出框选项
		title:'请选择',
		cancelButtonTitle:'取消',
		takePhotoButtonTitle:'拍照',
		chooseFromLibraryButtonTitle:'选择相册',
		quality:0.75,
		allowsEditing:true,
		noData:false,
		storageOptions: {
			skipBackup: true,
			path:'images'
		}
	};
	ImagePicker.showImagePicker(photoOptions,(response)=>{
		select(response)
	})
}
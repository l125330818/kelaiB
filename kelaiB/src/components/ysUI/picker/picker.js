/**
 * Created by luojie on 2017/11/11.
 * 滚动选择picker
 */
import Picker from 'react-native-picker';
export default function showPicker(data,selectValue,confirm,cancel){
	Picker.init({
		pickerData: data,
		pickerConfirmBtnText:"确定",
		pickerCancelBtnText:"取消",
		pickerTitleText:"",
		pickerToolBarFontSize: 16,
		pickerFontSize: 16,
		pickerConfirmBtnColor:[57,143,239,1],
		pickerCancelBtnColor:[57,143,239,1],
		pickerFontColor:[51,51,51,1],
		pickerBg:[255,255,255,1],
		pickerToolBarBg:[255,255,255,1],
		selectedValue:selectValue,
		onPickerConfirm: (pickedValue, pickedIndex) => {
			console.log('date', pickedValue, pickedIndex);
			confirm(pickedValue,pickedIndex)
		},
		onPickerCancel: (pickedValue, pickedIndex) => {
			console.log('date', pickedValue, pickedIndex);
		},
		onPickerSelect: (pickedValue, pickedIndex) => {
			console.log('date', pickedValue, pickedIndex);
		}
	});
	Picker.show();
}
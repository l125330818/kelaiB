/**
 * Created by luojie on 2017/12/3.
 */
import Api from "../../config/Api";
import Type from "../type";
export function sendVerCode(param,cb){
	return  (dispatch) =>{
		return ajax({
			url:Api.sendVerCode,
			method:"post",
			body: param
		}).then((result)=>{
			if(result.status === 1){
				cb(result)
			}
		})
	};
}
export function bindPhone(param,cb){
	return  (dispatch) =>{
		return ajax({
			url:Api.bindPhone,
			method:"post",
			body: param
		}).then((result)=>{
			cb(result)
		})
	};
}
export function getShopCategory(param,cb){
	return  (dispatch) =>{
		return ajax({
			url:Api.getShopCategory,
			body: param
		}).then((result)=>{
			cb(result)
		})
	};
}
export function uploadAvatar(param,cb){
	return  (dispatch) =>{
		return upload({
			url:Api.uploadShopLogo,
			method:"post",
			body: param
		}).then((result)=>{
			cb(result)
		})
	};
}
export function editBaseShopInfo(param,cb){
	return  (dispatch) =>{
		return ajax({
			url:Api.editShop,
			method:"post",
			body: param
		}).then((result)=>{
			cb(result);
			dispatch({type:Type.EDIT_BASE_SHOP_INFO,result})
		})
	};
}
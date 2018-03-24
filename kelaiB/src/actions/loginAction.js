/**
 * Created by luojie on 2017/12/3.
 */
export function weChatLogin(param,cb){
	return  (dispatch) =>{
		return ajax({
			url:"/Merchant/WeChatAuthorization",
			method:"post",
			body: param
		}).then((result)=>{
			if(result.status === 1){
				cb(result);
				dispatch({type:"WECHAT_LOGIN",result});
			}
		})
	};
}
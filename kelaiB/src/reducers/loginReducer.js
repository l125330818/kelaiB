/**
 * Created by luojie on 2017/12/3.
 */
let initState = {
	weChatLoginInfo:{
		accessToken:""
	}
};
export default function add(state=initState,action){
	switch(action.type){
		case "WECHAT_LOGIN":
			return{
				...state,
				weChatLoginInfo:action.result
			};
		default :
			return state
	}
}
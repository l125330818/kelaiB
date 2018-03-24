/**
 * Created by luojie on 2017/12/3.
 */
import Type from "../actions/type";
let initState = {
	ver:{
		accessToken:""
	},
	baseInfo:{

	}
};
export default function add(state=initState,action){
	switch(action.type){
		case Type.SEND_VER_CODE:
			return{
				...state,
				ver:action.result
			};
		case Type.EDIT_BASE_SHOP_INFO:
			return{
				...state,
				baseInfo:action.result
			}
		default :
			return state
	}
}
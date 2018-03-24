/**
 * Created by luojie on 2017/9/7.
 */
let initState = {
	num:0,
	deleteNum:0,
};
export default function add(state=initState,action){
	switch(action.type){
		case "ADD":
			return{
				...state,
				num:++state.num
			};
		case "DELETE":
			return{
				...state,
				num:--state.num
			};
		default :
			return state
	}
}
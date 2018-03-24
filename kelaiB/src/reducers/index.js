/**
 * Created by luojie on 2017/9/7.
 */
import {combineReducers} from "redux";
import Add from "./todoListReducer";
import loginReducer from "./loginReducer";
import shopApplyReducer from "./shopApplyReducer";
export default function getReducers(navReducer) {
	return combineReducers({
		Add,
		loginReducer,
		shopApplyReducer,
		nav: navReducer
	});
}

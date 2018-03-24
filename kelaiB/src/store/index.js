/**
 * Created by luojie on 2017/12/3.
 */
import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import getRootReducer from "../reducers";

export default function getStore(navReducer) {
	const store = createStore(
		getRootReducer(navReducer),
		undefined,
		applyMiddleware(thunk)
	);

	return store;
}
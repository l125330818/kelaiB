/**
 * Created by luojie on 2017/12/4.
 */
import {
	AsyncStorage
} from "react-native";
export function setItem(key, value) {
	if (key && value){
		return AsyncStorage.setItem(key, value);
	}
}

export function getItem(key) {
	return AsyncStorage.getItem(key)
		.then(function (value) {
			return value
		});
}
export function multiGet(keys) {
	return AsyncStorage.multiGet(keys)
		.then(results=> {
			return results.map(item=> {
				return [item[0], JSON.parse(item[1])]
			})
		});
}
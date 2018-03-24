/**
 * Created by luojie on 2017/9/7.
 */
const ADD = "ADD";
const DELETE = "DELETE";
export function addTodo(text) {
	return { type: ADD, text }
}
export function deleyeTodo(text){
	return { type: DELETE, text }
}

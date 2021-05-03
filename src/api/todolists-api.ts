import axios from "axios";

const settings = {
	withCredentials : true, // * залогинен
	headers : {
		"API-KEY" : "f0cc0942-0306-4a5b-86b9-c3852c7f7cf3"
	}
}

export type TodolistType = {
	id : string
	addedDate : string
	order : string
	title : string
}
// type CreateTodolistType = {
// 	resultCode : number
// 	messages : Array<string>,
// 	data : {
// 		item : TodolistType
// 	}
// }
// type DeleteTodolistType = {
// 	resultCode : number
// 	messages : Array<string>,
// 	data : {}
// }
type ResponseType<D> = {
	resultCode : number
	messages : Array<string>,
	data : D
}

export const todolistAPI = {
	getTodolist () {
		const promise = axios.get<Array<TodolistType>> ( "https://social-network.samuraijs.com/api/1.1/todo-lists", settings );
		return promise;
	},
	createTodolist ( title : string ) {
		const promise = axios.post<ResponseType<{ item : TodolistType }>> ( "https://social-network.samuraijs.com/api/1.1/todo-lists", { title }, settings );
		return promise
	},
	deleteTodolist ( id : string ) {
		const promise = axios.delete<ResponseType<{}>> ( `https://social-network.samuraijs.com/api/1.1/todo-lists/${ id }`, settings );
		return promise
	},
	updateTodolist ( id : string, title : string ) {
		const promise = axios.put<ResponseType<{}>> ( `https://social-network.samuraijs.com/api/1.1/todo-lists/${ id }`, { title }, settings );
		return promise
	}
}
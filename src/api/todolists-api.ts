import axios from "axios";

const instanse = axios.create ( {
	baseURL : "https://social-network.samuraijs.com/api/1.1/",
	withCredentials : true, // * залогинен
	headers : {
		"API-KEY" : "f0cc0942-0306-4a5b-86b9-c3852c7f7cf3"
	}
} )

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
type ResponseType<D = {}> = {
	resultCode : number
	messages : Array<string>,
	data : D
}

export const todolistAPI = {
	getTodolist () {
		const promise = instanse.get<Array<TodolistType>> ( "todo-lists" );
		return promise;
	},
	createTodolist ( title : string ) {
		const promise = instanse.post<ResponseType<{ item : TodolistType }>> ( "todo-lists", { title } );
		return promise
	},
	deleteTodolist ( id : string ) {
		const promise = instanse.delete<ResponseType> ( `todo-lists/${ id }` );
		return promise
	},
	updateTodolist ( id : string, title : string ) {
		const promise = instanse.put<ResponseType> ( `todo-lists/${ id }`, { title } );
		return promise
	}
}

type TaskType = {
	description : string
	title : string
	completed : boolean
	status : boolean
	priority : number
	startDate : string
	deadline : string
	id : string
	todoListId : string
	order : number
	addedDate : string
}

type GetTasksResponse = {
	items : Array<TaskType>
	totalCount : number
	error : string
}

export const tasksAPI = {
	getTasks ( todolistId : string ) {
		return instanse.get<GetTasksResponse> ( `todo-lists/${ todolistId }/tasks` );
	},
	createTasks ( todolistId : string, title : string ) {
		return instanse.post<ResponseType> ( `todo-lists/${ todolistId }/tasks`, { title } );
	},
	deleteTasks ( todolistId : string, taskId : string ) {
		return instanse.delete<ResponseType> ( `todo-lists/${ todolistId }/tasks/${ taskId }` );
	}
// 	updateTasks ( todolistId : string, taskId : string, update: Object ) {
// 		return instanse.put<TaskResponse> ( `todo-lists/${ todolistId }/tasks/${ taskId }`, {update} );
// 	}
}
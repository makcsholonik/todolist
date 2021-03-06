import axios from "axios";
import { FilteredType } from "../state/todolists-reducer";

const instanse = axios.create ( {
	baseURL : "https://social-network.samuraijs.com/api/1.1/",
	withCredentials : true, // * залогинен
	headers : {
		"API-KEY" : "f0cc0942-0306-4a5b-86b9-c3852c7f7cf3"
	}
} );

export type TodolistType = {
	id : string
	addedDate : string
	order : number
	title : string
	filter : FilteredType // support нет в документации
}

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
		return promise;
	},
	deleteTodolist ( id : string ) {
		const promise = instanse.delete<ResponseType> ( `todo-lists/${ id }` );
		return promise;
	},
	updateTodolist ( id : string, title : string ) {
		const promise = instanse.put<ResponseType> ( `todo-lists/${ id }`, { title } );
		return promise;
	}
};

export enum TaskStatus {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3
}

export enum TaskPriority {
	Low = 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4
}

export type TaskType = {
	description : string
	title : string
	completed : boolean
	status : TaskStatus
	priority : TaskPriority
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

export type TaskModelType = {
	title : string
	description : string
	status : number
	priority : number
	startDate : string
	deadline : string
}

export const tasksAPI = {
	getTasks ( todolistId : string ) {
		return instanse.get<GetTasksResponse> ( `todo-lists/${ todolistId }/tasks` );
	},
	createTask ( todolistId : string, title : string ) {
		return instanse.post<ResponseType<TaskType>> ( `todo-lists/${ todolistId }/tasks`, { title } );
	},
	deleteTask ( todolistId : string, taskId : string ) {
		return instanse.delete<ResponseType> ( `todo-lists/${ todolistId }/tasks/${ taskId }` );
	},
	updateTask ( todolistId : string, taskId : string, model : TaskModelType ) {
		return instanse.put<ResponseType> ( `todo-lists/${ todolistId }/tasks/${ taskId }`, { model } );
	}
};
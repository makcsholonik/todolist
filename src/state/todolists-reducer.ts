import { FilteredType, TodolistType } from "../App";
import { v1 } from "uuid";

export type RemoveTodolistActionType = {
	type : 'REMOVE-TODOLIST'
	id : string
}
export type AddTodolistActionType = {
	type : 'ADD-TODOLIST'
	title : string
	id : string
}
export type ChangeTodolistTitleActionType = {
	type : 'CHANGE-TODOLIST-TITLE'
	id : string
	title : string
}
export type ChangeTodolistFilterActionType = {
	type : 'CHANGE-TODOLIST-FILTER'
	id : string
	filter : FilteredType
}
export type ActionType = RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType

export const todolistId1 = v1 ();
export const todolistId2 = v1 ();

const initialState: Array<TodolistType> = [
	{ id : todolistId1, title : "What to learn", filter : "all" },
	{ id : todolistId2, title : "What to bye", filter : "all" },
];

export const todolistsReducer = ( state : Array<TodolistType> = initialState, action : ActionType ) : Array<TodolistType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return state.filter ( tl => tl.id !== action.id );
		case 'ADD-TODOLIST':
			return [ {
				id : action.id,
				title : action.title,
				filter : 'all'},
				...state
			];
		case 'CHANGE-TODOLIST-TITLE':
			const todolist = state.find ( tl => tl.id === action.id );
			if (todolist) {
				todolist.title = action.title;
			}
			return [...state];
		case 'CHANGE-TODOLIST-FILTER':
			let todolistFilter = state.find ( tl => tl.id === action.id );
			if (todolistFilter) {
				todolistFilter.filter = action.filter;
			}
			return [...state];
		default:
			return state;
	}
}

export const removeTodolistAC = ( id : string ) : RemoveTodolistActionType => {
	return { type : 'REMOVE-TODOLIST', id }
}
export const addTodolistAC = ( title : string ) : AddTodolistActionType => {
	return { type : 'ADD-TODOLIST', title, id : v1 () }
}
export const changeTodolistTitleAC = ( id : string, title : string ) : ChangeTodolistTitleActionType => {
	return { type : 'CHANGE-TODOLIST-TITLE', id, title }
}
export const changeTodolistFilterAC = ( id : string, filter : FilteredType ) : ChangeTodolistFilterActionType => {
	return { type : 'CHANGE-TODOLIST-FILTER', id, filter }
}

import { TaskStateType } from "../App";
import { v1 } from "uuid";

type RemoveTaskActionType = {
	type : 'REMOVE-TASK'
	id : string
	todolistId : string
}
type AddTaskActionType = {
	type : 'ADD-TASK'
	title : string
	todolistId : string
}
type ChangeTaskStatusActionType = {
	type: 'CHANGE-TASK-STATUS'
	id : string
	isDone : boolean
	todolistId : string
}
type ChangeTaskTitlesActionType = {
	type: 'CHANGE-TASK-TITLE'
	id : string
	title : string
	todolistId : string
}

export type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitlesActionType


export const tasksReducer = ( state : TaskStateType, action : ActionType ) : TaskStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			// делаем копию state, далее ее будем изменять и возвращать
			const stateCopy = { ...state };
			// достаём массив тасок из копии стейта по ID тудулиста который приходит к нам из action
			const tasks = state[ action.todolistId ];
			// получаем отфильтрованные таски
			const filteredTasks = tasks.filter ( task => task.id !== action.id );
			// записываем отфильтрованные таски в stateCopy
			stateCopy[ action.todolistId ] = filteredTasks;
			return stateCopy
		}
		case 'ADD-TASK': {
			const stateCopy = { ...state };
			const tasks = stateCopy[ action.todolistId ];
			const newTask = { id : v1 (), title : action.title, isDone : false };
			stateCopy[ action.todolistId ] = [newTask, ...tasks];
			return stateCopy
		}
		case 'CHANGE-TASK-STATUS': {
			const stateCopy = { ...state };
			const tasks = stateCopy[action.todolistId];
			const task = tasks.find(t => t.id === action.id);
			if (task) {
				task.isDone = action.isDone
			}
			return stateCopy
		}
		case 'CHANGE-TASK-TITLE': {
			const stateCopy = { ...state };
			const tasks = stateCopy[action.todolistId];
			const task = tasks.find(t => t.id === action.id);
			if (task) {
				task.title = action.title
			}
			return stateCopy
		}
		default:
			throw new Error ( 'I dont understand this type' )
	}
}

export const removeTaskAC = ( id : string, todolistId : string ) : RemoveTaskActionType => {
	return { type : 'REMOVE-TASK', id, todolistId }
}
export const addTaskAC = ( title : string, todolistId : string ) : AddTaskActionType => {
	return { type : 'ADD-TASK', title, todolistId }
}
export const changeTaskStatusAC = ( id : string, isDone : boolean, todolistId : string ) : ChangeTaskStatusActionType => {
	return { type : 'CHANGE-TASK-STATUS', id, isDone, todolistId }
}
export const changeTaskTitleAC = ( id : string, title : string, todolistId : string ) : ChangeTaskTitlesActionType => {
	return { type : 'CHANGE-TASK-TITLE', id, title, todolistId }
}
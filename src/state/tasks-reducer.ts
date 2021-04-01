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

export type ActionType = RemoveTaskActionType | AddTaskActionType


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
			const newTask = { id : v1 (), title : action.title, isDone : false };
			const tasks = state[ action.todolistId ];
			stateCopy[ action.todolistId ] = [newTask, ...tasks];
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

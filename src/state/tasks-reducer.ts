import { TaskStateType } from "../App";

type RemoveTaskActionType = {
	type : 'REMOVE-TASK'
	id: string
	todolistId: string
}
type SomeActionCreator2ActionType = {
	type : ''
}

export type ActionType = RemoveTaskActionType | SomeActionCreator2ActionType


export const tasksReducer = ( state : TaskStateType, action : ActionType ) : TaskStateType => {
	switch (action.type) {
		case 'REMOVE-TASK':
			// делаем копию state, далее ее будем изменять и возвращать
			const stateCopy = {...state};
			// достаём массив тасок из копии стейта по ID тудулиста который приходит к нам из action
			const tasks = state[action.todolistId];
			// получаем отфильтрованные таски
			const filteredTasks = tasks.filter(task => task.id !== action.id);
			// записываем отфильтрованные таски в stateCopy
			stateCopy[action.todolistId] = filteredTasks;
			return stateCopy
		case '':
			return state
		default:
			throw new Error ( 'I dont understand this type' )
	}
}

export const removeTaskAC = (id: string, todolistId: string) : RemoveTaskActionType => {
	return { type : 'REMOVE-TASK', id, todolistId }
}
export const Some2AC = () : SomeActionCreator2ActionType => {
	return { type : '' }
}

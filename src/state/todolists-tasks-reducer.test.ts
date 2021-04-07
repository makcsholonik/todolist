import { addTodolistAC, todolistsReducer } from "./todolists-reducer";
import { tasksReducer } from "./tasks-reducer";
import { TaskStateType, TodolistType } from "../App";

test('ids should be equals', () => {
	const startTasksState: TaskStateType = {};
	const startTodolistsState: Array<TodolistType> = [];

	const action = addTodolistAC("new todolist");

	const endTasksState = tasksReducer(startTasksState, action)
	const endTodolistsState = todolistsReducer(startTodolistsState, action)

	const keys = Object.keys(endTasksState);
	const idFromTasks = keys[0];
	const idFromTodolists = endTodolistsState[0].id;

	expect(idFromTasks).toBe(action.id);
	expect(idFromTodolists).toBe(action.id);
});
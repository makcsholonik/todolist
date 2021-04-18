import { todolistsReducer } from "./todolists-reducer";
import { tasksReducer } from "./tasks-reducer";
import { combineReducers, createStore } from "redux";

// объденяем все редьюсеры (rootReducer)
const rootReducer = combineReducers({
	todolist: todolistsReducer,
	tasks: tasksReducer
})

// типизация rootReducer
export type AppRootStateType = ReturnType<typeof rootReducer>

// создыёт store
export const store = createStore(rootReducer);

// @ts-ignore
// разрешает пользоваться store из консоли в браузере
window.store = store;

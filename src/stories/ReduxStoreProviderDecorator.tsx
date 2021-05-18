import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { tasksReducer } from '../state/tasks-reducer';
import { todolistsReducer } from '../state/todolists-reducer';
import { v1 } from 'uuid';
import { TaskPriority, TaskStatus } from '../api/todolists-api';

const rootReducer = combineReducers ( {
	tasks : tasksReducer,
	todolists : todolistsReducer
} )

const initialGlobalState  = {
	todolists : [
		{
			id : "todolistId1", title : "What to learn", filter : "all", addedDate : '',
			order : '0'
		},
		{
			id : "todolistId2", title : "What to buy", filter : "all", addedDate : '',
			order : '0'
		}
	],
	tasks : {
		[ "todolistId1" ] : [
			{
				id : v1 (),
				title : "HTML&CSS",
				status : TaskStatus.Completed,
				todoListId : 'todolistId1',
				description : '',
				startDate : '',
				deadline : '',
				addedDate : '',
				order : 0,
				priority : TaskPriority.Low,
				completed : false
			},
			{
				id : v1 (),
				title : "JS",
				status : TaskStatus.Completed,
				todoListId : 'todolistId1',
				description : '',
				startDate : '',
				deadline : '',
				addedDate : '',
				order : 0,
				priority : TaskPriority.Low,
				completed : false
			}
		],
		[ "todolistId2" ] : [
			{
				id : v1 (),
				title : "Milk",
				status : TaskStatus.Completed,
				todoListId : 'todolistId2',
				description : '',
				startDate : '',
				deadline : '',
				addedDate : '',
				order : 0,
				priority : TaskPriority.Low,
				completed : false
			},
			{
				id : v1 (),
				title : "React Book",
				status : TaskStatus.Completed,
				todoListId : 'todolistId2',
				description : '',
				startDate : '',
				deadline : '',
				addedDate : '',
				order : 0,
				priority : TaskPriority.Low,
				completed : false
			}
		]
	}
};

// export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);
export const storyBookStore = createStore ( rootReducer );

export const ReduxStoreProviderDecorator = ( storyFn : any ) => (
	<Provider
		store={ storyBookStore }>{ storyFn () }
	</Provider>)


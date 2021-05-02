import React, { useCallback } from 'react';
import './App.css';
import { AddItemForm } from "./AddItemForm";
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC
} from "./state/todolists-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { TasksType, Todolist } from './Todolist';


export type FilteredType = "all" | "active" | "completed";
export type TodolistType = {
	id : string
	title : string
	filter : FilteredType
}
export type TaskStateType = {
	[ key : string ] : Array<TasksType>
}


export const AppWithRedux = React.memo ( function () {

	const todolists = useSelector<AppRootStateType, Array<TodolistType>> ( state => state.todolist );
	const tasks = useSelector<AppRootStateType, TaskStateType> ( state => state.tasks );
	const dispatch = useDispatch ();

	const removeTask = useCallback ( ( id : string, todolistId : string ) => {
		const action = removeTaskAC ( id, todolistId );
		dispatch ( action );
	}, [dispatch] );
	const addTask = useCallback ( ( title : string, todolistId : string ) => {
		const action = addTaskAC ( title, todolistId );
		dispatch ( action );
	}, [dispatch] );
	const changeTaskStatus = useCallback ( ( id : string, isDone : boolean, todolistId : string ) => {
		const action = changeTaskStatusAC ( id, isDone, todolistId );
		dispatch ( action );
	}, [dispatch] );
	const changeTaskTitle = useCallback ( ( id : string, newTitle : string, todolistId : string ) => {
		const action = changeTaskTitleAC ( id, newTitle, todolistId );
		dispatch ( action );
	}, [dispatch] );
	const removeTodolist = useCallback ( ( id : string ) => {
		const action = removeTodolistAC ( id );
		dispatch ( action );
	}, [dispatch] );
	const addTodolist = useCallback ( ( title : string ) => {
		const action = addTodolistAC ( title );
		dispatch ( action );
	}, [dispatch] );
	const changeTodolistTitle = useCallback ( ( id : string, title : string ) => {
		const action = changeTodolistTitleAC ( id, title );
		dispatch ( action );
	}, [dispatch] );
	const changeTodolistFilter = useCallback ( ( id : string, filter : FilteredType ) => {
		const action = changeTodolistFilterAC ( id, filter );
		dispatch ( action );
	}, [dispatch] );

	return (
		<div className="App">
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<Menu/>
					</IconButton>
					<Typography variant="h6">
						News
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container style={ { padding : "20px 0" } }>
					<AddItemForm addItem={ addTodolist }/>
				</Grid>
				<Grid container spacing={ 2 }>
					{
						todolists.map ( tl => {
							let tasksForTodolist = tasks[ tl.id ];

							return (
								<Grid item key={ tl.id }>
									<Paper style={ { padding : "10px" } }>
										<Todolist
											key={ tl.id }
											id={ tl.id }
											title={ tl.title }
											tasks={ tasksForTodolist }
											removeTask={ removeTask }
											changeTodolistFilter={ changeTodolistFilter }
											addTask={ addTask }
											changeTaskStatus={ changeTaskStatus }
											changeTaskTitle={ changeTaskTitle }
											filter={ tl.filter }
											removeTodolist={ removeTodolist }
											changeTodolistTitle={ changeTodolistTitle }
										/>
									</Paper>
								</Grid>
							)
						} )
					}
				</Grid>
			</Container>
		</div>
	);
} );

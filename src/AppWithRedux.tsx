import React from 'react';
import './App.css';
import { TasksType, Todolist } from "./Todolist";
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
import { AppRootState } from "./state/store";

export type FilteredType = "all" | "active" | "completed";
export type TodolistType = {
	id : string
	title : string
	filter : FilteredType
}
export type TaskStateType = {
	[ key : string ] : Array<TasksType>
}

export function AppWithRedux () {

	const dispatch = useDispatch ();

	const todolists = useSelector<AppRootState, Array<TodolistType>> ( state => state.todolist );
	const tasks = useSelector<AppRootState, TaskStateType> ( state => state.tasks );

	function removeTask ( id : string, todolistId : string ) {
		const action = removeTaskAC ( id, todolistId );
		dispatch ( action );
	}
	function addTask ( title : string, todolistId : string ) {
		const action = addTaskAC ( title, todolistId );
		dispatch ( action );
	}
	function changeTaskStatus ( id : string, isDone : boolean, todolistId : string ) {
		const action = changeTaskStatusAC ( id, isDone, todolistId );
		dispatch ( action );
	}
	function changeTaskTitle ( id : string, newTitle : string, todolistId : string ) {
		const action = changeTaskTitleAC ( id, newTitle, todolistId );
		dispatch ( action );
	}

	function removeTodolist ( id : string ) {
		const action = removeTodolistAC ( id );
		dispatch ( action );
	}
	function addTodolist ( title : string ) {
		const action = addTodolistAC ( title );
		dispatch ( action );
	}
	function changeTodolistTitle ( id : string, title : string ) {
		const action = changeTodolistTitleAC ( id, title );
		dispatch ( action );
	}
	function changeTodolistFilter ( id : string, filter : FilteredType ) {
		const action = changeTodolistFilterAC ( id, filter );
		dispatch ( action );
	}

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
							let allTodolistTasks = tasks[ tl.id ]
							let tasksForTodolist = allTodolistTasks;
							if (tl.filter === "completed") {
								tasksForTodolist = allTodolistTasks.filter ( t => t.isDone );
							}
							if (tl.filter === "active") {
								tasksForTodolist = allTodolistTasks.filter ( t => !t.isDone );
							}
							return (
								<Grid item>
									<Paper style={ { padding : "10px" } }>
										<Todolist
											key={ tl.id } // обязательно при .map
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
}


import React, { useReducer } from 'react';
import './App.css';
import { TasksType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	todolistsReducer
} from "./state/todolists-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./state/tasks-reducer";

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

	const todolistId1 = v1 ();
	const todolistId2 = v1 ();

	// массив тудулистов
	const [todolists, dispatchToTodolists] = useReducer ( todolistsReducer, [
		{ id : todolistId1, title : "What to learn", filter : "all" },
		{ id : todolistId2, title : "What to bye", filter : "all" },
	] )
	// ассоциативный массив
	const [tasks, dispatchToTasks] = useReducer ( tasksReducer, {
		[ todolistId1 ] : [
			{ id : v1 (), title : "HTML", isDone : true },
			{ id : v1 (), title : "CSS", isDone : false },
			{ id : v1 (), title : "JavaScript", isDone : false },
		],
		[ todolistId2 ] : [
			{ id : v1 (), title : "Book", isDone : true },
			{ id : v1 (), title : "Pen", isDone : false },
			{ id : v1 (), title : "Notebook", isDone : false },
		],
	} )

	function removeTask ( id : string, todolistId : string ) {
		const action = removeTaskAC ( id, todolistId );
		dispatchToTasks ( action );
	}
	function addTask ( title : string, todolistId : string ) {
		const action = addTaskAC ( title, todolistId );
		dispatchToTasks ( action );
	}
	function changeTaskStatus ( id : string, isDone : boolean, todolistId : string ) {
		const action = changeTaskStatusAC ( id, isDone, todolistId );
		dispatchToTasks ( action );
	}
	function changeTaskTitle ( id : string, newTitle : string, todolistId : string ) {
		const action = changeTaskTitleAC ( id, newTitle, todolistId );
		dispatchToTasks ( action );
	}

	function removeTodolist ( id : string ) {
		const action = removeTodolistAC ( id );
		dispatchToTodolists ( action );
	}
	function addTodolist ( title : string ) {
		const action = addTodolistAC ( title );
		dispatchToTodolists ( action );
		dispatchToTasks ( action );
	}
	function changeTodolistTitle ( id : string, title : string ) {
		const action = changeTodolistTitleAC ( id, title );
		dispatchToTodolists ( action );
	}
	function changeTodolistFilter ( id : string, filter : FilteredType ) {
		const action = changeTodolistFilterAC ( id, filter );
		dispatchToTodolists ( action );
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


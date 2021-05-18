import React, { useReducer } from 'react';
import './App.css';
import { Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	FilteredType,
	removeTodolistAC,
	todolistsReducer
} from "./state/todolists-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./state/tasks-reducer";
import { TaskPriority, TaskStatus, TaskType } from "./api/todolists-api";

export type TaskStateType = {
	[ key : string ] : Array<TaskType>
}

function AppWithReducer () {

	const todolistId1 = v1 ();
	const todolistId2 = v1 ();

	// массив тудулистов
	const [todolists, dispatchToTodolists] = useReducer ( todolistsReducer, [
		{ id : todolistId1, title : "What to learn", filter : "all", addedDate : '', order : '0' },
		{ id : todolistId2, title : "What to bye", filter : "all", addedDate : '', order : '0' },
	] )
	// ассоциативный массив
	const [tasks, dispatchToTasks] = useReducer ( tasksReducer, {
		[ todolistId1 ] : [
			{
				id : v1 (),
				title : "HTML",
				status : TaskStatus.Completed,
				todoListId : todolistId1,
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
				title : "CSS",
				status : TaskStatus.New,
				todoListId : todolistId1,
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
				title : "JavaScript",
				status : TaskStatus.New,
				todoListId : todolistId1,
				description : '',
				startDate : '',
				deadline : '',
				addedDate : '',
				order : 0,
				priority : TaskPriority.Low,
				completed : false
			},
		],
		[ todolistId2 ] : [
			{
				id : v1 (),
				title : "Book",
				status : TaskStatus.Completed,
				todoListId : todolistId2,
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
				title : "Pen",
				status : TaskStatus.New,
				todoListId : todolistId2,
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
				title : "Notebook",
				status : TaskStatus.Completed,
				todoListId : todolistId2,
				description : '',
				startDate : '',
				deadline : '',
				addedDate : '',
				order : 0,
				priority : TaskPriority.Low,
				completed : false
			},
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
	function changeTaskStatus ( id : string, status : TaskStatus, todolistId : string ) {
		const action = changeTaskStatusAC ( id, status, todolistId );
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
								tasksForTodolist = allTodolistTasks.filter ( t => t.status === TaskStatus.Completed );
							}
							if (tl.filter === "active") {
								tasksForTodolist = allTodolistTasks.filter ( t => t.status === TaskStatus.New );
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


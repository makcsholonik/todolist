import React, { useState } from 'react';
import './App.css';
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { TaskPriority, TaskStatus, TaskType } from "./api/todolists-api";
import { FilteredType, TodolistDomainType } from "./state/todolists-reducer";
import { Todolist } from "./Todolist";


export type TaskStateType = {
	[ key : string ] : Array<TaskType>
}

function App () {

	const todolistId1 = v1 ();
	const todolistId2 = v1 ();
	// массив тудулистов
	const [todolists, setTodolists] = useState<Array<TodolistDomainType>> ( [
		{
			id : todolistId1, title : "What to learn", filter : "all", addedDate : '',
			order : '0'
		},
		{
			id : todolistId2, title : "What to bye", filter : "all", addedDate : '',
			order : '0'
		},
	] )
	// ассоциативный массив
	const [tasks, setTasks] = useState<TaskStateType> ( {
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
		let todolistTasks = tasks[ todolistId ];
		tasks[ todolistId ] = todolistTasks.filter ( t => t.id !== id );
		setTasks ( { ...tasks } );
	}
	function addTask ( title : string, todolistId : string ) {
		let todolistTasks = tasks[ todolistId ];
		let newTask = {
			id : v1 (),
			title : title,
			status : TaskStatus.New,
			todoListId : todolistId,
			description : '',
			startDate : '',
			deadline : '',
			addedDate : '',
			order : 0,
			priority : TaskPriority.Low,
			completed : false
		};
		tasks[ todolistId ] = [newTask, ...todolistTasks];
		setTasks ( { ...tasks } );
	}
	function changeTaskStatus ( id : string, status : TaskStatus, todolistId : string ) {
		// достаём нужный массив по todolistId
		let todolistTasks = tasks[ todolistId ];
		// найдём нужную таску
		let task = todolistTasks.find ( t => t.id === id );
		// изменим таску если она нашлась
		if (task) {
			task.status = status;
		}
		setTasks ( { ...tasks } );
	}
	function changeTaskTitle ( id : string, newTitle : string, todolistId : string ) {
		let todolistTasks = tasks[ todolistId ];
		let task = todolistTasks.find ( t => t.id === id );
		if (task) {
			task.title = newTitle;
		}
		setTasks ( { ...tasks } );
	}

	function removeTodolist ( id : string ) {
		let filteredTodolist = todolists.filter ( tl => tl.id !== id );
		setTodolists ( filteredTodolist );
		delete tasks[ id ];
		setTasks ( { ...tasks } );
	}
	function addTodolist ( title : string ) {
		let todolist : TodolistDomainType = { id : v1 (), filter : "all", title : title, addedDate : '', order : '0' };
		setTodolists ( [todolist, ...todolists] );
		setTasks ( {
			...tasks,
			[ todolist.id ] : []
		} )
	}
	function changeTodolistTitle ( id : string, title : string ) {
		const todolist = todolists.find ( tl => tl.id === id );
		if (todolist) {
			todolist.title = title;
			setTodolists ( [...todolists] );
		}
	}
	function changeTodolistFilter ( id : string, filter : FilteredType ) {
		let todolistFilter = todolists.find ( tl => tl.id === id );
		if (todolistFilter) {
			todolistFilter.filter = filter;
			setTodolists ( [...todolists] );
		}
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
								tasksForTodolist = allTodolistTasks.filter ( t => t.status === TaskStatus.New );
							}
							if (tl.filter === "active") {
								tasksForTodolist = allTodolistTasks.filter ( t => t.status === TaskStatus.Completed );
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


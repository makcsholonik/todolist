import React, { useState } from 'react';
import './App.css';
import { TasksType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { AppBar, Button, Container, IconButton, Toolbar, Typography, Grid, Paper } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

export type FilteredType = "all" | "active" | "completed";
export type TodolistType = {
	id : string
	title : string
	filter : FilteredType
}
export type TaskStateType = {
	[ key : string ] : Array<TasksType>
}

export function App () {

	function removeTask ( id : string, todolistId : string ) {
		let todolistTasks = tasks[ todolistId ];
		tasks[ todolistId ] = todolistTasks.filter ( t => t.id !== id );
		setTasks ( { ...tasks } );
	}

	function addTask ( title : string, todolistId : string ) {
		let todolistTasks = tasks[ todolistId ];
		let newTask = { id:v1 (), title:title, isDone:false };
		tasks[ todolistId ] = [newTask, ...todolistTasks];
		setTasks ( { ...tasks } );
	}

	function changeTaskStatus ( id : string, isDone : boolean, todolistId : string ) {
		// достаём нужный массив по todolistId
		let todolistTasks = tasks[ todolistId ];
		// найдём нужную таску
		let task = todolistTasks.find ( t => t.id === id );
		// изменим таску если она нашлась
		if (task) {
			task.isDone = isDone;
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

	function changeFilter ( value : FilteredType, todolistId : string ) {
		let todolistFilter = todolists.find ( tl => tl.id === todolistId );
		if (todolistFilter) {
			todolistFilter.filter = value;
			setTodolists ( [...todolists] );
		}
	}

	function removeTodolist ( id : string ) {
		let filteredTodolist = todolists.filter ( tl => tl.id !== id );
		setTodolists ( filteredTodolist );
		delete tasks[ id ];
		setTasks ( { ...tasks } );
	}

	function changeTodolistTitle ( id : string, newTitle : string ) {
		const todolist = todolists.find ( tl => tl.id === id );
		if (todolist) {
			todolist.title = newTitle;
			setTodolists ( [...todolists] );
		}
	}

	const todolistId1 = v1 ();
	const todolistId2 = v1 ();

	// массив тудулистов
	const [todolists, setTodolists] = useState<Array<TodolistType>> ( [
		{ id:todolistId1, title:"What to learn", filter:"all" },
		{ id:todolistId2, title:"What to bye", filter:"all" },
	] )

	// ассоциативный массив
	const [tasks, setTasks] = useState<TaskStateType> ( {
		[ todolistId1 ]:[
			{ id:v1 (), title:"HTML", isDone:true },
			{ id:v1 (), title:"CSS", isDone:false },
			{ id:v1 (), title:"JavaScript", isDone:false },
		],
		[ todolistId2 ]:[
			{ id:v1 (), title:"Book", isDone:true },
			{ id:v1 (), title:"Pen", isDone:false },
			{ id:v1 (), title:"Notebook", isDone:false },
		],
	} )

	function addTodolist ( title : string ) {
		let todolist : TodolistType = { id:v1 (), filter:"all", title:title };
		setTodolists ( [todolist, ...todolists] );
		setTasks ( {
			...tasks,
			[ todolist.id ]:[]
		} )
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
				<Grid container style={ { padding:"20px 0" } }>
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
									<Paper style={ { padding:"10px" } }>
										<Todolist
											key={ tl.id } // обязательно при .map
											id={ tl.id }
											title={ tl.title }
											tasks={ tasksForTodolist }
											removeTask={ removeTask }
											changeFilter={ changeFilter }
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


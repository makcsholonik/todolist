import React, { useCallback } from "react";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Task } from "./Task";
import { TaskStatus, TaskType } from "./api/todolists-api";
import { FilteredType, TodolistDomainType } from "./state/todolists-reducer";

export type TodolistPropsType = {
	id : string
	title : string
	tasks : Array<TaskType>
	changeTodolistFilter : ( todolistId : string, value : FilteredType ) => void
	addTask : ( title : string, todolistId : string ) => void
	filter : FilteredType
	removeTodolist : ( id : string ) => void
	changeTodolistTitle : ( id : string, newTitle : string ) => void
	removeTask : ( id : string, todolistId : string ) => void
	changeTaskStatus : ( id : string, status: TaskStatus, todolistId : string ) => void
	changeTaskTitle : ( id : string, newTitle : string, todolistId : string ) => void
}

export const Todolist = React.memo ( function ( props : TodolistPropsType ) {
	const onAllClickHandler = useCallback ( () => {props.changeTodolistFilter ( props.id, "all" )}, [props.changeTodolistFilter, props.id] );
	const onActiveClickHandler = useCallback ( () => {props.changeTodolistFilter ( props.id, "active", )}, [props.changeTodolistFilter, props.id] );
	const onCompletedClickHandler = useCallback ( () => {props.changeTodolistFilter ( props.id, "completed", )}, [props.changeTodolistFilter, props.id] );

	const removeTodolist = () => {props.removeTodolist ( props.id )};
	const changeTodolistTitle = useCallback ( ( newTitle : string ) => {props.changeTodolistTitle ( props.id, newTitle )}, [props.changeTodolistTitle, props.id] );
	const addItem = useCallback ( ( title : string ) => {
		props.addTask ( title, props.id );
	}, [props.addTask, props.id] );

	let tasksForTodolist = props.tasks;
	if (props.filter === "completed") {
		tasksForTodolist = props.tasks.filter ( t => t.status === TaskStatus.New );
	}
	if (props.filter === "active") {
		tasksForTodolist = props.tasks.filter ( t => t.status === TaskStatus.Completed );
	}

	return (
		<div>
			<h3>
				<EditableSpan title={ props.title } onChange={ changeTodolistTitle }/>
				<IconButton onClick={ removeTodolist }>
					<Delete/>
				</IconButton>
			</h3>
			<AddItemForm addItem={ addItem }/>
			<ul>
				{
					tasksForTodolist.map ( t => <Task
						key={ t.id }
						task={ t }
						changeTaskStatus={ props.changeTaskStatus }
						changeTaskTitle={ props.changeTaskTitle }
						todolistId={ props.id }
						removeTask={ props.removeTask }
					/> )
				}
			</ul>
			<div>
				<Button variant={ props.filter === "all" ? "outlined" : "text" }
						  onClick={ onAllClickHandler }
						  color="primary"
				>All
				</Button>
				<Button variant={ props.filter === "active" ? "outlined" : "text" }
						  onClick={ onActiveClickHandler }
						  color="primary"
				>Active
				</Button>
				<Button variant={ props.filter === "completed" ? "outlined" : "text" }
						  onClick={ onCompletedClickHandler }
						  color="primary"
				>Completed
				</Button>
			</div>
		</div>
	);
} );

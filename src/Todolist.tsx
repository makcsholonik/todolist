import React, { ChangeEvent, useCallback } from "react";
import { FilteredType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, IconButton, Checkbox } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

export type TasksType = {
	id : string
	title : string
	isDone : boolean
}
export type TodolistType = {
	id : string
	title : string
	tasks : Array<TasksType>
	removeTask : ( id : string, todolistId : string ) => void
	changeTodolistFilter : ( todolistId : string, value : FilteredType ) => void
	addTask : ( title : string, todolistId : string ) => void
	changeTaskStatus : ( id : string, isDone : boolean, todolistId : string ) => void
	changeTaskTitle : ( id : string, newTitle : string, todolistId : string ) => void
	filter : FilteredType
	removeTodolist : ( id : string ) => void
	changeTodolistTitle : ( id : string, newTitle : string ) => void
}

export const Todolist = React.memo(function ( props : TodolistType )  {
	console.log ("Todolist called");
	const onAllClickHandler = () => {props.changeTodolistFilter ( props.id, "all" )};
	const onActiveClickHandler = () => {props.changeTodolistFilter ( props.id, "active", )};
	const onCompletedClickHandler = () => {props.changeTodolistFilter ( props.id, "completed", )};
	const removeTodolist = () => {props.removeTodolist ( props.id )};
	const changeTodolistTitle = ( newTitle : string ) => {props.changeTodolistTitle ( props.id, newTitle )};
	const addItem = useCallback( ( title : string ) => {
		props.addTask ( title, props.id );
	}, []);

	if (props.filter === "completed") {
		tasksForTodolist = props.tasks.filter ( t => t.isDone );
	}
	if (props.filter === "active") {
		tasksForTodolist = props.tasks.filter ( t => !t.isDone );
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
					props.tasks.map ( t => {
						const onRemoveHandler = () => {
							props.removeTask ( t.id, props.id )
						};
						const onChangeHandler = ( e : ChangeEvent<HTMLInputElement> ) => {
							props.changeTaskStatus ( t.id, e.currentTarget.checked, props.id )
						};
						const onChangeTitleHandler = ( newTitle : string ) => {
							props.changeTaskTitle ( t.id, newTitle, props.id );
						};
						return (
							<li key={ t.id } className={ t.isDone ? "is-done" : "" }>
								<Checkbox
									color="primary"
									checked={ t.isDone }
									onChange={ onChangeHandler }
								/>
								<EditableSpan title={ t.title } onChange={ onChangeTitleHandler }/>
								<button onClick={ onRemoveHandler }>X
								</button>
							</li>
						)
					} )
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
})


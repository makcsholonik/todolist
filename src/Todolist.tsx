import React, { ChangeEvent } from "react";
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
	changeFilter : ( value : FilteredType, todolistId : string ) => void
	addTask : ( title : string, todolistId : string ) => void
	changeTaskStatus : ( id : string, isDone : boolean, todolistId : string ) => void
	changeTaskTitle : ( id : string, newTitle : string, todolistId : string ) => void
	filter : FilteredType
	removeTodolist : ( id : string ) => void
	changeTodolistTitle : ( id : string, newTitle : string ) => void
}

export function Todolist ( props : TodolistType ) {

	const onAllClickHandler = () => {props.changeFilter ( "all", props.id )};
	const onActiveClickHandler = () => {props.changeFilter ( "active", props.id )};
	const onCompletedClickHandler = () => {props.changeFilter ( "completed", props.id )};
	const removeTodolist = () => {props.removeTodolist ( props.id )};
	const changeTodolistTitle = ( newTitle : string ) => {props.changeTodolistTitle ( props.id, newTitle )};

	// создаём обёртку и передаём её дальше в компонетну <AddItemForm>
	const addItem = ( title : string ) => {
		props.addTask ( title, props.id );
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
}


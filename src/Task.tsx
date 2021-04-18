import React, { ChangeEvent } from "react";
import { Checkbox } from "@material-ui/core";
import { EditableSpan } from "./EditableSpan";
import { TasksType } from "./Todolist";

type TaskPropsType = {
	task : TasksType
	todolistId : string
	removeTask : ( id : string, todolistId : string ) => void
	changeTaskStatus : ( id : string, isDone : boolean, todolistId : string ) => void
	changeTaskTitle : ( id : string, newTitle : string, todolistId : string ) => void
}
export const Task = React.memo ( function ( props : TaskPropsType ) {
	const onRemoveHandler = () => {
		props.removeTask ( props.task.id, props.todolistId )
	};
	const onChangeHandler = ( e : ChangeEvent<HTMLInputElement> ) => {
		props.changeTaskStatus ( props.task.id, e.currentTarget.checked, props.todolistId )
	};
	const onChangeTitleHandler = ( newTitle : string ) => {
		props.changeTaskTitle ( props.task.id, newTitle, props.todolistId );
	};
	return (
		<li key={ props.task.id } className={ props.task.isDone ? "is-done" : "" }>
			<Checkbox
				color="primary"
				checked={ props.task.isDone }
				onChange={ onChangeHandler }
			/>
			<EditableSpan title={ props.task.title } onChange={ onChangeTitleHandler }/>
			<button onClick={ onRemoveHandler }>X
			</button>
		</li>
	)
} );
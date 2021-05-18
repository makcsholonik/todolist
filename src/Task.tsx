import React, { ChangeEvent, useCallback } from "react";
import { Checkbox } from "@material-ui/core";
import { EditableSpan } from "./EditableSpan";
import { TaskStatus, TaskType } from "./api/todolists-api";

type TaskPropsType = {
	task : TaskType
	todolistId : string
	removeTask : ( id : string, todolistId : string ) => void
	changeTaskStatus : ( id : string, status : TaskStatus, todolistId : string ) => void
	changeTaskTitle : ( id : string, newTitle : string, todolistId : string ) => void
}
export const Task = React.memo ( function ( props : TaskPropsType ) {
	const onRemoveHandler = () => {
		props.removeTask ( props.task.id, props.todolistId )
	};
	const onChangeHandler = ( e : ChangeEvent<HTMLInputElement> ) => {
		let newIsDoneValue = e.currentTarget.checked
		props.changeTaskStatus ( props.task.id, newIsDoneValue ? TaskStatus.Completed : TaskStatus.New, props.todolistId )
	};
	const onChangeTitleHandler = useCallback ( ( newTitle : string ) => {
		props.changeTaskTitle ( props.task.id, newTitle, props.todolistId );
	}, [props.changeTaskTitle, props.task.id, props.todolistId] );

	return (
		<li key={ props.task.id } className={ props.task.status === TaskStatus.Completed ? "is-done" : "" }>
			<Checkbox
				color="primary"
				checked={ props.task.status === TaskStatus.Completed}
				onChange={ onChangeHandler }
			/>
			<EditableSpan title={ props.task.title } onChange={ onChangeTitleHandler }/>
			<button
				onClick={ onRemoveHandler }>
				X
			</button>
		</li>
	)
} );
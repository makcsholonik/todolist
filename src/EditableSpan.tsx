import React, { ChangeEvent, useState } from "react";

type EditableSpanType = {
	title : string
	onChange : ( newTitle : string ) => void
}

export function EditableSpan ( props : EditableSpanType ) {

	let [editMode, setEditMode] = useState ( false );
	let [title, setTitle] = useState ( "" );

	const activeEditMode = () => {
		setEditMode ( true );
		setTitle ( props.title )
	}
	const activeViewMode = () => {
		setEditMode ( false );
		props.onChange ( title )
	}
	const onChangeTitleHandler = ( e : ChangeEvent<HTMLInputElement> ) => setTitle ( e.currentTarget.value );

	return (
		editMode
			? <input onBlur={ activeViewMode } onChange={ onChangeTitleHandler } value={ title } autoFocus/>
			: <span onDoubleClick={ activeEditMode }>{ props.title }</span>
	)
}
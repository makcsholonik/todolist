import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button, IconButton, TextField } from "@material-ui/core";
import { AddBox } from "@material-ui/icons";

type PropsType = {
	addItem : ( title : string ) => void
}

export function AddItemForm ( props : PropsType ) {

	const [title, setTitle] = useState ( "" );
	const [error, setError] = useState<string | null> ( null )

	const onNewTitleChangeHandler = ( e : ChangeEvent<HTMLInputElement> ) => {
		setTitle ( e.currentTarget.value )
	};
	const onKeyPressHandler = ( e : KeyboardEvent<HTMLInputElement> ) => {
		setError ( null );
		if (e.charCode === 13) {
			addTask ();
		}
	};
	const addTask = () => {
		if (title.trim () !== "") {
			props.addItem ( title.trim () );
			setTitle ( "" );
		} else {
			setError ( "Title is required" )
		}
	};

	return (
		<div>
			<TextField
				variant="standard"
				value={ title }
				onChange={ onNewTitleChangeHandler }
				onKeyPress={ onKeyPressHandler }
				error={!!error}
				label="Title"
				helperText={error}
			/>
			<IconButton color="primary" onClick={addTask}>
				<AddBox/>
			</IconButton>
		</div>
	)
}



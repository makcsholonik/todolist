import { Task } from "./Task";
import React from "react";
import { action } from "@storybook/addon-actions";


export default {
	title : "Task stories",
	component : Task
};

const changeTaskStatusCallback = action ( "task changed" );
const changeTaskTitleCallback = action ( "title changed" );
const removeTaskCallback = action ( "task removed" );

export const TaskBaseExample = () => {
	return (
		<>
			<Task
				task={ { id : '1', isDone : true, title : 'react' } }
				changeTaskStatus={ changeTaskStatusCallback }
				changeTaskTitle={ changeTaskTitleCallback }
				todolistId={ 'todolistID1' }
				removeTask={ removeTaskCallback }
			/>
			<Task
				task={ { id : '2', isDone : false, title : 'redux' } }
				changeTaskStatus={ changeTaskStatusCallback }
				changeTaskTitle={ changeTaskTitleCallback }
				todolistId={ 'todolistID2' }
				removeTask={ removeTaskCallback }
			/>
		</>
	)
}

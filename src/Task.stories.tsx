import { Task } from "./Task";
import React from "react";
import { action } from "@storybook/addon-actions";
import { TaskPriority, TaskStatus } from "./api/todolists-api";


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
				task={ {
					id : '1',
					status : TaskStatus.New,
					title : 'react',
					todoListId : 'todolistId',
					description : '',
					startDate : '',
					deadline : '',
					addedDate : '',
					order : 0,
					priority : TaskPriority.Low,
					completed : false
				} }
				changeTaskStatus={ changeTaskStatusCallback }
				changeTaskTitle={ changeTaskTitleCallback }
				todolistId={ 'todolistID1' }
				removeTask={ removeTaskCallback }
			/>
			<Task
				task={ {
					id : '2',
					status : TaskStatus.New,
					title : 'redux',
					todoListId : 'todolistId',
					description : '',
					startDate : '',
					deadline : '',
					addedDate : '',
					order : 0,
					priority : TaskPriority.Low,
					completed : false
				} }
				changeTaskStatus={ changeTaskStatusCallback }
				changeTaskTitle={ changeTaskTitleCallback }
				todolistId={ 'todolistID2' }
				removeTask={ removeTaskCallback }
			/>
		</>
	)
}

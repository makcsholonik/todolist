import React, { useEffect, useState } from 'react';
import { tasksAPI, todolistAPI } from "../api/todolists-api";

export default {
	title : 'API'
};

const settings = {
	withCredentials : true, // * залогинен
	headers : {
		"API-KEY" : "f0cc0942-0306-4a5b-86b9-c3852c7f7cf3"
	}
};
export const GetTodolists = () => {
	const [state, setState] = useState<any> ( null );
	useEffect ( () => {
		// здесь мы будем делать запрос и ответ закидывать в стейт.
		// который в виде строки будем отображать в div-ке
		/*		let promise = axios.get ( "https://social-network.samuraijs.com/api/1.1/todo-lists", settings );
				promise.then ( (res) => {
					setState(res.data)
				} )*/
		/*		axios.get ( "https://social-network.samuraijs.com/api/1.1/todo-lists", settings )*/
		todolistAPI.getTodolist ().then ( ( res ) => {
			setState ( res.data );
		} );
	}, [] );
	return <div> { JSON.stringify ( state ) }</div>;
};
// * axios сделай get запрос (указываем адрес), также передаём настройки
// * запрос нам возращает promise и далее мы попадаем в promise.then
// * в get запросе 2 параметра - URL и settings
// * при get запросе API-KEY не обазателен

export const CreateTodolist = () => {
	const [state, setState] = useState<any> ( null );
	const [todolistTitle, setTodolistTitle] = useState<string> ( "" );
	const createTodolist = () => {
		todolistAPI.createTodolist ( todolistTitle ).then ( ( res ) => {
			setState ( res.data );
		} );
	};
	return (
		<div> { JSON.stringify ( state ) }
			<div>
				<input
					placeholder={ "todolist title" }
					value={ todolistTitle }
					onChange={ ( e ) => {setTodolistTitle ( e.currentTarget.value );} }/>
				<button onClick={ createTodolist }>create todolist</button>
			</div>
		</div>
	);
};
// * в post запросе 3 параметра - URL, payload и settings
// * при get запросе API-KEY - ОБЯЗАТЕЛЕН

export const DeleteTodolist = () => {
	const [state, setState] = useState<any> ( null );
	const [todolistId, setTodolistId] = useState<string> ( "" );
	const deleteTodolist = () => {
		todolistAPI.deleteTodolist ( todolistId ).then ( ( res ) => {
			setState ( res.data );
		} );
	};
	return (
		<div> { JSON.stringify ( state ) }
			<div>
				<input
					placeholder={ "todolist id" }
					value={ todolistId }
					onChange={ ( e ) => {setTodolistId ( e.currentTarget.value );} }/>
				<button onClick={ deleteTodolist }>delete todolist</button>
			</div>
		</div>
	);
};

export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any> ( null );
	const [todolistNewTitle, setTodolistNewTitle] = useState<string> ( "" );
	const [todolistId, setTodolistId] = useState<string> ( "" );
	const updateTodolist = () => {
		todolistAPI.updateTodolist ( todolistId, todolistNewTitle ).then ( ( res ) => {
			setState ( res.data );
		} );
	};
	return (
		<div> { JSON.stringify ( state ) }
			<div>
				<input
					placeholder={ "todolist id" }
					value={ todolistId }
					onChange={ ( e ) => {setTodolistId ( e.currentTarget.value );} }/>
				<input
					placeholder={ "new todolist title" }
					value={ todolistNewTitle }
					onChange={ ( e ) => {setTodolistNewTitle ( e.currentTarget.value );} }/>
				<button onClick={ updateTodolist }>update todolist</button>
			</div>
		</div>
	);
};

// TASKS

export const GetTasks = () => {
	const [state, setState] = useState<any> ( null );
	useEffect ( () => {
		const todolistId = "69b0d077-15cd-4d3a-aea6-d5d078beccd5";
		tasksAPI.getTasks ( todolistId ).then ( ( res ) => {
			setState ( res.data );
		} );
	}, [] );
	return <div> { JSON.stringify ( state ) }</div>;
};

export const CreateTask = () => {
	const [state, setState] = useState<any> ( null );
	const [todolistId, setTodolistId] = useState<string> ( "" );
	const createTask = () => {
		tasksAPI.createTask ( todolistId, "new task" ).then ( ( res ) => {
			setState ( res.data );
		} );
	};
	return (
		<div> { JSON.stringify ( state ) }
			<div>
				<input
					placeholder={ "todolist id" }
					value={ todolistId }
					onChange={ ( e ) => {setTodolistId ( e.currentTarget.value );} }/>
				<button onClick={ createTask }>create task</button>
			</div>
		</div>
	);
};

export const DeleteTask = () => {
	const [state, setState] = useState<any> ( null );
	const [todolistId, setTodolistId] = useState<string> ( "" );
	const [taskId, setTaskId] = useState<string> ( "" );
	const deleteTask = () => {
		tasksAPI.deleteTask ( todolistId, taskId ).then ( ( res ) => {
			setState ( res.data );
		} );
	};
	return (
		<div> { JSON.stringify ( state ) }
			<div>
				<input
					placeholder={ "todolist id" }
					value={ todolistId }
					onChange={ ( e ) => {setTodolistId ( e.currentTarget.value );} }/>
				<input
					placeholder={ "task id" }
					value={ taskId }
					onChange={ ( e ) => {setTaskId ( e.currentTarget.value );} }/>
				<button onClick={ deleteTask }>delete task</button>
			</div>
		</div>
	);
};

export const UpdateTask = () => {
	const [state, setState] = useState<any> ( null );
	const [title, setTitle] = useState<string> ( "" );
	const [description, setDescription] = useState<string> ( "" );
	const [status, setStatus] = useState<number> ( 0 );
	const [priority, setPriority] = useState<number> ( 0 );
	const [startDate, setStartDate] = useState<string> ( "" );
	const [deadline, setDeadline] = useState<string> ( "" );
	const [todolistId, setTodolistId] = useState<string> ( "" );
	const [taskId, setTaskId] = useState<string> ( "" );

	useEffect ( () => {

		tasksAPI.updateTask ( todolistId, taskId, {
			deadline : '',
			description : description,
			priority : priority,
			startDate : '',
			status : status,
			title : title
		} ).then ( ( res ) => {
			setState ( res.data );
		} );
	}, [] );
	return <div> { JSON.stringify ( state ) }
		<div>
			<input placeholder={ "todolistId" } value={ todolistId }
					 onChange={ ( e ) => {setTodolistId ( e.currentTarget.value );} }/>
			<input placeholder={ "taskId" } value={ taskId } onChange={ ( e ) => {setTaskId ( e.currentTarget.value );} }/>
			<input placeholder={ "title" } value={ title } onChange={ ( e ) => {setTitle ( e.currentTarget.value );} }/>
			<input placeholder={ "description" } value={ description }
					 onChange={ ( e ) => {setDescription ( e.currentTarget.value );} }/>
			<input placeholder={ "status" } value={ status } onChange={ ( e ) => {setStatus ( +e.currentTarget.value );} }/>
			<input placeholder={ "priority" } value={ priority }
					 onChange={ ( e ) => {setPriority ( +e.currentTarget.value );} }/>
			<input placeholder={ "startDate" } value={ startDate }
					 onChange={ ( e ) => {setStartDate ( e.currentTarget.value );} }/>
			<input placeholder={ "deadline" } value={ deadline }
					 onChange={ ( e ) => {setDeadline ( e.currentTarget.value );} }/>
		</div>
	</div>;
};
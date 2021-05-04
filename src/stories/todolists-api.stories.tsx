import React, { useEffect, useState } from 'react'
import { tasksAPI, todolistAPI } from "../api/todolists-api";

export default {
	title : 'API'
}

const settings = {
	withCredentials : true, // * залогинен
	headers : {
		"API-KEY" : "f0cc0942-0306-4a5b-86b9-c3852c7f7cf3"
	}
}
export const GetTodolists = () => {
	const [state, setState] = useState<any> ( null )
	useEffect ( () => {
		// здесь мы будем делать запрос и ответ закидывать в стейт.
		// который в виде строки будем отображать в div-ке
		/*		let promise = axios.get ( "https://social-network.samuraijs.com/api/1.1/todo-lists", settings );
				promise.then ( (res) => {
					setState(res.data)
				} )*/
		/*		axios.get ( "https://social-network.samuraijs.com/api/1.1/todo-lists", settings )*/
		todolistAPI.getTodolist ().then ( ( res ) => {
			setState ( res.data )
		} )
	}, [] )
	return <div> { JSON.stringify ( state ) }</div>
}
// * axios сделай get запрос (указываем адрес), также передаём настройки
// * запрос нам возращает promise и далее мы попадаем в promise.then
// * в get запросе 2 параметра - URL и settings
// * при get запросе API-KEY не обазателен

export const CreateTodolist = () => {
	const [state, setState] = useState<any> ( null )
	const [todolistTitle, setTodolistTitle] = useState<string> ( "" )
	const createTodolist = () => {
		todolistAPI.createTodolist ( todolistTitle ).then ( ( res ) => {
			setState ( res.data )
		} )
	}
	return (
		<div> { JSON.stringify ( state ) }
			<div>
				<input
					placeholder={ "todolist title" }
					value={ todolistTitle }
					onChange={ ( e ) => {setTodolistTitle ( e.currentTarget.value )} }/>
				<button onClick={ createTodolist }>create todolist</button>
			</div>
		</div>
	)
}
// * в post запросе 3 параметра - URL, payload и settings
// * при get запросе API-KEY - ОБЯЗАТЕЛЕН

export const DeleteTodolist = () => {
	const [state, setState] = useState<any> ( null )
	const [todolistId, setTodolistId] = useState<string> ( "" )
	const deleteTodolist = () => {
		todolistAPI.deleteTodolist ( todolistId ).then ( ( res ) => {
			setState ( res.data )
		} )
	}
	return (
		<div> { JSON.stringify ( state ) }
			<div>
				<input
					placeholder={ "todolist id" }
					value={ todolistId }
					onChange={ ( e ) => {setTodolistId ( e.currentTarget.value )} }/>
				<button onClick={ deleteTodolist }>delete todolist</button>
			</div>
		</div>
	)
}

export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any> ( null )
	const [todolistNewTitle, setTodolistNewTitle] = useState<string> ( "" )
	const [todolistId, setTodolistId] = useState<string> ( "" )
	const updateTodolist = () => {
		todolistAPI.updateTodolist ( todolistId, todolistNewTitle ).then ( ( res ) => {
			setState ( res.data )
		} )
	}
	return (
		<div> { JSON.stringify ( state ) }
			<div>
				<input
					placeholder={ "todolist id" }
					value={ todolistId }
					onChange={ ( e ) => {setTodolistId ( e.currentTarget.value )} }/>
				<input
					placeholder={ "new todolist title" }
					value={ todolistNewTitle }
					onChange={ ( e ) => {setTodolistNewTitle ( e.currentTarget.value )} }/>
				<button onClick={ updateTodolist }>update todolist</button>
			</div>
		</div>
	)
}

// TASKS

export const GetTasks = () => {
	const [state, setState] = useState<any> ( null )
	useEffect ( () => {
		const todolistId = "69b0d077-15cd-4d3a-aea6-d5d078beccd5";
		tasksAPI.getTasks ( todolistId ).then ( ( res ) => {
			setState ( res.data )
		} )
	}, [] )
	return <div> { JSON.stringify ( state ) }</div>
}

export const CreateTask = () => {
	const [state, setState] = useState<any> ( null )
	const [todolistId, setTodolistId] = useState<string> ( "" )
	const createTask = () => {
		tasksAPI.createTasks ( todolistId, "new task" ).then ( ( res ) => {
			setState ( res.data )
		} )
	}
	return (
		<div> { JSON.stringify ( state ) }
			<div>
				<input
					placeholder={ "todolist id" }
					value={ todolistId }
					onChange={ ( e ) => {setTodolistId ( e.currentTarget.value )} }/>
				<button onClick={ createTask }>create task</button>
			</div>
		</div>
	)
}

export const DeleteTask = () => {
	const [state, setState] = useState<any> ( null )
	useEffect ( () => {
		const todolistId = "c4a6efde-7003-49ca-a0a6-bcb7b945401d";
		const taskId = "07045488-d47d-44d3-8e4a-15399ec213d4"
		tasksAPI.deleteTasks ( todolistId, taskId ).then ( ( res ) => {
			setState ( res.data )
		} )
	}, [] )
	return <div> { JSON.stringify ( state ) }</div>
}

// export const UpdateTask = () => {
// 	const [state, setState] = useState<any> ( null )
// 	useEffect ( () => {
// 		const todolistId = "c4a6efde-7003-49ca-a0a6-bcb7b945401d";
// 		const taskId = "22f23e58-7441-46e9-93ce-0862a4226a27"
// 		const model = {
//
//
// 		}
// 		tasksAPI.updateTasks ( todolistId, taskId, model).then ( ( res ) => {
// 			setState ( res.data )
// 		} )
// 	}, [] )
// 	return <div> { JSON.stringify ( state ) }</div>
// }
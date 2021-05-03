import React, { useEffect, useState } from 'react'
import axios from "axios";

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
		axios.get ( "https://social-network.samuraijs.com/api/1.1/todo-lists", settings ).
			then ( ( res ) => {
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
	useEffect ( () => {
		axios.post ( "https://social-network.samuraijs.com/api/1.1/todo-lists", { title : "Max Todolist" }, settings ).
			then ( ( res ) => {
				setState ( res.data )
			} )
	}, [] )
	return <div> { JSON.stringify ( state ) }</div>
}
// * в post запросе 3 параметра - URL, payload и settings
// * при get запросе API-KEY - ОБЯЗАТЕЛЕН

export const DeleteTodolist = () => {
	const [state, setState] = useState<any> ( null )
	useEffect ( () => {
		const todolistId = "todo-lists/3f12fce2-809d-4119-bf9b-368f220b5236";
		axios.delete ( `https://social-network.samuraijs.com/api/1.1/${ todolistId }`, settings ).
			then ( ( res ) => {
				setState ( res.data )
			} )
	}, [] )
	return <div> { JSON.stringify ( state ) }</div>
}

export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any> ( null )
	useEffect ( () => {
		const todolistId = "todo-lists/5ae0baaa-9cbe-409c-8ebb-f21945574cb8";
		axios.put ( `https://social-network.samuraijs.com/api/1.1/${ todolistId }`, { title : "Hello, Max" }, settings ).
			then ( ( res ) => {
				setState ( res.data )
			} )
	}, [] )
	return <div> { JSON.stringify ( state ) }</div>
}

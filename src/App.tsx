import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilteredType = "all" | "active" | "completed";
export type TodolistType = {
	id: string
	title: string
	filter: FilteredType
}

export function App() {

	function removeTask(id: string, todolistId: string) {
		let todolistTasks = tasks[todolistId];
		tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
		setTasks({...tasks});
	}

	function addTask(title: string, todolistId: string) {
		let todolistTasks = tasks[todolistId];
		let newTask = {id: v1(), title: title, isDone: false};
		tasks[todolistId] = [newTask, ...todolistTasks];
		setTasks({...tasks});
	}

	function changeTask(taskId: string, isDone: boolean, todolistId: string) {
		let todolistTasks = tasks[todolistId];
		let task = todolistTasks.find(t => t.id === taskId);
		if (task) {
			task.isDone = isDone;
		}
		setTasks({...tasks});
	}

	function changeFilter(value: FilteredType, todolistId: string) {
		let todolistFilter = todolist.find(tl => tl.id === todolistId);
		if (todolistFilter) {
			todolistFilter.filter = value;
			setTodolist([...todolist]);
		}
	}

	function removeTodolist(todolistId: string) {
		let filteredTodolist = todolist.filter(tl => tl.id !== todolistId);
		setTodolist(filteredTodolist);
		delete tasks[todolistId];
		setTasks({...tasks});
	}

	const todolistId1 = v1();
	const todolistId2 = v1();

	// массив todolist'ов
	const [todolist, setTodolist] = useState<Array<TodolistType>>([
		{id: todolistId1, title: "What to learn", filter: "all"},
		{id: todolistId2, title: "What to bye", filter: "all"},
	])

	const [tasks, setTasks] = useState({
		[todolistId1]: [
			{id: v1(), title: "HTML", isDone: true},
			{id: v1(), title: "CSS", isDone: false},
			{id: v1(), title: "JavaScript", isDone: false},
		],
		[todolistId2]: [
			{id: v1(), title: "Book", isDone: true},
			{id: v1(), title: "Pencil", isDone: false},
			{id: v1(), title: "Notebook", isDone: false},
		],
	})

	return (
		<div className="App">
			{
				todolist.map(tl => {
					let allTodolistTasks = tasks[tl.id]
					let tasksForTodolist = allTodolistTasks;
					if (tl.filter === "completed") {
						tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
					}
					if (tl.filter === "active") {
						tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
					}
					return (
						<Todolist
							key={tl.id} // обязательно при .map
							id={tl.id}
							title={tl.title}
							tasks={tasksForTodolist}
							removeTask={removeTask}
							changeFilter={changeFilter}
							addTask={addTask}
							changeTask={changeTask}
							filter={tl.filter}
							removeTodolist={removeTodolist}
						/>
					)
				})
			}
		</div>
	);
}


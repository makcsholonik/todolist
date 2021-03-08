import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilteredType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilteredType) => void
    addTask: (title: string) => void
    changeTask: (taskId: string, isDone: boolean) => void
    filter: FilteredType
}


export function Todolist(props: TodolistType) {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.ctrlKey && e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
        }
    };
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle("");
        } else {
            setError("Title is required")
        }
    };
    const onAllClickHandler = () => {
        props.changeFilter("all")
    };
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    };
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    };

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTask(t.id, e.currentTarget.checked)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input
                                    type="checkbox"
                                    checked={t.isDone}
                                    onChange={onChangeHandler}
                                />
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>X
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}
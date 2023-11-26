import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useMemo, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/itemForm/AddItemForm";
import {EditableSpan} from "./components/editableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {ButtonProps, IconButton, Paper} from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import {MyButton} from "./components/myButton/MyButton";
import Task from "./Task";



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    id: string
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    checkedTask: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

export const Todolist = memo((props: PropsType) => {

    console.log('todo')

    let tasksForTodolist = props.tasks;

  useMemo(() => {
      console.log('memo')
        if (props.filter === "active") {
            tasksForTodolist = props.tasks.filter(t => t.isDone === false);
        }
        if (props.filter === "completed") {
            tasksForTodolist = props.tasks.filter(t => t.isDone === true);
        }
        return tasksForTodolist
    }, [props.filter, props.tasks]);



    const addTask = useCallback((title: string) => {
        props.addTask(props.todolistId, title)
    },[props.addTask,props.todolistId])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolistId, "all"),[props.todolistId, props.changeFilter]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolistId, "active"),[props.todolistId,props.changeFilter]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolistId, "completed"),[props.todolistId,props.changeFilter]);

    const removeTodolistHandler = () => {
        props.removeTodoList(props.todolistId)
    }
    const changeTodoListTitle = useCallback((newTitle: string) => props.changeTodolistTitle(props.todolistId, newTitle),[props.changeTodolistTitle,props.todolistId])

    const buttonStyle = {
        color: 'deepPink',
        border: '1px solid pink',
        backgroundColor: 'rgba(231,149,149,0.12)',
    }

    const changeTaskTitle = useCallback((taskId: string,title: string) => {
        props.changeTaskTitle(taskId,props.id, title)},[props.changeTaskTitle,props.id])

    const removeTask = useCallback((taskId: string) => props.removeTask(props.todolistId, taskId),[props.removeTask,props.todolistId])

    const checkedTask = useCallback((taskId: string, newCurrentValue: boolean) => {
        // let newCurrentValue = e.currentTarget.checked
        props.checkedTask(props.id,taskId, newCurrentValue);
    },[ props.checkedTask,props.id])
    const onChangeTaskHandler = (title: string) => {
        // props.changeTaskTitle(props.todolistId, t.title)

    }

    return (
        <div className={'todolistWrapper'}>
                    <div className={'titleHead'}>
                        <h3>
                            <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                            <IconButton onClick={removeTodolistHandler}>
                                <Delete fontSize="small"/>
                            </IconButton>
                            {/*<button onClick={removeTodolistHandler}>X</button>*/}
                        </h3>
                        <AddItemForm addItem={addTask}/>
                    </div>
                    <ul>
                        {
                            tasksForTodolist.map(t => {


                                return <Task
                                    key={t.id}
                                    task={t}
                                    removeTask={removeTask}
                                    checkedTask={checkedTask}
                                    changeTaskTitle={changeTaskTitle}/>
                                // <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                //     <Checkbox
                                //         {...label}
                                //         defaultChecked
                                //         sx={{
                                //             color: pink[800],
                                //             '&.Mui-checked': {
                                //                 color: pink[600],
                                //             },
                                //         }}
                                //         onChange={onChangeHandler}
                                //         checked={t.isDone}
                                //     />
                                //     {/*<input type="checkbox"*/}
                                //     {/*       onChange={onChangeHandler}*/}
                                //     {/*       checked={t.isDone}/>*/}
                                //     <EditableSpan title={t.title} onChange={changeTaskTitle}/>
                                //     <IconButton onClick={onClickHandler}>
                                //         <Delete fontSize="small"/>
                                //     </IconButton>
                                //     {/*<button onClick={onClickHandler}>x</button>*/}
                                // </li>
                            })
                        }
                    </ul>
                    <div>
                        {/*<Button className={props.filter === 'all' ? "active-filter" : ""}*/}
                        {/*        onClick={onAllClickHandler}*/}
                        {/*        style={buttonStyle}*/}
                        {/*        variant={props.filter === 'all' ? "contained" : "outlined"}*/}
                        {/*>All*/}
                        {/*</Button>      */}
                        <MyButton className={props.filter === 'all' ? "active-filter" : ""}
                                  onClick={onAllClickHandler}
                                  style={buttonStyle}
                                  variant={props.filter === 'all' ? "contained" : "outlined"}
                                  title={'All'}
                        >
                        </MyButton>
                        <MyButton className={props.filter === 'active' ? "active-filter" : ""}
                                onClick={onActiveClickHandler}
                                style={buttonStyle}
                                variant={props.filter === 'active' ? "contained" : "outlined"}
                                  title={'Active'}
                        >
                        </MyButton>
                        <MyButton className={props.filter === 'completed' ? "active-filter" : ""}
                                onClick={onCompletedClickHandler}
                                style={buttonStyle}
                                variant={props.filter === 'completed' ? "contained" : "outlined"}
                                  title={'Completed'}
                        >
                        </MyButton>
                    </div>
                </div>
    )
})




//доделать

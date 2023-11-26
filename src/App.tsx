import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todoolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/itemForm/AddItemForm";
import {AppBarForTodoLists} from "./components/appBar/AppBarForTodoLists";
import {Container, Paper} from "@mui/material";
import Grid from '@mui/material/Grid';
import {ChangetodolistTitleAC, RemoveTodolistAC, todoListReducer} from "./state/todolists-reducer";
import {
    AddTaskAC, AddTodoListAC,
    ChangeCheckedTaskAC,
    ChangeFilterAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    tasksReducer
} from "./state/tasksReducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string
    title: string
}
export type TasksType = {
    data: DataType[]
    filter: FilterValuesType
}
type DataType = {
    id: string,
    title: string,
    isDone: boolean
}
export type inTaskType = {
    [key: string]: TasksType
}

  function App()
  {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolists] = useReducer(todoListReducer,[
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolistId1]: {
            data: [
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "React", isDone: false},
                {id: v1(), title: "Angular", isDone: false},
                {id: v1(), title: "Redux", isDone: false}
            ],
            filter: "all"
        },
        [todolistId2]: {
            data: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Tomatoes", isDone: true},
                {id: v1(), title: "Fish", isDone: true},
                {id: v1(), title: "Butter", isDone: true}
            ],
            filter: "all"
        }

  });

    const removeTask = (todolistId: string, tasksId: string) => {
        dispatchTasks(RemoveTaskAC(todolistId,tasksId))

    }
    const addTask = (todolistId: string, title: string) => {
          dispatchTasks(AddTaskAC(todolistId,title))
    }
    const checkedTask = (todolistId: string, taskId: string, checked: boolean) => {
        dispatchTasks(ChangeCheckedTaskAC(todolistId,taskId,checked))
    }
    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        dispatchTasks(ChangeFilterAC(todolistId,filter))
    }
    const removeTodoList = (todolistId: string) => {
        dispatchTodolists(RemoveTodolistAC(todolistId))
        dispatchTasks(RemoveTodolistAC(todolistId))
    }
    const addTodoList = (title: string) => {
        const action = AddTodoListAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchTodolists(ChangetodolistTitleAC(todolistId,title))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchTasks(ChangeTaskTitleAC(todolistId,taskId,title))
    }

    let mappedList = todolists.map(el => {
        return (
            <Grid item>
                <Paper style={{padding: '1px', borderRadius:
                '50px', marginLeft:'10px'}}>
                    <Todolist
                        id={el.id}
                        todolistId={el.id}
                        title={el.title}
                        changeFilter={changeFilter}
                        removeTask={removeTask}
                        tasks={tasks[el.id].data}
                        addTask={addTask}
                        checkedTask={checkedTask}
                        filter={tasks[el.id].filter}
                        removeTodoList={removeTodoList}
                        changeTodolistTitle={changeTodolistTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBarForTodoLists/>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container>
                    {mappedList}
                </Grid>
            </Container>
        </div>
    )
}

export default App;


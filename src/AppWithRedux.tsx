import React, {useCallback, useReducer, useState} from 'react';
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, store} from "./state/store";


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

  function AppWithRedux()
  {

    let todolistId1 = v1();
    let todolistId2 = v1();

  //   let [todolists, dispatchTodolists] = useReducer(todoListReducer,[
  //       {id: todolistId1, title: "What to learn"},
  //       {id: todolistId2, title: "What to buy"}
  //   ])
  //   let [tasks, dispatchTasks] = useReducer(tasksReducer,{
  //       [todolistId1]: {
  //           data: [
  //               {id: v1(), title: "HTML", isDone: true},
  //               {id: v1(), title: "CSS", isDone: true},
  //               {id: v1(), title: "JS", isDone: true},
  //               {id: v1(), title: "React", isDone: false},
  //               {id: v1(), title: "Angular", isDone: false},
  //               {id: v1(), title: "Redux", isDone: false}
  //           ],
  //           filter: "all"
  //       },
  //       [todolistId2]: {
  //           data: [
  //               {id: v1(), title: "Milk", isDone: true},
  //               {id: v1(), title: "Tomatoes", isDone: true},
  //               {id: v1(), title: "Fish", isDone: true},
  //               {id: v1(), title: "Butter", isDone: true}
  //           ],
  //           filter: "all"
  //       }
  //
  // });

      const todolists = useSelector<AppRootStateType,Array<TodolistsType>>(state=> state.todolists)
      const tasks = useSelector<AppRootStateType, inTaskType>(state => state.tasks)
      const dispatch = useDispatch()

    const removeTask = useCallback((todolistId: string, tasksId: string) => {
        dispatch(RemoveTaskAC(todolistId,tasksId))
    },[dispatch])
    const addTask = useCallback((todolistId: string, title: string) => {

          dispatch(AddTaskAC(todolistId,title))
    },[dispatch])
    const checkedTask = useCallback((todolistId: string, taskId: string, checked: boolean) => {
        dispatch(ChangeCheckedTaskAC(todolistId,taskId,checked))
    },[dispatch])
    const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(ChangeFilterAC(todolistId,filter))
    },[dispatch])
    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
        // dispatch(RemoveTodolistAC(todolistId))
    },[dispatch])
    const addTodoList = useCallback((title: string) => {

        const action = AddTodoListAC(title)
        dispatch(action)
    },[dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(ChangetodolistTitleAC(todolistId,title))
    },[dispatch])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(ChangeTaskTitleAC(todolistId,taskId,title))
    },[dispatch])

    let mappedList = todolists.map(el => {
        return (
            <Grid item key={el.id}>
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

export default AppWithRedux;


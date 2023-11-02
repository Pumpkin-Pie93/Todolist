import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todoolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/itemForm/AddItemForm";
import {AppBarForTodoLists} from "./components/appBar/AppBarForTodoLists";
import {Container, Paper} from "@mui/material";
import Grid from '@mui/material/Grid';
import {AddtodolistAC, ChangetodolistTitleAC, RemoveTodolistAC, todoListReducer} from "./state/todolists-reducer";
import {AddTaskAC, ChangeCheckedTaskAC, ChangeFilterAC, RemoveTaskAC, tasksReducer} from "./state/tasksReducer";


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

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();


    // let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    //     {id: todolistId1, title: "What to learn"},
    //     {id: todolistId2, title: "What to buy"}
    // ])

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
        // setTasks({
        //     ...tasks,
        //     [todolistId]: {...tasks[todolistId], data: tasks[todolistId].data.filter(el => el.id !== tasksId)}
        // })
        dispatchTasks(RemoveTaskAC(todolistId,tasksId))

    }
    const addTask = (todolistId: string, title: string) => {
        // let newTask = {id: v1(), title: title, isDone: false};
        // setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: [newTask, ...tasks[todolistId].data]}})
        dispatchTasks(AddTaskAC(todolistId,title))
    }
    const checkedTask = (todolistId: string, taskId: string, checked: boolean) => {
        // let changeCheckedTask = tasks[todolistId].data.find(t => t.id === taskId)
        // if (changeCheckedTask) {
        //     changeCheckedTask.isDone = checked
        //     setTasks({
        //         ...tasks,
        //         [todolistId]: {
        //             ...tasks[todolistId],
        //             data: tasks[todolistId].data.map(
        //                 el => el.id === taskId ? {...el, isDone: checked} : el)
        //         }
        //     })
        // }
        dispatchTasks(ChangeCheckedTaskAC(todolistId,taskId,checked))
    }
    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        // setTasks({...tasks, [todolistId]: {...tasks[todolistId], filter}})
        dispatchTasks(ChangeFilterAC(todolistId,filter))
    }
    const removeTodoList = (todolistId: string) => {
        // setTodolists(todolists.filter(el => el.id !== todolistId))
        dispatchTodolists(RemoveTodolistAC(todolistId))
        delete tasks[todolistId]
    }
    const addTodoList = (title: string) => {
        let newTodoListId = v1()
        dispatchTodolists(AddtodolistAC(title, newTodoListId))

        // let newTodoList: TodolistsType = {id: newTodoListId, title: title}
        // setTasks({
        //     ...tasks,
        //     [newTodoListId]: {data: [], filter: 'all'}
        // })
        // setTodolists([newTodoList, ...todolists])

    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        // setTodolists(todolists.map(el => el.id === todolistId ? {...el, title} : el))
        // console.log(tasks[todolistId].data)
        dispatchTodolists(ChangetodolistTitleAC(todolistId,title))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        // setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: tasks[todolistId].data.map(el => el.id === taskId ? {...el, title} : el)}})
    }

    let mappedList = todolists.map(el => {
        return (
            <Grid item>
                <Paper style={{padding: '1px', borderRadius:
                '50px', marginLeft:'10px'}}>
                    <Todolist
                        key={el.id}
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


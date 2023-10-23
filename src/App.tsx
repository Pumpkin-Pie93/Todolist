import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from "./Todoolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/itemForm/AddItemForm";

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
type inTaskType = {
    [key: string]: TasksType
}

// function TodoList(props: {
//     filter: FilterValuesType,
//     removeTask: (todolistId: string, tasksId: string) => void,
//     checkedTask: (todolistId: string, taskId: string, checked: boolean) => void,
//     todolistId: string,
//     changeFilter: (todolistId: string, filter: FilterValuesType) => void,
//     title: string,
//     tasks: DataType[],
//     addTask: (todolistId: string, title: string) => void
// }) {
//     return null;
// }

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();
    // let todolistId3 = v1();
    // let todolistId4 = v1();
    // let todolistId5 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
        // {id: todolistId3, title: "What to see"},
        // {id: todolistId4, title: "What to see"},
        // {id: todolistId5, title: "What to see"}
    ])
    let [tasks, setTasks] = useState<inTaskType>({
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
        setTasks({
            ...tasks,
            [todolistId]: {...tasks[todolistId], data: tasks[todolistId].data.filter(el => el.id !== tasksId)}
        })
    }
    const addTask = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: [newTask, ...tasks[todolistId].data]}})
    }
    const checkedTask = (todolistId: string, taskId: string, checked: boolean) => {
        let changeCheckedTask = tasks[todolistId].data.find(t => t.id === taskId)
        if (changeCheckedTask) {
            changeCheckedTask.isDone = checked
            setTasks({
                ...tasks,
                [todolistId]: {
                    ...tasks[todolistId],
                    data: tasks[todolistId].data.map(el => el.id === taskId ? {...el, isDone: checked} : el)
                }
            })
        }
    }
    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], filter}})
    }
    const removeTodoList = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTodoList = (title: string) => {
        let newTodoListId = v1()
        let newTodoList: TodolistsType = {id: newTodoListId, title: title}
        setTodolists([newTodoList,...todolists])
        setTasks({...tasks,
        [newTodoList.id]: {data:[], filter: 'all'} })
    }
    // function addTodoList(title: string) {
    //     const newTodoId = v1()
    //     const newTodo: TodolistsType = {
    //         id: newTodoId,
    //         filter: 'all',
    //         title: title
    //     }
    //     setTodolists([...todolists, newTodo])
    //     setTasks({...tasks, [newTodo.id]: []})
    // }


    let mappedList = todolists.map(el => {
        return (
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
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {mappedList}
        </div>
    )
}
export default App;


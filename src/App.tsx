import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from "./Todoolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistsType = {
    id: string
    title: string
}
type TasksType = {
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

function TodoList(props: {
    filter: FilterValuesType,
    removeTask: (todolistId: string, tasksId: string) => void,
    checkedTask: (todolistId: string, taskId: string, checked: boolean) => void,
    todolistId: string,
    changeFilter: (todolistId: string, filter: FilterValuesType) => void,
    title: string,
    tasks: DataType[],
    addTask: (todolistId: string, title: string) => void
}) {
    return null;
}

function App() {
    // const [todolists, setTodolists] = useState<todolistsType[]>([
    //     {id: v1(), title: 'What to lern', filter: 'all'},
    //     {id: v1(), title: 'What to buy', filter: 'all'},
    //    ])
    //
    // const [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: 'HTML&CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'ReactJS', isDone: false},
    //     {id: v1(), title: 'Redux', isDone: false},
    //     {id: v1(), title: 'Angular', isDone: false}
    // ])

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ])
    let [tasks, setTasks] = useState<inTaskType>({
        [todolistId1]: {
            data: [
                {id: v1(), title: "HTML&CSS1111", isDone: true},
                {id: v1(), title: "JS1111", isDone: true}
            ],
            filter: "all"
        },
        [todolistId2]: {
            data: [
                {id: v1(), title: "HTML&CSS22222", isDone: true},
                {id: v1(), title: "JS2222", isDone: true},
                {id: v1(), title: "React2222", isDone: true},
                {id: v1(), title: "CSS2222", isDone: true}
            ],
            filter: "all"
        }
    });
    // const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
    // const FilteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks, filter)

    const removeTask = (todolistId: string, tasksId: string) => {
        // const nextState: Array<TaskType> = []
        // for (let i = 0; i < tasks.length; i++) {
        //     if (tasks[i].id !== tasksId
        //     ) {
        //         nextState.push(tasks[i])
        //     }
        // }
        // setTasks(nextState)
        setTasks({
            ...tasks,
            [todolistId]: {...tasks[todolistId], data: tasks[todolistId].data.filter(el => el.id !== tasksId)}
        })
    }
    const addTask = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        // let newTasks = [newTask, ...tasks]
        // setTasks(newTasks)
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: [newTask, ...tasks[todolistId].data]}})
    }
    const checkedTask = (todolistId: string, taskId: string, checked: boolean) => {
        let changeCheckedTask = tasks[todolistId].data.find(t => t.id === taskId)
        if (changeCheckedTask) {
            changeCheckedTask.isDone = checked
            // setTasks([...tasks])
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
            <div>
                <button>Add TodoList</button>
            </div>
            {mappedList}
        </div>
    )
}

export default App;


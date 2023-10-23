import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/itemForm/AddItemForm";
import {EditableSpan} from "./components/editableSpan/EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    checkedTask: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string,title: string) => void
    changeTaskTitle:(todolistId: string,taskId: string,title: string) => void
}

export function Todolist(props: PropsType) {

    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
        console.log(tasksForTodolist)
    }

    const addTask = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");
    const removeTodolistHandler = () => {
        props.removeTodoList(props.todolistId)
    }
    const changeTodoListTitle = (newTitle: string) => props.changeTodolistTitle(props.todolistId,newTitle)

    return (
        <div className={'todolistWrapper'}>
            <div className={'titleHead'}>
                <h3>
                    <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                    <button onClick={removeTodolistHandler}>X</button>
                </h3>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.checkedTask(props.todolistId, t.id, e.currentTarget.checked);
                    }
                    const onChangeTaskHandler = (title: string) => {
                        // props.changeTaskTitle(props.todolistId, t.title)

                    }
                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(props.todolistId,t.id,title)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={changeTaskTitle}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
    )
}


//----------------------------------------------------------------------------
// import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
// import image from './images/list.svg'
//
// type TodoListPropsType = {
//     title: string
//     todolistId: string
//     tasks: Array<TaskType>
//     removeTask: (todolistId: string, tasksId: string) => void
//     changeFilter: (todolistId: string, nextFilterValue: FilterValueType) => void
//     addTask: (todolistId: string, title: string) => void
//     checkedTask: (todolistId: string, taskId: string, checked: boolean) => void
//     filter: FilterValueType
// }
//
// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
// export type FilterValueType = 'all' | 'active' | 'completed'
//
//
// const TodoList: FC<TodoListPropsType> = (
//     {
//         title,
//         todolistId,
//         tasks,
//         removeTask,
//         changeFilter,
//         addTask,
//         checkedTask,
//         filter
//     }) => {
//
//     const getFilteredTasksForRender = (allTasks: Array<TaskType>, filterValue: FilterValueType): Array<TaskType> => {
//         if (filter === 'active') {
//             return allTasks.filter(t => t.isDone === false)
//         } else if (filterValue === 'completed') {
//             return allTasks.filter(t => t.isDone === true)
//         } else {
//             return allTasks
//         }
//     }
//
//     const listItems: Array<JSX.Element> = tasks.map((t) => {
//         const removeTaskHandler = () => removeTask(todolistId,t.id)
//         const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//             let CheckedValue = e.currentTarget.checked
//             checkedTask(todolistId,t.id, CheckedValue)
//         }
//         return (
//             <li key={t.id} className={t.isDone ? 'is-done' : ''}>
//                 <input type="checkbox"
//                        checked={t.isDone}
//                        onChange={onChangeHandler}
//                 />
//                 <span>{t.title}</span>
//                 <button onClick={removeTaskHandler}>x</button>
//             </li>
//         )
//     })
//     const [error, setError] = useState<boolean | null>(null)
//
//     const tasksList: JSX.Element = tasks.length
//         ? <ul>{listItems}</ul>
//         : <span>Your tasksList is empty</span>
//
//     const addTitleForTask = () => {
//         if (inputValue.trim() !== '') {
//             addTask(todolistId,inputValue.trim())
//             setInputValue('')
//         } else {
//             setError(true)
//         }
//     }
//     const onClickHandler = () => {
//         addTitleForTask()
//     }
//     const [inputValue, setInputValue] = useState('')
//     const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         setError(false)
//         setInputValue(e.currentTarget.value)
//     }
//     const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === 'Enter') {
//             addTitleForTask()
//         }
//     }
//     const onAllClickHandler = () => {
//         changeFilter(todolistId,'all')
//     }
//     const onActiveClickHandler = () => {
//         changeFilter(todolistId,'active')
//     }
//     const onCompletedClickHandler = () => {
//         changeFilter(todolistId,'completed')
//     }
//
//
//     return (
//         <div className="todolist">
//             <img src={image}/>
//             <h3>{title}</h3>
//             <div>
//                 <input onChange={onchangeHandler}
//                        value={inputValue}
//                        onKeyDown={onKeyDownHandler}
//                        className={error ? 'error' : ''}
//                 />
//                 <button onClick={onClickHandler}>+</button>
//                 {error && <div className={'error-message'}>Enter correct title</div>}
//             </div>
//             {getFilteredTasksForRender}
//             <div>
//                 <button onClick={onAllClickHandler}
//                         className={filter === 'all' ? 'active-filter' : ''}>
//                     All
//                 </button>
//                 <button onClick={onActiveClickHandler}
//                         className={filter === 'active' ? 'active-filter' : ''}>
//                     Active
//                 </button>
//                 <button onClick={onCompletedClickHandler}
//                         className={filter === 'completed' ? 'active-filter' : ''}>
//                     Completed
//                 </button>
//             </div>
//         </div>
//     )
// }
//
// export default TodoList;

//------------------------------------------------------------------
// type TaskType = {
//     id: number
//     title: string
//     isDone: boolean
// }
//
// type PropsType = {
//     title: string
//     tasks: Array<TaskType>
// }
//
// export function Todolist(props: PropsType) {
//     return (
//         <div>
//             <h3>{props.title}</h3>
//             <div>
//                 <input/>
//                 <button>+</button>
//             </div>
//             <ul>
//                 <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
//                 <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
//                 <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>
//             </ul>
//             <div>
//                 <button>All</button>
//                 <button>Active</button>
//                 <button>Completed</button>
//             </div>
//         </div>
//     )
// }


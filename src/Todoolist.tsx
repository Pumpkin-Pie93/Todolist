import React, {ChangeEvent, FC, useState} from 'react';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (tasksId: string) => void
    changeFilter: (nextFilterValue: FilterValueType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'


const TodoList: FC<TodoListPropsType> = (
    {
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask
    }) => {

    const listItems: Array<JSX.Element> = tasks.map((t) => {
        const removeTaskHandler = () => removeTask(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })

    const tasksList: JSX.Element = tasks.length
        ? <ul>{listItems}</ul>
        : <span>Your tasksList is empty</span>

    const onClikcHandler = ()=> {
        addTask(inputValue)
        setInputValue('')
    }

    const [inputValue, setInputValue] = useState('')
    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setInputValue(e.currentTarget.value)
        console.log(inputValue)
    }

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input onChange={onchangeHandler} value={inputValue}/>
                <button onClick={onClikcHandler}>+</button>
            </div>
            {tasksList}
            <div>
                <button onClick={() => {
                    changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    changeFilter('completed')
                }}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;


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

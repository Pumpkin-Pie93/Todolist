import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (tasksId: string) => void
    changeFilter: (nextFilterValue: FilterValueType) => void
    addTask: (title: string) => void
    checkedTask:(taskId: string, checked: boolean) => void
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
        addTask,
        checkedTask
    }) => {

    const listItems: Array<JSX.Element> = tasks.map((t) => {
        const removeTaskHandler = () => removeTask(t.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let CheckedValue = e.currentTarget.checked
            checkedTask(t.id, CheckedValue)
        }
        return (
            <li key={t.id}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={onChangeHandler}
                />
                <span>{t.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })
    const [error, setError] = useState<boolean | null>(null)

    const tasksList: JSX.Element = tasks.length
        ? <ul>{listItems}</ul>
        : <span>Your tasksList is empty</span>
    const addTitleForTask = () => {
        if(inputValue.trim() !== ''){
            addTask(inputValue.trim())
            setInputValue('')
        } else {
            setError(true)
        }
            }
    const onClickHandler = () => {
        addTitleForTask()
    }
    const [inputValue, setInputValue] = useState('')
    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setInputValue(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTitleForTask()
        }
    }
    const onAllClickHandler = () => {
        changeFilter('all')
    }
    const onActiveClickHandler = () => {
        changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        changeFilter('completed')
    }
    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input onChange={onchangeHandler}
                       value={inputValue}
                       onKeyDown={onKeyDownHandler}
                       className={error? 'error': ''}
                />
                <button onClick={onClickHandler}>+</button>
                {error && <div className={'error-message'}>Enter correct title</div>}
            </div>
            {tasksList}
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
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

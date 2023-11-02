import {FilterValuesType, inTaskType} from "../App";
import {v1} from "uuid";


type RemoveTaskAT = {
    type: 'REMOVE_TASK'
    payload: {
        todolistId: string
        tasksId: string
    }
}
type AddTaskAT = {
    type: "ADD_TASK"
    payload: {
        todolistId: string
        title: string
    }
}
type ChangeCheckedTaskAT = {
    type: "CHECKED_TASK"
    payload: {
        todolistId: string
        taskId: string
        checked: boolean
    }
}
type ChangeFilterAT = {
    type: "CHANGE_FILTER"
    payload: {
        todolistId: string
        filter: FilterValuesType
    }
}
type ChangeTaskTitleAT = {
    type: "CHANGE_TASK_TITLE"
    payload: {
        todolistId: string
        taskId: string
        title: string
    }
}

type AllActionsType = RemoveTaskAT | AddTaskAT | ChangeCheckedTaskAT | ChangeFilterAT | ChangeTaskTitleAT

export const tasksReducer = (tasks: inTaskType,action: AllActionsType) => {
    switch (action.type) {
        case "REMOVE_TASK":
            return {
                ...tasks,
                [action.payload.todolistId]:
                    {...tasks[action.payload.todolistId],
                        data: tasks[action.payload.todolistId].data.filter(el => el.id !== action.payload.tasksId)}
            }
        case "ADD_TASK":
            let newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {
                ...tasks,
                [action.payload.todolistId]: {...tasks[action.payload.todolistId],
                    data: [newTask, ...tasks[action.payload.todolistId].data]}
            }
        case "CHECKED_TASK":
            let changeCheckedTask = tasks[action.payload.todolistId].data.find(t => t.id === action.payload.taskId)
            if (changeCheckedTask) {
                changeCheckedTask.isDone = action.payload.checked
            }
            return {
                        ...tasks,
                        [action.payload.todolistId]: {
                            ...tasks[action.payload.todolistId],
                            data: tasks[action.payload.todolistId].data.map(
                                el => el.id === action.payload.taskId ? {...el, isDone: action.payload.checked} : el)
                        }
                    }
        case "CHANGE_FILTER":
            return {
                ...tasks, [action.payload.todolistId]: {...tasks[action.payload.todolistId], filter: action.payload.filter}
            }
        case "CHANGE_TASK_TITLE" :
            return {
                ...tasks, [action.payload.todolistId]:
                    {...tasks[action.payload.todolistId],
                        data: tasks[action.payload.todolistId].data.map(el => el.id === action.payload.taskId
                            ? {...el, title: action.payload.title}
                            : el)}
            }
        default: return tasks
    }
}

export const RemoveTaskAC = (todolistId: string,tasksId: string): RemoveTaskAT => {
    return {type: "REMOVE_TASK", payload: {todolistId,tasksId}} as const
}

export const AddTaskAC = (todolistId: string, title: string): AddTaskAT => {
    return {type:"ADD_TASK", payload: {todolistId,title}} as const
}
export const ChangeCheckedTaskAC = (todolistId: string, taskId: string, checked: boolean): ChangeCheckedTaskAT => {
    return {type:"CHECKED_TASK", payload: {todolistId,taskId,checked}} as const
}
export const ChangeFilterAC = (todolistId: string, filter: FilterValuesType ): ChangeFilterAT => {
    return {type:"CHANGE_FILTER", payload: {todolistId,filter}} as const
}
export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string ): ChangeTaskTitleAT => {
    return {type:"CHANGE_TASK_TITLE", payload: {todolistId,taskId,title}} as const
}

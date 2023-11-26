import {TodolistsType} from "../App";
import {v1} from "uuid";

export type RemovetodolistActionType = { // типизируем каждый экшн где тип это ключ для свича (должен совпадать точь в точь) и параметры, приодящие в функцию
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddtodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangetodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId: string, title: string
}

export type AllActionsType = RemovetodolistActionType
    | AddtodolistActionType
    | ChangetodolistTitleActionType

let initialState: Array<TodolistsType> = [] //для параметра state мы должны задать значение по дефолту, равное начальному состоянию. Пусть это будут пустые массив

export const todoListReducer = (state: Array<TodolistsType> = initialState, action: AllActionsType) => {
    switch (action.type) {
        case('REMOVE-TODOLIST'):
            // let todolistId = action.todolistId
            return state.filter(el => el.id !== action.todolistId)
        case ("ADD-TODOLIST"):
            return [ {id: action.todolistId, title: action.title, filter: 'all'},...state]
        case ('CHANGE-TODOLIST-TITLE'):
            let newTodolistTitle = 'New Todolist'
            // let todolistId = state[1].id
            return state.map(el => el.id === action.todolistId ? {...el, title: newTodolistTitle} : el)

        default:
            return state
    }

}

export const RemoveTodolistAC = (todolistId: string): RemovetodolistActionType => { // сщздаем сам экшн
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}
export const AddtodolistAC = (title: string): AddtodolistActionType => { // сщздаем сам экшн
    return {type: 'ADD-TODOLIST', title, todolistId: v1()} as const
}
export const ChangetodolistTitleAC = ( todolistId: string, title: string): ChangetodolistTitleActionType => { // сщздаем сам экшн
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, title} as const
}


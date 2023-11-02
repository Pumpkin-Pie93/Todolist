import {TodolistsType} from "../App";
import {v1} from "uuid";

export type RemovetodolistActionType = { // типизируем каждый экшн где тип это ключ для свича (должен совпадать точь в точь) и параметры, приодящие в функцию
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddtodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    newTodoListId: string
}
export type ChangetodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId: string, title: string
}

export type AllActionsType = RemovetodolistActionType
    | AddtodolistActionType
    | ChangetodolistTitleActionType


export const todoListReducer = (state: Array<TodolistsType>, action: AllActionsType) => {
    switch (action.type) {
        case('REMOVE-TODOLIST'):
            let todolistId1 = state[0].id
            return state.filter(el => el.id !== todolistId1)
        case ("ADD-TODOLIST"):
            let newTodolist = action.title
            let todoId = action.newTodoListId
            let newTodo = {id: todoId, title: newTodolist}
            return [newTodo,...state ]
        case ('CHANGE-TODOLIST-TITLE'):
            let newTodolistTitle = 'New Todolist'
            let todolistId = state[1].id
            return state.map(el => el.id === todolistId ? {...el, title: newTodolistTitle} : el)

        default:
            throw new Error('I don\'t understand this type')
    }

}

export const RemoveTodolistAC = (todolistId: string): RemovetodolistActionType => { // сщздаем сам экшн
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}
export const AddtodolistAC = (title: string, newTodoListId: string): AddtodolistActionType => { // сщздаем сам экшн
    return {type: 'ADD-TODOLIST', title, newTodoListId} as const
}
export const ChangetodolistTitleAC = ( todolistId: string, title: string): ChangetodolistTitleActionType => { // сщздаем сам экшн
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, title} as const
}


import {AddtodolistAC, ChangetodolistTitleAC, RemoveTodolistAC, todoListReducer} from './todolists-reducer'
import { v1 } from 'uuid'
import {FilterValuesType, inTaskType, TodolistsType} from '../App'
import {useState} from "react";

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: 'What to learn'},
        {id: todolistId2, title: 'What to buy'}
    ]

    const endState = todoListReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newTodoListId = v1()

    let title = 'New Todolist'

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: 'What to learn'},
        {id: todolistId2, title: 'What to buy'}
    ]

    const endState = todoListReducer(startState, AddtodolistAC(title))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})
test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: 'What to learn'},
        {id: todolistId2, title: 'What to buy'}
    ]

    const endState = todoListReducer(startState, ChangetodolistTitleAC(todolistId1,newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New Todolist')
})

// test('correct filter of todolist should be changed', () => {
//     let todolistId1 = v1()
//     let todolistId2 = v1()
//
//     let newFilter: FilterValuesType = 'completed'
//
//     const startState: Array<TodolistsType> = [
//         {id: todolistId1, title: 'What to learn', filter: 'all'},
//         {id: todolistId2, title: 'What to buy', filter: 'all'}
//     ]
//
//     const action = {
//         type: 'CHANGE-TODOLIST-FILTER',
//         id: todolistId2,
//         filter: newFilter
//     }
//
//     const endState = todolistsReducer(startState, action)
//
//     expect(endState[0].filter).toBe('all')
//     expect(endState[1].filter).toBe(newFilter)
// })

import {AddtodolistAC, ChangetodolistTitleAC, RemoveTodolistAC, todoListReducer} from './todolists-reducer'
import {v1} from 'uuid'
import {TodolistsType} from '../App'

let todolistId1 : string
let todolistId2 : string
let startState: Array<TodolistsType>

beforeEach(()=> {
     todolistId1 = v1()
     todolistId2 = v1()
     startState = [
        {id: todolistId1, title: 'What to learn'},
        {id: todolistId2, title: 'What to buy'}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {

    let newTodoListId = v1()

    let title = 'New Todolist'

    const endState = todoListReducer(startState, AddtodolistAC(title))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})
test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'

    const endState = todoListReducer(startState, ChangetodolistTitleAC(todolistId1,newTodolistTitle))

    expect(endState[0].title).toBe('New Todolist')
    expect(endState[1].title).toBe('What to buy')
})

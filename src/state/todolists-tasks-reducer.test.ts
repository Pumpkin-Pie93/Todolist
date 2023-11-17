import {inTaskType, TodolistsType} from "../App";
import {AddtodolistAC, todoListReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasksReducer";


test('ids should be equals', () => {
    const startTasksState: inTaskType = {}
    const startTodolistsState: Array<TodolistsType> = []

    const action = AddtodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})

import {FilterValuesType, inTaskType, TodolistsType} from "../App";
import {v1} from "uuid";
import {
    AddTaskAC,
    ChangeCheckedTaskAC,
    ChangeFilterAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    tasksReducer
} from "./tasksReducer";
import {ChangetodolistTitleAC, RemoveTodolistAC, todoListReducer} from "./todolists-reducer";

let todolistId1 : string
let todolistId2 : string
let startState: inTaskType

beforeEach(()=> {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = {
        [todolistId1]: {
            data: [
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "React", isDone: false},
                {id: v1(), title: "Angular", isDone: false},
                {id: v1(), title: "Redux", isDone: false}
            ],
            filter: "all"
        },
        [todolistId2]: {
            data: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Tomatoes", isDone: true},
                {id: v1(), title: "Fish", isDone: true},
                {id: v1(), title: "Butter", isDone: true}
            ],
            filter: "all"
        }
    }
})

test('correct task should be removed', ()=> {

    const endState = tasksReducer(startState,RemoveTaskAC(todolistId1, startState[todolistId1].data[1].id))

    expect(endState[todolistId1].data.length).toBe(5)
    expect(endState[todolistId2].data.length).toBe(4)

})
test('correct task should be added', () => {

    let newTitile = 'New Task'

  const endState = tasksReducer(startState, AddTaskAC(todolistId2, newTitile))

    expect(endState[todolistId2].data.length).toBe(5)
    expect(endState[todolistId2].data[0].title).toBe(newTitile)
    expect(endState[todolistId1].data.length).toBe(6)
})
test('correct task should be changed', () => {

    let taskId = startState[todolistId1].data[0].id
    let checked = false

  const endState = tasksReducer(startState, ChangeCheckedTaskAC(todolistId1,taskId,checked))

    expect(endState[todolistId1].data[0].isDone).toBe(false)
    expect(endState[todolistId2].data[0].isDone).toBe(true)

})
test('filter should be changed', () => {

    let newFilter: FilterValuesType = 'active'

    let taskId = startState[todolistId1].data[0].id
    let checked = false

    const endState = tasksReducer(startState, ChangeFilterAC(todolistId1,newFilter))

    expect(endState[todolistId1].filter).toBe(newFilter)
    expect(endState[todolistId2].filter).toBe('all')

})
test('correct todolist should change its name', () => {

    let newTaskTitle = 'New Todolist'

    let taskId = startState[todolistId1].data[0].id

    const endState = tasksReducer(startState, ChangeTaskTitleAC(todolistId1,taskId,newTaskTitle))

    expect(endState[todolistId1].data[0].title).toBe(newTaskTitle)
    expect(endState[todolistId2].data[0].title).toBe("Milk")
})
test('property with todolistId should be deleted', () => {

    const action = RemoveTodolistAC(todolistId2)

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

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


test('correct task should be removed', ()=> {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState : inTaskType = {
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

    const endState = tasksReducer(startState,RemoveTaskAC(todolistId1, startState[todolistId1].data[1].id))

    expect(endState[todolistId1].data.length).toBe(5)
    expect(endState[todolistId2].data.length).toBe(4)

})

test('correct task should be added', () => {


    let todolistId1 = v1()
    let todolistId2 = v1()
    let newTitile = 'New Task'

    const startState : inTaskType = {
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

  const endState = tasksReducer(startState, AddTaskAC(todolistId2, newTitile))

    expect(endState[todolistId2].data.length).toBe(5)
    expect(endState[todolistId2].data[0].title).toBe(newTitile)

    expect(endState[todolistId1].data.length).toBe(6)
})


test('correct task should be changed', () => {


    let todolistId1 = v1()
    let todolistId2 = v1()



    const startState : inTaskType = {
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
    let taskId = startState[todolistId1].data[0].id
    let checked = false

  const endState = tasksReducer(startState, ChangeCheckedTaskAC(todolistId1,taskId,checked))

    expect(endState[todolistId1].data[0].isDone).toBe(false)
    expect(endState[todolistId2].data[0].isDone).toBe(true)

})


test('filter should be changed', () => {


    let todolistId1 = v1()
    let todolistId2 = v1()
    let newFilter: FilterValuesType = 'active'


    const startState : inTaskType = {
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
    let taskId = startState[todolistId1].data[0].id
    let checked = false

    const endState = tasksReducer(startState, ChangeFilterAC(todolistId1,newFilter))

    expect(endState[todolistId1].filter).toBe(newFilter)
    expect(endState[todolistId2].filter).toBe('all')

})

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTaskTitle = 'New Todolist'

    const startState : inTaskType = {
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
    let taskId = startState[todolistId1].data[0].id


    const endState = tasksReducer(startState, ChangeTaskTitleAC(todolistId1,taskId,newTaskTitle))

    expect(endState[todolistId1].data[0].title).toBe(newTaskTitle)
    expect(endState[todolistId2].data[0].title).toBe("Milk")
})


test('property with todolistId should be deleted', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState : inTaskType = {
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

    const action = RemoveTodolistAC(todolistId2)

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

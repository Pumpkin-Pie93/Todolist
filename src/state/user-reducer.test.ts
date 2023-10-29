import {userReducer} from './user-reducer'

test('user reducer should increment only age', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'} //наши входные данные

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'}) //данные после редьюсера  (действие)

    expect(endState.age).toBe(21) // ожидаем получить после действия результат...
    expect(endState.childrenCount).toBe(2) // ожидаем получить после действия результат...
})

test('user reducer should increment only childrenCount', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'} // входные данные

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})// действи с данныыми и измененный стейт

    expect(endState.childrenCount).toBe(3)                                // ожидаемый результат
    expect(endState.age).toBe(20)
    // your code here
})

test('user reducer should change name of user', () => {
    const startState = {name: 'Dimych', age: 20, childrenCount: 2}
    const newName = 'Viktor'
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.name).toBe(newName)
})

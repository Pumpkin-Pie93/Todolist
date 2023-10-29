

type StateType = {
    age: number
    childrenCount: number
    name: string
}

type ActionTYpe = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionTYpe) => {
    switch (action.type){
        case 'INCREMENT-AGE':
            // state.age = state.age +1
            return {...state, age: state.age +1}
        case 'INCREMENT-CHILDREN-COUNT':
            // state.childrenCount = state.childrenCount +1
            return {...state, childrenCount: state.childrenCount +1}
        case 'CHANGE-NAME' :
            let newName = 'Viktor'
            return {...state, name: state.name = newName}
        default:  throw new Error('I don\'t understand this type')
    }

}
import React, {useState} from 'react';
import './App.css';
import TodoList, {FilterValueType, TaskType} from "./Todoolist";

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ])

    const removeTask = (tasksId: number) => {
        const nextState: Array<TaskType> = []
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id !== tasksId
            ) {
                nextState.push(tasks[i])
            }
        }
        setTasks(nextState)
    }

    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
    const getFilteredTasksForRender = (allTasks: Array<TaskType>, filterValue: FilterValueType): Array<TaskType> => {
        switch (filterValue) {
            case 'active':
                return allTasks.filter(t => t.isDone === false)
            case 'completed':
                return allTasks.filter(t => t.isDone === true)
            default:
                return allTasks
        }
    }

    const FilteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks, filter)

    const changeFilter = (nextFilterValue: FilterValueType) => {
        setFilter(nextFilterValue)
    }

    // console.log(result)
    //
    // const tasks = result[0];
    // const setTasks = result[1]
    //
    // const tasks: Array<TaskType> = [
    //     { id: 1, title: 'HTML&CSS', isDone: true },
    //     { id: 2, title: 'JS', isDone: true },
    //     { id: 3, title: 'ReactJS', isDone: false }
    // ]


    return (
        <div className="App">
            <TodoList changeFilter={changeFilter}
                      removeTask={removeTask}
                      title='What to lern'
                      tasks={FilteredTasksForRender}/>
        </div>
    );
}

export default App;


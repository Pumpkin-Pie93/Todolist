import React, {useState} from 'react';
import './App.css';
import TodoList, {FilterValueType, TaskType} from "./Todoolist";
import {v1} from "uuid";

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ])

    const removeTask = (tasksId: string) => {
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

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <TodoList changeFilter={changeFilter}
                      removeTask={removeTask}
                      title='What to lern'
                      tasks={FilteredTasksForRender}
                      addTask={addTask}
            />

        </div>
    );
}
export default App;


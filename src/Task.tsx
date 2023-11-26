import React, {ChangeEvent, memo, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {pink} from "@mui/material/colors";
import {EditableSpan} from "./components/editableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {FilterValuesType} from "./App";
import {TaskType} from "./Todoolist";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


type TaskPropsType = {

    task: TaskType
    removeTask: (taskId: string) => void
    checkedTask: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void
}

const Task = memo(({task,removeTask,checkedTask,changeTaskTitle}:TaskPropsType) => {

    console.log('task')

    const onChangeTaskTitle = (title: string) => {
        changeTaskTitle(task.id, title)}

    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        checkedTask(task.id, e.currentTarget.checked);
    }
    return (
        <div>
            <li className={task.isDone ? "is-done" : ""}>
                <Checkbox
                    {...label}
                    defaultChecked
                    sx={{
                        color: pink[800],
                        '&.Mui-checked': {
                            color: pink[600],
                        },
                    }}
                    onChange={onChangeHandler}
                    checked={task.isDone}
                />

                <EditableSpan title={task.title} onChange={onChangeTaskTitle}/>
                <IconButton onClick={onClickHandler}>
                    <Delete fontSize="small"/>
                </IconButton>
            </li>
        </div>
    );
});

export default Task;
import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import Button from '@mui/material/Button';
import s from './AddItemForm.module.css'
import TextField from '@mui/material/TextField';
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = memo((props:AddItemFormPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {

        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const buttonStyle = {
        maxWidth: '60px',
        maxHeight: '30px',
        minWidth: '60px',
        minHeight: '30px',
        // outline:'1px solid pink',
        fontsize: '5px',
        color: '#e79595'
    }
    const inputStyle = {
        color: '#e79595',
        outline: 'pink',
        borderBottom: 'pink'
    }

    return (
        <div>
            <TextField id="standard-basic"
                       variant="standard"
                       value={title}
                       style={inputStyle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       label={'Title'}
                       helperText={error}
            />
            <IconButton
                color={'primary'}
                onClick={addTask}
                style={buttonStyle}
            >
                <AddBox/>
            </IconButton>
        </div>
    );
});


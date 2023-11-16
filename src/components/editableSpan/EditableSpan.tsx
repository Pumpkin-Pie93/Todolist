import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';


export type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}

export const EditableSpan = (props:EditableSpanPropsType) => {

    const [editMode,  setEditMode] = useState(false)

    const [inputValue, setValue] = useState(props.title)

    const onDoubleClickHandler = () => {
        setEditMode(true)
    }
    const onBlurHandler = () => {
        setEditMode(false)
        props.onChange(inputValue)
        console.log(inputValue)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setValue(value)
    }

    return (
        <>
            {editMode
                ?
                <TextField id="standard-basic"
                           label="Standard"
                           variant="standard"
                           value={inputValue}
                           onChange={onChangeHandler}
                           onBlur={onBlurHandler}
                           autoFocus/>
              
                :<span onDoubleClick={onDoubleClickHandler}>{inputValue}</span>
            }
        </>
    );
};


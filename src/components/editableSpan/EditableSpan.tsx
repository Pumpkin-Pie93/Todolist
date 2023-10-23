import React, {ChangeEvent, useState} from 'react';

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
// const activateEditMode = () => {
//     setEditMode(true)
//     setValue(props.title)
// }
//
// const activateViewMode = () => {
//     setEditMode(false)
//     props.onChange(inputValue)
// }
    return (
        <>
            {editMode
                ?<input value={inputValue}
                        onChange={onChangeHandler}
                        onBlur={onBlurHandler}
                        autoFocus
                />
                :<span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
            }
        </>
    );
};


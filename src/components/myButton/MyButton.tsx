import {ButtonProps} from "@mui/material";
import React, {memo} from "react";
import Button from "@mui/material/Button";

interface IMyButton extends ButtonProps{}

export const MyButton = memo((props: IMyButton) => {
    return <Button className={props.className}
                   onClick={props.onClick}
                   style={props.style}
                   variant={props.variant}
    >{props.title}
    </Button>
})
import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


const toolBarStyle = {
    backgroundColor:'#e79595',
    borderBottomLeftRadius: '50px',
    borderBottomRightRadius:'50px'
}

const appBarStyle = {
    backgroundColor: 'transparent',
    borderBottomLeftRadius: '50px',
    borderBottomRightRadius:'50px',
    boxShadow: '0px 2px 0px 0px rgb(231 149 149), ' +
        '0px 1px 0px 4px rgb(255 204 204)',
}

export const AppBarForTodoLists = () => {
    return (
        <AppBar position="static" style={appBarStyle}>
            <Toolbar style={toolBarStyle}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    TodoLists
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>

    );
};


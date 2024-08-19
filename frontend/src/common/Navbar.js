import React, { useState, useContext } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import UserContext from '../context/UserContext';

const Navbar = () => {
    // useNavigate hook to programmatically navigate between routes
    const navigate = useNavigate();
    // useState hook to manage the state of the drawer (open/close)
    const [drawerOpen, setDrawerOpen] = useState(false);
    // useContext hook to access the current user from UserContext
    const user = useContext(UserContext);

    // Function to toggle the state of the drawer
    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    // Function to handle logout, navigates to the logout route
    function doLogout() {
        navigate('/logout');
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Portal
                    </Typography>
                    <Button color="inherit" onClick={doLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <List>
                    <ListItem button>
                        <ListItemText primary="Profile" onClick={() => navigate('/profile')} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Chat" onClick={() => navigate('/chatapp')} />
                    </ListItem>
                    {
                        user && user.userType == "doctor" && 
                        <ListItem button>
                            <ListItemText primary="Slot" onClick={() => navigate('/slots')} />
                        </ListItem>
                    }
                    {
                        user && user.userType == "user" && 
                        <ListItem button>
                            <ListItemText primary="Book Appointment" onClick={() => navigate('/book-appointment')} />
                        </ListItem>
                    }
                </List>
            </Drawer>
        </>
    );
};

export default Navbar;

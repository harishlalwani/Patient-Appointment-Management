import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Outlet, Navigate } from 'react-router-dom';
import { Tabs, Tab, Box, Typography, Button, Divider } from '@mui/material';
import Register from './Register';
import Login from './Login';
import DoctorRegister from './DoctorRegister';
import DoctorLogin from './DoctorLogin';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 1 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const AuthTabs = () => {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const goToRegister = (e) => {
        e.preventDefault();
        navigate("/register")
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="auth tabs">
                        <Tab label="User Login" {...a11yProps(0)} />
                        <Tab label="Doctor Login" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Login />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DoctorLogin />
                </TabPanel>
                
                <Box sx={{ px: 4, py: 1 }}>
                    <Divider sx={{ py: 1 }}>New User?</Divider>
                    <Button type="button" variant="contained" color="primary" fullWidth onClick={goToRegister}>
                        Create New User
                    </Button>
                </Box> 
            </Box>
            
        </>
        
    );
};

export default AuthTabs;

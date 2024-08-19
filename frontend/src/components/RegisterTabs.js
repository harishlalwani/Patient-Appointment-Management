import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Button, Divider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, useNavigate, Outlet, Navigate } from 'react-router-dom';
import Register from './Register';
import DoctorRegister from './DoctorRegister';

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

    const goToLogin = (e) => {
        e.preventDefault();
        navigate("/")
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="auth tabs">
                        <Tab label="User Register" {...a11yProps(0)} />
                        <Tab label="Doctor Register" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Register />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DoctorRegister />
                </TabPanel>

                <Box sx={{ px: 4, py: 1 }}>
                    <Divider sx={{ py: 1 }}>Or</Divider>
                    <Button type="button" variant="contained" color="primary" fullWidth onClick={goToLogin}>
                        Login to an existing User Account
                    </Button>
                </Box> 
            </Box>
            
        </>
        
    );
};

export default AuthTabs;

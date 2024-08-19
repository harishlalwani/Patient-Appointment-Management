import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Container, Typography, Box } from '@mui/material';
import { loginUser } from '../utils/api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const goToUserRegister = (e) => {
        e.preventDefault();
        navigate("/register")
        
    };

    const goToDoctorRegister = (e) => {
        e.preventDefault();
        navigate("/doctor/register")
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(  formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userType', response.data.type);
            navigate('/profile');
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <Container>
            <Typography variant="h4" align="center">Login</Typography>
            <Box component="form" onSubmit={handleSubmit} mt={2}>
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    name="email"
                    type="email"
                    required
                    margin="normal"
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    required
                    onChange={handleChange}
                />
                <Button variant="contained" color="primary" fullWidth type="submit" >
                    Login
                </Button>
            </Box>
        </Container>
    );
};

export default Login;

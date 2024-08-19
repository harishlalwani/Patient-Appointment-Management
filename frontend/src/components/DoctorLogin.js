import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { loginDoctor } from '../utils/api';

const DoctorLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginDoctor( { email, password });
            localStorage.setItem('token', response.token);
            localStorage.setItem('userType', response.type);
            navigate('/doctor/profile');
            alert('Logged in successfully');
        } catch (error) {
            console.error('Error logging in', error);
            alert('Invalid credentials');
        }
    };

    return (
        <Container>
            <Typography variant="h4">Doctor Login</Typography>
            <Box component="form" onSubmit={handleSubmit} mt={2}>
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    required
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </Box>
        </Container>
    );
};

export default DoctorLogin;

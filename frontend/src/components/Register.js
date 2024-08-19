import React, { useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { registerUser } from '../utils/api';

// Register component handles user registration
const Register = () => {
    const navigate = useNavigate(); // Hook to navigate programmatically
    const [formData, setFormData] = useState({ name: '', email: '', password: '' }); // State to hold form data

    // Function to handle changes in input fields
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        try {
            const response = await registerUser(formData); // Call API to register user
            navigate('/auth'); // Navigate to auth page on success
            alert(response.data.message); // Show success message
        } catch (error) {
            alert('Error registering user'); // Show error message on failure
        }
    };

    return (
        <Container>
            <Typography variant="h4">User Registration</Typography> {/* Title */}
            <Box component="form" onSubmit={handleSubmit} mt={2}> {/* Form container */}
                <TextField
                    type="text"
                    fullWidth
                    label="Name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    required
                /> {/* Name input field */}
                <TextField
                    type="email"
                    fullWidth
                    label="Email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                    required
                /> {/* Email input field */}
                <TextField
                    type="password"
                    fullWidth
                    label="Password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    margin="normal"
                    required
                /> {/* Password input field */}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                </Button> {/* Submit button */}
            </Box>
        </Container>
    );
};

export default Register; // Export Register component

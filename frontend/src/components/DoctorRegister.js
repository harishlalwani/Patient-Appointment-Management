import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { registerDoctor } from '../utils/api';

const DoctorRegister = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [specialty, setSpecialty] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //await axios.post('/api/doctors/register', { name, email, password, specialty });
            await registerDoctor({ name, email, password, specialty });
            navigate('/auth');
            alert('Doctor registered successfully');
        } catch (error) {
            console.error('Error registering doctor', error);
            alert('Error registering doctor');
        }
    };

    return (
        <Container>
            <Typography variant="h4">Doctor Registration</Typography>
            <Box component="form" onSubmit={handleSubmit} mt={2}>
                <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Specialty"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                </Button>
            </Box>
        </Container>
    );
};

export default DoctorRegister;

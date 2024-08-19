import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Profile = () => {
    const user = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <Container>
            <Box display="flex" flexDirection="column" >
                <Typography variant="h5">Profile</Typography>
            </Box>
            <Divider></Divider>
            <Box>
                {user ? (
                    <>
                        <Typography variant="body1" gutterBottom display="block">Name: {user.name}</Typography>
                        <Typography variant="body1" gutterBottom display="block">Email: {user.email}</Typography>
                    </>
                ) : (
                    <Typography variant="subtitle1" gutterBottom>Loading...</Typography>
                )}
            </Box>
        </Container>
        
    );
};

export default Profile;

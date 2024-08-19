import React, { useContext } from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';
import UserContext from '../context/UserContext';

const Profile = () => {
    const user = useContext(UserContext);

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

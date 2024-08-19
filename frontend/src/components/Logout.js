import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the token from local storage
        localStorage.removeItem('token');

        // Redirect to the login page
        navigate('/auth');
    }, [navigate]);

    return null;
};

export default Logout;

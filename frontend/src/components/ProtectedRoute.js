import React, {useState, useEffect} from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Navbar from '../common/Navbar';
import { isUserLoggedIn } from '../utils/custom';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkLogin = async () => {
            const res = await isUserLoggedIn();
            if(res) {
                setUser(res);
                setIsLoggedIn(true);
            }else {
                console.log('Session expired. Please log in again.');
                localStorage.removeItem('token');
                navigate('/auth');
                return;
            }
        }

        checkLogin();
    }, [navigate])

    return (
        <>
            <UserContext.Provider value={user}>
                <Navbar />
                {children}
            </UserContext.Provider>
        </>
    );
};

export default ProtectedRoute;

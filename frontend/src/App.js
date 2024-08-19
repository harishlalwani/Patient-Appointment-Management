import React, {useEffect, useContext, useState} from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Outlet, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import BookAppointment from './components/BookAppointment';
import Slots from './components/Slots';
import DoctorRegister from './components/DoctorRegister';
import DoctorLogin from './components/DoctorLogin';
import DoctorProfile from './components/DoctorProfile';
import ProtectedRoute from './components/ProtectedRoute';
import AuthTabs from './components/AuthTabs';
import RegisterTabs from './components/RegisterTabs';
import ChatApp from './components/ChatApp';
import Logout from './components/Logout';

function App() {
    
    return (
        <div className="App">            
            <Routes>
                <Route path="/" element={<Navigate to="/auth" />} />
                <Route path="/auth" element={<AuthTabs />} />
                {/* <Route path="/register" element={<Register />} />
                <Route path="/doctor/register" element={<DoctorRegister />} /> */}
                <Route path="/register" element={<RegisterTabs />} />
                
                {/* <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/doctor/register" element={<DoctorRegister />} />
                <Route path="/doctor/login" element={<DoctorLogin />} /> */}
                {/* Protected Route: Only accessible if authenticated */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/doctor/profile"
                    element={
                        <ProtectedRoute>
                            <DoctorProfile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/appointments"
                    element={
                        <ProtectedRoute>
                            <BookAppointment />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/slots"
                    element={
                        <ProtectedRoute>
                            <Slots />
                        </ProtectedRoute>
                    }
                />

                // Add a route for booking appointments
                <Route
                    path="/book-appointment"
                    element={
                        <ProtectedRoute>
                            <BookAppointment />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/chatapp"
                    element={
                        <ProtectedRoute>
                            <ChatApp />
                        </ProtectedRoute>
                    }
                />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </div>
    );
}

export default App;

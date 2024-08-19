import React, { useState, useEffect, useContext } from 'react';
import { Box, Container, Paper } from '@mui/material';
import io from 'socket.io-client';

import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import { fetchUsers, fetchDoctors } from '../utils/api';
import UserContext from '../context/UserContext';
import { useSelector, useDispatch } from 'react-redux';
import SocketService from '../services/socketService';
import { receiveMessage, selectChat, fetchChatUsers } from '../redux/actions/chatActions';

const ChatApp = () => {
    const [unreadChats, setUnreadChats] = useState([]);
    const user = useContext(UserContext);
    const dispatch = useDispatch();
    const { selectedChat, loading, chatUsers, messages } = useSelector((state) => state.chat);

    useEffect(() => {

        if(user != null) {
            dispatch(fetchChatUsers(user));
        }
        
        // Connect socket when the app starts
        const token = localStorage.getItem('token');
        SocketService.connect(token);

        // Listen for incoming messages
        SocketService.on('receiveMessage', (message) => {
            if (!selectedChat || selectedChat._id !== message.senderId) {
                setUnreadChats((prev) => [...prev, message.senderId]);
            }
            dispatch(receiveMessage(message));
        });

        // Cleanup on unmount
        return () => {
            SocketService.disconnect();
        };
    }, [dispatch, user]);

    useEffect(() => {
        if (selectedChat && selectedChat._id) {
            setUnreadChats((prev) => prev.filter((id) => id !== selectedChat._id));
        }
    },[selectedChat])

    return (
        <Box sx={{ display: 'flex' }}>
            <ChatSidebar
                activeChats={chatUsers}
                selectedChatId={selectedChat?._id}
                unreadChats={unreadChats}
            />
            <ChatWindow selectedChat={selectedChat}  />
        </Box>
        
    );
};

export default ChatApp;

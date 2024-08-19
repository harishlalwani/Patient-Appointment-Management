import React, { useState, useEffect, useContext, useRef } from 'react';
import {
    Box,
    TextField,
    Button,
    List,
    ListItem,
    Typography,
    Paper,
} from '@mui/material';
import io from 'socket.io-client';
import UserContext from '../context/UserContext';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages, sendMessage } from '../redux/actions/chatActions';

const ChatWindow = () => {
    const scrollRef = useRef(null);
    const dispatch = useDispatch();
    const { selectedChat, messages, loading, chatUsers } = useSelector((state) => state.chat);
    const user = useContext(UserContext);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (selectedChat) {
            dispatch(fetchMessages(selectedChat._id));
        }
    }, [dispatch, selectedChat]);

    useEffect(() => {
        if (messages && scrollRef && scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, selectedChat]);

    const handleSendMessage = () => {
        if (message.trim()) {
            dispatch(sendMessage(user._id, selectedChat._id, message));
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage()
        }
    }

    if (!selectedChat) {
        return <Typography variant="h6">Select a chat to start messaging.</Typography>;
    }
    return (
        <Paper sx={{ flexGrow: 1, padding: 2, marginLeft: 2 }}>
            <Typography variant="h5" gutterBottom>
                Chat with {selectedChat.name}
            </Typography>

            <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                <List >
                    {messages.map((msg, index) => (
                        <ListItem key={index}>
                            <Typography variant="body1">
                                {msg.senderId === user._id ? 'You' : selectedChat.name}: {msg.content}
                            </Typography>
                        </ListItem>
                    ))}
                    <ListItem key={messages.length}></ListItem>
                    <ListItem ref={scrollRef} key={messages.length+1}></ListItem>
                </List>
            </Box>

            <TextField
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyUp={handleKeyPress}
                placeholder="Type a message"
                fullWidth
                variant="outlined"
                margin="normal"
            />
            <Button onClick={handleSendMessage} variant="contained" color="primary">
                Send
            </Button>
        </Paper>
    );
};

export default ChatWindow;

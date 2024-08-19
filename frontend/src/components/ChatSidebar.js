import React from 'react';
import { useDispatch } from 'react-redux';
import { selectChat } from '../redux/actions/chatActions';
import {
    List,
    ListItem,
    ListItemText,
    Drawer,
    Typography,
    Divider,
    Box,
    Badge
} from '@mui/material';

// ChatSidebar component definition
const ChatSidebar = ({ activeChats, selectedChatId, unreadChats }) => {
    const dispatch = useDispatch(); // Initialize Redux dispatch function

    // Function to handle chat selection
    const handleChatSelect = (chat) => {
        dispatch(selectChat(chat)); // Dispatch the selectChat action with the selected chat
    };

    return (
        <Box
            variant="permanent"
            anchor="left"
            sx={{ width: 240, flexShrink: 0 }} // Styles for the Box component
            paperprops={{ style: { width: 240 } }} // Additional styles for the Box component
        >
            <Typography variant="h6" sx={{ padding: 2 }}>
                Active Chats
            </Typography>
            <Divider /> {/* Divider to separate the title from the list */}
            <List>
                {activeChats.map((chat) => (
                    <ListItem
                        button
                        key={chat._id} // Unique key for each chat item
                        selected={selectedChatId === chat._id} // Highlight if the chat is selected
                        onClick={() => handleChatSelect(chat)} // Handle chat selection on click
                        sx={{
                            backgroundColor:
                                unreadChats.includes(chat._id) && selectedChatId !== chat._id
                                    ? '#f5f5f5' // Highlight background if there are unread messages
                                    : 'inherit', // Default background color
                        }}
                    >
                        <Badge
                            color="primary"
                            variant={unreadChats.includes(chat._id) ? "dot" : null} // Show a dot if there are unread messages
                        >
                            <ListItemText primary={chat.name} /> {/* Display chat name */}
                        </Badge>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ChatSidebar; // Export the ChatSidebar component

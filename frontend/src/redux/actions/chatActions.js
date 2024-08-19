import SocketService from '../../services/socketService';
import {fetchMessagesApi, fetchUsers, fetchDoctors} from '../../utils/api';

// Action types for fetching chat users
export const FETCH_CHAT_USERS_REQUEST = 'FETCH_CHAT_USERS_REQUEST';
export const FETCH_CHAT_USERS_SUCCESS  = 'FETCH_CHAT_USERS_SUCCESS';
export const FETCH_CHAT_USERS_FAILURE = 'FETCH_CHAT_USERS_FAILURE';

// Action types for fetching messages and handling messages
export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SELECT_CHAT = 'SELECT_CHAT';

// Async action to fetch messages for a specific receiver
export const fetchMessages = (receiverId) => async (dispatch) => {
    dispatch({ type: FETCH_MESSAGES_REQUEST });

    try {
        // Call API to fetch messages
        const response = await fetchMessagesApi(receiverId);
        dispatch({
            type: FETCH_MESSAGES_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_MESSAGES_FAILURE,
            error: error.message,
        });
    }
};

// Async action to fetch chat users based on user type
export const fetchChatUsers = (user) => async (dispatch) => {
    dispatch({ type: FETCH_CHAT_USERS_REQUEST });

    try {
        if(user != null) {
            let response = {}
            if(user.userType == "doctor") {
                // Fetch users if the current user is a doctor
                response = await fetchUsers();
            }
            else {
                // Fetch doctors if the current user is not a doctor
                response = await fetchDoctors();
            }
            dispatch({
                type: FETCH_CHAT_USERS_SUCCESS,
                payload: response.data,
            });
        }        
    } catch (error) {
        dispatch({
            type: FETCH_CHAT_USERS_FAILURE,
            error: error.message,
        });
    }
};

// Action to handle receiving a message
export const receiveMessage = (message) => ({
    type: RECEIVE_MESSAGE,
    payload: message,
});

// Action to select a chat
export const selectChat = (receiverId) => ({
    type: SELECT_CHAT,
    payload: receiverId,
});

// Action to send a message through socket
export const sendMessage = (userId, receiverId, content) => (dispatch) => {
    let message = {
        senderId: userId,
        receiverId: receiverId,
        content: content,
    };

    // Send message through socket
    SocketService.emit('sendMessage', message);

    dispatch({
        type: SEND_MESSAGE,
        payload: message,
    });
};

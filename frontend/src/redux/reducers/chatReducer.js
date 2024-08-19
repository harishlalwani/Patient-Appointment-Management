import {
    FETCH_CHAT_USERS_REQUEST,
    FETCH_CHAT_USERS_SUCCESS,
    FETCH_CHAT_USERS_FAILURE,
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_FAILURE,
    RECEIVE_MESSAGE,
    SEND_MESSAGE,
    SELECT_CHAT,
} from '../actions/chatActions';

// Initial state of the chat reducer, including messages, selected chat, chat users, loading state, and error handling
const initialState = {
    messages: [],
    selectedChat: null,
    chatUsers: [],
    loading: false,
    error: null,
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        // Handles the state when fetching chat users begins
        case FETCH_CHAT_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        // Handles the state when chat users are successfully fetched
        case FETCH_CHAT_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                chatUsers: action.payload,
            };
        // Handles the state when fetching chat users fails
        case FETCH_CHAT_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        // Handles the state when fetching messages begins
        case FETCH_MESSAGES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        // Handles the state when messages are successfully fetched
        case FETCH_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                messages: action.payload,
            };
        // Handles the state when fetching messages fails
        case FETCH_MESSAGES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        // Handles receiving a new message and appends it to the messages array
        case RECEIVE_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        // Handles sending a message and appends it to the messages array
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        // Handles selecting a chat and sets the selected chat in the state
        case SELECT_CHAT:
            return {
                ...state,
                selectedChat: action.payload,
            };
        // Returns the current state by default if the action type does not match any case
        default:
            return state;
    }
};

export default chatReducer;

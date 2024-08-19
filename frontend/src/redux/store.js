import { configureStore, combineReducers } from '@reduxjs/toolkit'; // Importing from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import chatReducer from './reducers/chatReducer';
import appointmentReducer from './reducers/appointmentReducer';

// Combining multiple reducers into a single root reducer
const rootReducer = combineReducers({
    chat: chatReducer,             // Manages the chat-related state
    appointment: appointmentReducer, // Manages the appointment-related state
});

// Creating the Redux store using `configureStore` from Redux Toolkit
// This automatically sets up the store with good defaults and allows adding middleware
const store = configureStore({
    reducer: rootReducer, 
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk).concat(logger), // Adding thunk and logger middleware
});

export default store;

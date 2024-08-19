import {
    FETCH_DOCTORS_REQUEST,
    FETCH_DOCTORS_SUCCESS,
    FETCH_DOCTORS_FAILURE, 
    FETCH_DOCTOR_SLOTS_REQUEST,
    FETCH_DOCTOR_SLOTS_SUCCESS,
    FETCH_DOCTOR_SLOTS_FAILURE,
    BOOK_APPOINTMENT_REQUEST,
    BOOK_APPOINTMENT_SUCCESS,
    BOOK_APPOINTMENT_FAILURE,
    APPOINTMENT_CANCEL_REQUEST,
    APPOINTMENT_CANCEL_SUCCESS,
    APPOINTMENT_CANCEL_FAILURE,
    APPOINTMENT_RESCHEDULE_REQUEST,
    APPOINTMENT_RESCHEDULE_SUCCESS,
    APPOINTMENT_RESCHEDULE_FAILURE,
    ADD_SLOTS_REQUEST,
    ADD_SLOTS_SUCCESS,
    ADD_SLOTS_FAILURE
} from '../actions/appointmentActions';

// Initial state of the appointment reducer, including doctors, doctor slots, loading state, and error handling
const initialState = {
    doctors: [],
    doctorSlots: [],
    loading: false,
    error: null,
};

const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
        // Handles the state when fetching doctors begins
        case FETCH_DOCTORS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        // Handles the state when doctors are successfully fetched
        case FETCH_DOCTORS_SUCCESS:
            return {
                ...state,
                loading: false,
                doctors: action.payload,
            };
        // Handles the state when fetching doctors fails
        case FETCH_DOCTORS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        // Handles the state when fetching doctor slots begins
        case FETCH_DOCTOR_SLOTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        // Handles the state when doctor slots are successfully fetched
        case FETCH_DOCTOR_SLOTS_SUCCESS:
            return {
                ...state,
                loading: false,
                doctorSlots: action.payload,
            };
        // Handles the state when fetching doctor slots fails
        case FETCH_DOCTOR_SLOTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        // Handles the state when booking an appointment begins
        case BOOK_APPOINTMENT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        // Handles the state when an appointment is successfully booked
        case BOOK_APPOINTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        // Handles the state when booking an appointment fails
        case BOOK_APPOINTMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        // Handles the state when canceling an appointment begins
        case APPOINTMENT_CANCEL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        // Handles the state when an appointment is successfully canceled
        case APPOINTMENT_CANCEL_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        // Handles the state when canceling an appointment fails
        case APPOINTMENT_CANCEL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        // Handles the state when rescheduling an appointment begins
        case APPOINTMENT_RESCHEDULE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        // Handles the state when an appointment is successfully rescheduled
        case APPOINTMENT_RESCHEDULE_SUCCESS:
            return {
                ...state,
                loading: false,
                doctorSlots: [...state.doctorSlots, action.payload] // Adds the rescheduled slot to doctorSlots
            };
        // Handles the state when rescheduling an appointment fails
        case APPOINTMENT_RESCHEDULE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        // Handles the state when adding slots begins
        case ADD_SLOTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        // Handles the state when slots are successfully added
        case ADD_SLOTS_SUCCESS:
            return {
                ...state,
                loading: false
            };
        // Handles the state when adding slots fails
        case ADD_SLOTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        // Returns the current state by default if the action type does not match any case
        default:
            return state;
    }
};

export default appointmentReducer;

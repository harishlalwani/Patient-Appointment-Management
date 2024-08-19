// Importing API functions from the utils/api module
import {
    fetchDoctors as fetchDoctorsApi, 
    fetchSlots as fetchDoctorsSlotsApi,
    bookAppointment as bookAppointmentApi,
    cancelAppointment as cancelAppointmentApi,
    rescheduleAppointment as rescheduleAppointmentApi,
    addSlots as addSlotsApi
 } from '../../utils/api';

// Action types for fetching doctors
export const FETCH_DOCTORS_REQUEST = 'FETCH_DOCTORS_REQUEST'; // Action type for initiating fetch doctors request
export const FETCH_DOCTORS_SUCCESS  = 'FETCH_DOCTORS_SUCCESS'; // Action type for successful fetch doctors request
export const FETCH_DOCTORS_FAILURE = 'FETCH_DOCTORS_FAILURE'; // Action type for failed fetch doctors request

// Action types for fetching doctor slots
export const FETCH_DOCTOR_SLOTS_REQUEST = 'FETCH_DOCTOR_SLOTS_REQUEST'; // Action type for initiating fetch doctor slots request
export const FETCH_DOCTOR_SLOTS_SUCCESS  = 'FETCH_DOCTOR_SLOTS_SUCCESS'; // Action type for successful fetch doctor slots request
export const FETCH_DOCTOR_SLOTS_FAILURE = 'FETCH_DOCTOR_SLOTS_FAILURE'; // Action type for failed fetch doctor slots request

// Action types for booking an appointment
export const BOOK_APPOINTMENT_REQUEST = 'BOOK_APPOINTMENT_REQUEST'; // Action type for initiating book appointment request
export const BOOK_APPOINTMENT_SUCCESS  = 'BOOK_APPOINTMENT_SUCCESS'; // Action type for successful book appointment request
export const BOOK_APPOINTMENT_FAILURE = 'BOOK_APPOINTMENT_FAILURE'; // Action type for failed book appointment request

// Action types for canceling an appointment
export const APPOINTMENT_CANCEL_REQUEST = 'APPOINTMENT_CANCEL_REQUEST'; // Action type for initiating appointment cancel request
export const APPOINTMENT_CANCEL_SUCCESS  = 'APPOINTMENT_CANCEL_SUCCESS'; // Action type for successful appointment cancel request
export const APPOINTMENT_CANCEL_FAILURE = 'APPOINTMENT_CANCEL_FAILURE'; // Action type for failed appointment cancel request

// Action types for rescheduling an appointment
export const APPOINTMENT_RESCHEDULE_REQUEST = 'APPOINTMENT_RESCHEDULE_REQUEST'; // Action type for initiating appointment reschedule request
export const APPOINTMENT_RESCHEDULE_SUCCESS  = 'APPOINTMENT_RESCHEDULE_SUCCESS'; // Action type for successful appointment reschedule request
export const APPOINTMENT_RESCHEDULE_FAILURE = 'APPOINTMENT_RESCHEDULE_FAILURE'; // Action type for failed appointment reschedule request

// Action types for adding slots
export const ADD_SLOTS_REQUEST = 'ADD_SLOTS_REQUEST'; // Action type for initiating add slots request
export const ADD_SLOTS_SUCCESS  = 'ADD_SLOTS_SUCCESS'; // Action type for successful add slots request
export const ADD_SLOTS_FAILURE = 'ADD_SLOTS_FAILURE'; // Action type for failed add slots request


// Action creator for fetching doctors
export const fetchDoctors = () => async (dispatch) => {
    dispatch({ type: FETCH_DOCTORS_REQUEST }); // Dispatching request action

    try {
        const response = await fetchDoctorsApi(); // Calling API to fetch doctors
        dispatch({
            type: FETCH_DOCTORS_SUCCESS,
            payload: response.data, // Dispatching success action with fetched data
        });
    } catch (error) {
        dispatch({
            type: FETCH_DOCTORS_FAILURE,
            error: error.message, // Dispatching failure action with error message
        });
    }
};

// Action creator for fetching doctor slots
export const fetchDoctorSlots = (doctorId) => async (dispatch) => {
    dispatch({ type: FETCH_DOCTOR_SLOTS_REQUEST }); // Dispatching request action

    try {
        const response = await fetchDoctorsSlotsApi(doctorId); // Calling API to fetch slots for a specific doctor
        dispatch({
            type: FETCH_DOCTOR_SLOTS_SUCCESS,
            payload: response.data, // Dispatching success action with fetched data
        });
    } catch (error) {
        dispatch({
            type: FETCH_DOCTOR_SLOTS_FAILURE,
            error: error.message, // Dispatching failure action with error message
        });
    }
};

// Action creator for booking an appointment
export const bookAppointment = (doctorId, slotId) => async (dispatch) => {
    dispatch({ type: BOOK_APPOINTMENT_REQUEST }); // Dispatching request action

    try {
        const response = await bookAppointmentApi({ doctorId, slotId }); // Calling API to book an appointment
        if(response.status == 201) { // Checking if the response status is 201 (Created)
            dispatch(fetchDoctorSlots(doctorId)); // Fetching updated doctor slots
        }
        dispatch({
            type: BOOK_APPOINTMENT_SUCCESS // Dispatching success action
        });
    } catch (error) {
        dispatch({
            type: BOOK_APPOINTMENT_FAILURE // Dispatching failure action
        });
    }
};

// Action creator for canceling an appointment
export const cancelAppointment = (doctorId, slotId) => async (dispatch) => {
    dispatch({ type: APPOINTMENT_CANCEL_REQUEST }); // Dispatching request action

    try {
        const response = await cancelAppointmentApi(slotId); // Calling API to cancel an appointment
        if(response.status == 200) { // Checking if the response status is 200 (OK)
            dispatch(fetchDoctorSlots(doctorId)); // Fetching updated doctor slots
        }
        dispatch({
            type: APPOINTMENT_CANCEL_SUCCESS // Dispatching success action
        });
    } catch (error) {
        dispatch({
            type: APPOINTMENT_CANCEL_FAILURE // Dispatching failure action
        });
    }
};

// Action creator for rescheduling an appointment
export const rescheduleAppointment = (doctorId, eventData) => async (dispatch) => {
    dispatch({ type: APPOINTMENT_RESCHEDULE_REQUEST }); // Dispatching request action

    try {
        const response = await rescheduleAppointmentApi(eventData.appointmentId, eventData); // Calling API to reschedule an appointment
        if(response.status == 201) { // Checking if the response status is 201 (Created)
            dispatch(fetchDoctorSlots(doctorId)); // Fetching updated doctor slots
        }
        dispatch({
            type: APPOINTMENT_RESCHEDULE_SUCCESS, // Dispatching success action
            payload: response.data // Dispatching success action with response data
        });
    } catch (error) {
        dispatch({
            type: APPOINTMENT_RESCHEDULE_FAILURE // Dispatching failure action
        });
    }
};

// Action creator for adding slots
export const addSlots = (doctorId, eventData) => async (dispatch) => {
    dispatch({ type: ADD_SLOTS_REQUEST }); // Dispatching request action

    try {
        const response = await addSlotsApi(eventData); // Calling API to add slots
        if(response.status == 200) { // Checking if the response status is 200 (OK)
            dispatch(fetchDoctorSlots(doctorId)); // Fetching updated doctor slots
        }
        dispatch({
            type: ADD_SLOTS_SUCCESS, // Dispatching success action
            payload: response.data // Dispatching success action with response data
        });
    } catch (error) {
        dispatch({
            type: ADD_SLOTS_FAILURE // Dispatching failure action
        });
    }
};

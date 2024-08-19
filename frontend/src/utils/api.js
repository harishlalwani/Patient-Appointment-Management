import axiosInstance from './axiosInstance';


export const registerUser = async (data) => {
    try {
        const response = await axiosInstance.post('/auth/register', data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (data) => {
    try {
        const response = await axiosInstance.post('/auth/login', data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const fetchProfile = async () => {
    try {
        const response = await axiosInstance.get('/auth/profile');
        return response;
    } catch (error) {
        throw error;
    }
};



// Doctor API endpoints
export const registerDoctor = async (data) => {
    try {
        const response = await axiosInstance.post('/doctors/register', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loginDoctor = async (data) => {
    try {
        const response = await axiosInstance.post('/doctors/login', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchDoctorProfile = async () => {
    try {
        const response = await axiosInstance.get('/doctors/profile');
        return response;
    } catch (error) {
        throw error;
    }
};

export const fetchAppointments = async () => {
    try {
        const response = await axiosInstance.get('/appointments');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const scheduleAppointment = async (data) => {
    try {
        const response = await axiosInstance.post('/appointments/schedule', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const rescheduleAppointment = async (id, data) => {
    try {
        const response = await axiosInstance.post(`/appointments/reschedule/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const cancelAppointment = async (id) => {
    try {
        const response = await axiosInstance.delete(`/appointments/cancel/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

// Save slot to backend
export const addSlots = async (slot) => {
    try {
        const response = await axiosInstance.post(`/slots`, slot);
        return response;
    } catch (error) {
        console.error('Error adding slot', error);
        throw error;
    }
};

// Fetch available slots (this can be used later for displaying available slots)
export const getSlots = async () => {
    try {
        const response = await axiosInstance.get(`/slots`);
        return response.data;
    } catch (error) {
        console.error('Error fetching slots', error);
        throw error;
    }
};


// Fetch list of doctors
export const fetchDoctors = async () => {
    try {
        const response = await axiosInstance.get(`/doctors`);
        return response;
    } catch (error) {
        console.error('Error fetching doctors', error);
        throw error;
    }
};

// Fetch list of doctors
export const fetchUsers = async () => {
    try {
        const response = await axiosInstance.get(`/users`);
        return response;
    } catch (error) {
        console.error('Error fetching doctors', error);
        throw error;
    }
};

// Fetch available slots for a specific doctor
export const fetchSlots = async (doctorId) => {
    try {
        const response = await axiosInstance.get(`/slots/doctor/${doctorId}`);
        return response;
    } catch (error) {
        console.error('Error fetching slots', error);
        throw error;
    }
};

// Book an appointment
export const bookAppointment = async (appointment) => {
    try {
        const response = await axiosInstance.post(`/appointments/schedule`, appointment);
        return response;
    } catch (error) {
        console.error('Error booking appointment', error);
        throw error;
    }
};

// Fetch available slots for a specific doctor
export const fetchMessagesApi = async (receiverId) => {
    try {
        const response = await axiosInstance.get(`/messages/${receiverId}`);
        return response;
    } catch (error) {
        console.error('Error fetching messages', error);
        throw error;
    }
};



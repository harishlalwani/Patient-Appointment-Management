import {fetchDoctorProfile, fetchProfile} from './api';

// Function to check if the user is logged in
export const isUserLoggedIn = async () => {
    try {
        // Retrieve token and userType from localStorage
        const token = localStorage.getItem('token');
        const userType = localStorage.getItem('userType');

        // If no token is found, user is not logged in
        if (!token) {
            return false;
        }
        // Check if the userType is "user"
        if(userType == "user") {
            // Fetch the profile of the user
            const response = await fetchProfile();

            // If the response status is not 200, user is not logged in
            if(response.status != 200)  {
                return false;
            }

            // Set the userType in the response data and return it
            response.data.userType = "user";
            return response.data;
        }
        else {
            // Fetch the profile of the doctor
            const response = await fetchDoctorProfile();

            // If the response status is not 200, user is not logged in
            if(response.status != 200)  {
                return false;
            }

            // Set the userType in the response data and return it
            response.data.userType = "doctor";
            return response.data;
        }
        
    } catch (error) {
        // Log the error and return false
        console.log('isUserLoggedIn', error);
        return false;
    }
};

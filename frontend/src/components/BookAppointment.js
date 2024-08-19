import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from '@fullcalendar/interaction';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDoctors, fetchDoctorSlots, bookAppointment, cancelAppointment, rescheduleAppointment } from '../redux/actions/appointmentActions';
import UserContext from '../context/UserContext';

const BookAppointment = () => {
    // State to store the selected doctor
    const [selectedDoctor, setSelectedDoctor] = useState('');
    // Fetch the user context
    const user = useContext(UserContext);
    // Initialize the dispatch function
    const dispatch = useDispatch();
    // Extract data from Redux store
    const { doctors, doctorSlots, loading, error } = useSelector((state) => state.appointment);

    // Fetch the list of doctors when the component mounts
    useEffect(() => {
        dispatch(fetchDoctors());
    }, []);

    // Handle change in selected doctor
    const handleDoctorChange = (event) => {
        setSelectedDoctor(event.target.value);
        // Fetch the available slots for the selected doctor
        dispatch(fetchDoctorSlots(event.target.value));
    };

    // Handle click on a slot
    // Function to handle the click on a calendar slot
    const handleSlotClick = async (info) => {
        
        // Get the start time of the slot
        let start = info.el.fcSeg.start;
        
        // Check if the slot has an appointment associated with it
        if(info.event.extendedProps && info.event.extendedProps.appointment) {
            // Ask for user confirmation to cancel the appointment
            const confirmCancelBooking = window.confirm(`Do you want to cancel this appointment?`);
            const appointment = info.event.extendedProps.appointment;
            
            // If user confirms the cancellation
            if(confirmCancelBooking) {
                try {
                    // Dispatch the cancel appointment action
                    dispatch(cancelAppointment(selectedDoctor, appointment._id ));
                    // Inform the user that the appointment was cancelled successfully
                    alert('Appointment cancelled successfully!');
                } catch (error) {
                    // Log the error and inform the user that the cancellation failed
                    console.error('Error cancel appointment:', error);
                    alert('Failed to cancel appointment');
                }
            }
        }
        else {
            // Ask for user confirmation to book an appointment on the selected slot
            const confirmBooking = window.confirm(`Do you want to book an appointment on ${start}?`);
            
            // If user confirms the booking
            if (confirmBooking) {
                try {
                    // Dispatch the book appointment action
                    dispatch(bookAppointment( selectedDoctor, info.event.id ));
                    // Inform the user that the appointment was booked successfully
                    alert('Appointment booked successfully!');
                } catch (error) {
                    // Log the error and inform the user that the booking failed
                    console.error('Error booking appointment:', error);
                    alert('Failed to book appointment');
                }
            }
        }
    };

    // Function to handle event changes (e.g., rescheduling an appointment)
    const handleEventChange = async (info) => {

        // Prepare the event data to be sent in the reschedule request
        const eventData = {
            title: 'Available Slot', // Title of the slot
            start: info.event.start, // Start time of the event
            end: info.event.end, // End time of the event
            allDay: false, // Indicates the event is not an all-day event
            user: info.event.extendedProps.appointment.user, // User associated with the appointment
            slotId: info.event.extendedProps.appointment.slotId, // Slot ID of the appointment
            doctorId: info.event.extendedProps.appointment.doctorId, // Doctor ID of the appointment
            appointmentId: info.event.extendedProps.appointment._id // Appointment ID
        };

        // Ask for user confirmation to reschedule the appointment
        const confirmCancelBooking = window.confirm(`Do you want to reschedule this appointment?`);
        if(confirmCancelBooking) {
            // If confirmed, dispatch the reschedule appointment action with the event data
            dispatch(rescheduleAppointment( eventData ));
        }
        else {
            // If not confirmed, revert the changes to the event
            info.revert();
        }
    }


    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Book an Appointment
            </Typography>

            <FormControl fullWidth margin="normal">
                <InputLabel>Select Doctor</InputLabel>
                <Select value={selectedDoctor} onChange={handleDoctorChange}>
                    {doctors && doctors.map((doctor) => (
                        <MenuItem key={doctor._id} value={doctor._id}>
                            {doctor.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {doctorSlots.length > 0 ? (
                <FullCalendar
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin, listPlugin]}
                    
                    initialView="timeGridWeek"
                    events={doctorSlots.map(slot => {
                            let event = {
                                id: slot._id,
                                title: slot.title,
                                start: slot.start,
                                end: slot.end,
                                editable: false

                            };
                            if(slot.appointment ) {
                                event.backgroundColor = "#12824D";
                                event.title = "Slot Booked";
                                event.extendedProps = { 
                                    appointment: slot.appointment
                                };
                    
                            } 
                            else {
                                event.title = "Available Slot";
                            }

                            if(slot.appointment && user.userType == "doctor" ) {
                                event.editable = true;
                            } 
                            return event;
                        }
                    )}
                    eventClick={handleSlotClick}
                    eventChange={handleEventChange}
                    editable={true}
                />
            ): null}
        </Container>
    );
};

export default BookAppointment;


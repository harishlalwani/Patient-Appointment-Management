import React, { useState, useEffect, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import multiMonthPlugin from '@fullcalendar/multimonth'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Button } from '@mui/material';
import { fetchDoctorSlots, rescheduleAppointment, addSlots } from '../redux/actions/appointmentActions';
import UserContext from '../context/UserContext';

const Slots = () => {
    const [events, setEvents] = useState([]);
    const user = useContext(UserContext);
    const dispatch = useDispatch();

    const { doctorSlots, loading, error } = useSelector((state) => state.appointment);
    
    useEffect(() => {
        if(user)
            dispatch(fetchDoctorSlots(user._id));
    }, [user]);

    // reschedule confirmed slot for doctor
    const handleEventChange = async (info) => {

        const eventData = {
            title: 'Available Slot',
            start: info.event.start,
            end: info.event.end,
            allDay: false,
            user: info.event.extendedProps.appointment.user,
            slotId: info.event.extendedProps.appointment.slotId,
            doctorId: info.event.extendedProps.appointment.doctorId,
            appointmentId: info.event.extendedProps.appointment._id
        };

        const confirmCancelBooking = window.confirm(`Do you want to reschedule this appointment?`);
        if(confirmCancelBooking) {
            dispatch(rescheduleAppointment(user._id, eventData ));
        }
        else {
            info.revert();
        }
    }

    // create slots for doctor
    const handleSelect = async (info) => {
        const response = window.confirm('Do you want add slots between '+ info.start + ' to ' +  info.end);

        if(response) {
            const eventData = {
                title: 'Available Slot',
                start: info.start,
                end: new Date(info.end).setHours(new Date(info.end).getHours()),
                allDay: false
            };

            dispatch(addSlots(user._id ,eventData));
        }
    }

    return (
        <Container>
            <Typography variant="h4" style={{ marginBottom: '20px' }}>
                Create Available Slots
            </Typography>
            {
                user && 
                <FullCalendar
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay, listWeek'
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

                            if(slot.appointment &&  user.userType == "doctor" ) {
                                event.editable = true;
                            } 
                            return event;
                        }
                    )}
                    select={handleSelect}
                    eventChange={handleEventChange}
                    editable={true}
                    selectable={user.userType == "doctor" ? true: false}
                />
            }
            
        </Container>
    );
};

export default Slots;

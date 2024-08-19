# Patient Appointment Management

## Overview

This project is a full-stack application with a React frontend, Node.js backend, and MongoDB for data storage. It includes features for user and doctor management, appointment scheduling, messaging, and more. The project demonstrates a modern web application architecture with JWT authentication, real-time communication using WebSockets, and a responsive design using Material-UI.

## Features

- **User Registration and Login:** Secure authentication with JWT.
- **Doctor Management:** Separate login and registration for doctors.
- **Appointment Management:** View, schedule, reschedule, and cancel appointments with calendar integration.
- **Real-time Messaging:** Chat functionality between users and doctors with WebSocket support.
- **Responsive Design:** Fully responsive UI using Material-UI.
- **Customizable Configuration:** Dynamic form rendering based on backend configuration.

## Tech Stack

- **Frontend:** React, Material-UI, FullCalendar
- **Backend:** Node.js, Express, JWT
- **Database:** MongoDB
- **Real-time Communication:** WebSocket
- **State Management:** Redux, Redux Thunk

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance running (local or cloud-based)

### Setup

#### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-repository.git
   cd your-repository/backend

2. **Install Dependencies:**

    ```bash
    npm install

3. **Create a .env File:**
    Create a .env file in the backend directory with the following content:

    ```bash
    PORT=3001
    MONGO_URI=mongodb://localhost:27017/mydatabase
    JWT_SECRET=your_jwt_secret  

4. **Start the Server**

    ```bash
    npm start


#### Frontend Setup

1. **Navigate to the Frontend Directory:**

   cd ../frontend

2. **Install Dependencies:**

    ```bash
    npm install

3. **Create a .env File:**
    Create a .env file in the backend directory with the following content:

    ```plaintext
    REACT_APP_API_URL=http://localhost:3001

4. **Start the Server**

    ```bash
    npm start


#### Running Tests

- **Backend Tests:**

    ```bash
    cd backend
    npm test

- **Frontend Tests:**

    ```bash
    cd frontend
    npm test


**API Endpoints**

- User Registration: POST /api/register
- User Login: POST /api/login
- Doctor Registration: POST /api/doctors/register
- Doctor Login: POST /api/doctors/login
- Appointments: GET /api/appointments/schedule, DELETE /api/appointments/cancel/:id, PUT /api/appointments/reschedule/:id, DELETE /api/appointments/:id
- Slots: GET /api/slots, GET /api/slots/doctor/:id, POST /api/slots
- Messaging: GET api/messages/:receiverId

**Frontend Components**

- Login Page: src/components/AuthTabs.js
- Profile Page: src/components/Profile.js
- Appointment Management: src/components/BookAppointment.js
- Chat System: src/components/ChatApp.js
- Slots Management: src/components/Slots.js
- Protected Routes: src/components/ProtectedRoute.js
- Navigation Bar: src/common/NavBar.js


#### Application Flow

**Doctor Flow**
Register
- registers on platform

Login
- logins to the platform

Slots
- creates slots on platform using calendar by selecting a section on any day. Click anywhere and drag down.
- this creates open slots for the doctor on a particular day.
- doctor can reschedule any booked appointment by clicking on booked appointment and draging it to desired date and time.

Chat
- Chat list all the users who have registered on platform as users ie non doctors.
- Doctor can select any user and send him a message. If he is available, he will reply.


**User Flow**
Register
- registers on platform

Login
- logins to the platform

Book Appointment
- Selects a doctor.
- This fetches available slots for the doctor.
- Clicks on any slot to bok appointment.
- If the user clicks oon booked appointment, platform will ask user if he wants to cancel it.

Chat
- Chat list all the doctors who have registered on platform as doctors.
- User can select any doctor and send him a message. If he is available, he will reply.








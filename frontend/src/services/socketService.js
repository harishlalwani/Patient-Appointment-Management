import io from 'socket.io-client';

class SocketService {
    // Initializes the socket property to null
    socket = null;

    // Establishes a socket connection with authentication using the provided token
    connect(token) {
        this.socket = io('http://localhost:3001', {
            auth: { token },  // Sends the token for authentication
        });

        // Logs a message when the connection to the socket server is established
        this.socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        // Logs a message when the connection to the socket server is lost
        this.socket.on('disconnect', () => {
            console.log('Disconnected from socket server');
        });
    }

    // Registers an event listener for a specific event and executes the callback when the event occurs
    on(event, callback) {
        if (!this.socket) return;  // Ensures the socket is initialized before adding an event listener
        this.socket.on(event, callback);
    }

    // Emits an event with the given data to the socket server
    emit(event, data) {
        if (!this.socket) return;  // Ensures the socket is initialized before emitting an event
        this.socket.emit(event, data);
    }

    // Disconnects the socket connection if it is established
    disconnect() {
        if (!this.socket) return;  // Ensures the socket is initialized before attempting to disconnect
        if (this.socket.connected) // Disconnects only if the socket is currently connected
            this.socket.disconnect();
    }
}

// Exporting an instance of SocketService to maintain a single connection across the application
export default new SocketService();

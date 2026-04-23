import { Server } from "socket.io";
import { User } from './models/user.model.js';
import CaptainModel from './models/captain.model.js';

let io;

export function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:5173',
            methods: [ 'GET', 'POST' ]
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);


        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (userType === 'user') {
                await User.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await CaptainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });


        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.lat || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await CaptainModel.findByIdAndUpdate(userId, {
                location: {
                    lat: location.lat,
                    lng: location.lng
                }
            });
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

export const sendMessageToSocketId = (socketId, messageObject) => {

console.log(messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    let socket;

    try {
        const socketUrl = import.meta.env.VITE_BASE_URL;
        if (!socketUrl) {
            console.error('VITE_BASE_URL is not defined in environment variables');
            return (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    fontSize: '18px',
                    color: 'red'
                }}>
                    Error: VITE_BASE_URL not configured
                </div>
            );
        }
        socket = io(socketUrl);
    } catch (error) {
        console.error('Socket connection error:', error);
    }

    useEffect(() => {
        if (!socket) return;
        
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        }
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
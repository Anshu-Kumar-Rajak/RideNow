import dotenv from 'dotenv';
import connectDB from './db/index.js';
import http from 'http';
import { app } from './app.js';
import { initializeSocket } from './socket.js';

dotenv.config({
    path: './.env'
});

const server = http.createServer(app);
initializeSocket(server);

connectDB().then(()=>{
    server.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
});


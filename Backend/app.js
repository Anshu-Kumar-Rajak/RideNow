import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import {userRouter} from './routes/user.routes.js';
import {captionRouter} from './routes/captain.routes.js';
import {router as mapsRouter} from './routes/maps.routes.js';
import {router as rideRouter} from './routes/ride.routes.js';

app.use('/users', userRouter);
app.use('/captains', captionRouter);
app.use('/maps', mapsRouter);
app.use('/rides', rideRouter);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message
  });
});

export {app}


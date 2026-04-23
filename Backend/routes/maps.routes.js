import { Router } from 'express';
import { authUser } from '../middlewares/auth.middleware.js';
import * as mapController from '../controllers/map.controller.js';
import { query } from 'express-validator';

const router = Router();

router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authUser,
    mapController.getCoordinates
);

router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authUser,
    mapController.getDistanceTime
)

router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authUser,
    mapController.getAutoCompleteSuggestions
)



export { router };
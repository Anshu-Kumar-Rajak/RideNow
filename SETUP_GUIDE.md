# Environment Configuration Guide

## Backend (.env)
```
PORT=3000
DB_URL=mongodb+srv://username:password@cluster.mongodb.net
CORS_ORIGIN=http://localhost:5173
JWT_SECRET_KEY=your_secret_key_here
JWT_EXPIRY=7d
GOOGLE_MAPS_API=your_google_maps_api_key
FRONTEND_URL=http://localhost:5173
```

## Frontend (.env)
```
VITE_BASE_URL=http://localhost:3000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Setup Steps

1. **Install Dependencies**
   ```bash
   # Backend
   cd Backend
   npm install
   
   # Frontend
   cd frontend
   npm install
   ```

2. **Configure Environment Variables**
   - Copy and configure the `.env` files in both Backend and frontend folders
   - Get MongoDB connection string from MongoDB Atlas
   - Get Google Maps API key from Google Cloud Console

3. **Start Backend Server**
   ```bash
   cd Backend
   npm start
   ```

4. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```

## Fixed Issues

### Backend Fixes
- ✅ Added missing `BlacklistToken` import in user.controller.js
- ✅ Fixed error handling in auth.middleware.js (line 51)
- ✅ Standardized coordinate field names from `ltd` to `lat`
- ✅ Fixed MongoDB geosphere query coordinate order
- ✅ Standardized vehicle type enum to `['car', 'moto', 'auto']`
- ✅ Wrapped captain controller functions with `asyncHandler`
- ✅ Added `await` to user service `User.create()`
- ✅ Fixed model references in ride.model.js ('User' and 'Captain')
- ✅ Added geospatial index to captain model location field
- ✅ Updated captain controller to use ApiResponse for consistency
- ✅ Fixed Socket.io CORS to use environment variable

### Frontend Fixes
- ✅ Fixed socket event listeners to use useEffect with cleanup
- ✅ Fixed memory leaks in intervals and socket listeners
- ✅ Fixed token key from 'captain-token' to 'token'
- ✅ Added error handling to SocketContext
- ✅ Fixed data structure mismatches (fullName → fullname, firstName → firstname)
- ✅ Fixed API response data extraction in wrapper components
- ✅ Updated captain login response handling

## Database Indexes

The following indexes are automatically created:
- Captain model: 2dsphere index on location field (for geospatial queries)

## Key API Endpoints

### User Routes
- POST `/users/register` - Register new user
- POST `/users/login` - Login user
- GET `/users/profile` - Get user profile (requires auth)
- POST `/users/logout` - Logout user (requires auth)

### Captain Routes
- POST `/captains/register` - Register new captain
- POST `/captains/login` - Login captain
- GET `/captains/profile` - Get captain profile (requires auth)
- POST `/captains/logout` - Logout captain (requires auth)

### Ride Routes
- POST `/rides/create` - Create a new ride (requires user auth)
- GET `/rides/get-fare` - Get fare estimate
- POST `/rides/confirm` - Confirm ride (requires captain auth)
- GET `/rides/start-ride` - Start ride (requires captain auth)
- POST `/rides/end-ride` - End ride (requires captain auth)

### Maps Routes
- GET `/maps/get-suggestions` - Get location suggestions
- GET `/maps/get-distance-time` - Get distance and time between locations

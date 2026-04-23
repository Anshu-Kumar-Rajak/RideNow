# Testing Guide for RideNow Application

## Prerequisites
- MongoDB Atlas account with connection string
- Google Maps API key
- Node.js and npm installed
- Both backend and frontend running

## Backend Testing

### 1. Start Backend Server
```bash
cd Backend
npm start
```

Expected output:
```
Server is running on port 3000
Connected to DB
```

### 2. Test User Endpoints

#### Register User
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "password123"
  }'
```

Expected Response:
```json
{
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "user": {...},
    "token": "jwt_token_here"
  },
  "success": true
}
```

#### Login User
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Get User Profile
```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer jwt_token_here"
```

### 3. Test Captain Endpoints

#### Register Captain
```bash
curl -X POST http://localhost:3000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane@example.com",
    "password": "password123",
    "vehicle": {
      "color": "white",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

Expected: Similar response as user registration

### 4. Test Ride Endpoints

#### Create Ride
```bash
curl -X POST http://localhost:3000/rides/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer user_jwt_token" \
  -d '{
    "pickup": "123 Main St",
    "destination": "456 Oak Ave",
    "vehicleType": "car"
  }'
```

#### Get Fare
```bash
curl -X GET "http://localhost:3000/rides/get-fare?pickup=123%20Main%20St&destination=456%20Oak%20Ave" \
  -H "Authorization: Bearer user_jwt_token"
```

#### Confirm Ride
```bash
curl -X POST http://localhost:3000/rides/confirm \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer captain_jwt_token" \
  -d '{
    "rideId": "ride_id_from_create_response"
  }'
```

### 5. Test Maps Endpoints

#### Get Suggestions
```bash
curl -X GET "http://localhost:3000/maps/get-suggestions?input=New%20York" \
  -H "Authorization: Bearer jwt_token"
```

#### Get Distance and Time
```bash
curl -X GET "http://localhost:3000/maps/get-distance-time?origin=123%20Main%20St&destination=456%20Oak%20Ave" \
  -H "Authorization: Bearer jwt_token"
```

---

## Frontend Testing

### 1. Start Frontend Server
```bash
cd frontend
npm run dev
```

Expected: Vite server starts on http://localhost:5173

### 2. Test User Flow

#### Sign Up
- Navigate to http://localhost:5173
- Click "Sign Up"
- Fill in:
  - First Name
  - Last Name
  - Email
  - Password
- Click "Sign Up"
- Expected: Redirected to home page with user logged in

#### Login
- Navigate to http://localhost:5173/login
- Fill in email and password
- Expected: Redirected to home page

#### Find Trip
- On home page, enter pickup and destination
- Click "Find Trip"
- Select vehicle type
- Confirm ride
- Expected: Wait for captain to accept

### 3. Test Captain Flow

#### Sign Up
- Navigate to http://localhost:5173/captain-signup
- Fill in captain details
- Fill in vehicle information
- Click "Sign Up"
- Expected: Redirected to captain home

#### Accept Ride
- On captain home, wait for ride notifications
- Click on available ride
- Click "Accept Ride"
- Expected: Ride confirmed notification

### 4. Test Real-Time Features

#### Socket Connection
- Check browser console for: "Connected to server"
- Multiple users: One user requests ride, captain should receive notification

#### Location Tracking
- Captain should see live tracking when ride starts
- Location updates every 10 seconds

---

## Integration Testing Checklist

### User Journey
- [ ] User can register
- [ ] User can login
- [ ] User profile loads correctly
- [ ] User can request a ride
- [ ] User sees available captains
- [ ] User can confirm ride
- [ ] User sees live tracking during ride

### Captain Journey
- [ ] Captain can register with vehicle details
- [ ] Captain can login
- [ ] Captain profile loads correctly
- [ ] Captain receives ride notifications
- [ ] Captain can accept rides
- [ ] Captain can see pickup/dropoff locations
- [ ] Captain can end ride

### Real-Time Features
- [ ] Socket connects successfully
- [ ] Notifications delivered in real-time
- [ ] Location updates properly
- [ ] Ride status updates properly

### Error Handling
- [ ] Invalid credentials show error
- [ ] Network errors handled gracefully
- [ ] Missing environment variables caught
- [ ] Invalid data types rejected

---

## Common Issues and Solutions

### Backend Won't Start
**Issue**: `Port 3000 already in use`
**Solution**: 
```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

### MongoDB Connection Failed
**Issue**: `Failed to connect to the database`
**Solution**:
- Verify DB_URL in .env
- Check MongoDB Atlas IP whitelist
- Ensure VPN/Network allows MongoDB connection

### Socket Connection Failed
**Issue**: `Could not connect to server`
**Solution**:
- Verify VITE_BASE_URL in frontend .env
- Check backend is running
- Verify CORS settings in backend

### Google Maps Not Working
**Issue**: Map not displaying or suggestions not working
**Solution**:
- Verify GOOGLE_MAPS_API key in backend .env
- Verify VITE_GOOGLE_MAPS_API_KEY in frontend .env
- Check API key has required permissions enabled

### Ride Not Showing on Captain Side
**Issue**: Captain doesn't receive new ride notifications
**Solution**:
- Check captain has joined socket
- Verify captain is active (status = 'active')
- Check location is set correctly
- Verify captain is within search radius

---

## Performance Testing

### Load Testing
- Test with multiple simultaneous users
- Monitor server memory and CPU usage
- Check database query performance

### Stress Testing
- Send multiple requests rapidly
- Check error handling under load
- Verify graceful degradation

---

## Security Testing

### Authentication
- [ ] JWT tokens properly validated
- [ ] Expired tokens rejected
- [ ] Invalid tokens rejected
- [ ] Blacklisted tokens rejected

### Authorization
- [ ] Users can't access captain endpoints
- [ ] Captains can't access user endpoints
- [ ] Profile endpoints require authentication

### Data Validation
- [ ] Invalid email rejected
- [ ] Weak passwords rejected
- [ ] Missing required fields rejected
- [ ] SQL injection attempts blocked

---

## Deployment Checklist

Before deploying to production:
- [ ] Update .env with production values
- [ ] Enable HTTPS
- [ ] Set secure CORS origin to production domain
- [ ] Update JWT secret key
- [ ] Test all endpoints thoroughly
- [ ] Enable database backups
- [ ] Set up monitoring and logging
- [ ] Test email notifications (if implemented)
- [ ] Verify all environment variables

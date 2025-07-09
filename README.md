Real-Time Stock Market Data Visualization Dashboard
Overview: This project is a MERN stack dashboard that displays live stock market data and historical trends using Alpha Vantage API.

## Features
- Real-time updates via Socket.IO
- Interactive historical line charts
- Color-coded indicators for price changes
- Responsive design

## Technologies
- MongoDB (not strictly necessary in this version)
- Express.js
- React.js
- Node.js
- Socket.IO
- Chart.js

##Setup Instructions: backend
1. Navigate to `backend/`:
cd backend

2. Install dependencies:
npm install

3. Create a `.env` file:
ALPHA_VANTAGE_API_KEY=YOUR_API_KEY
PORT=5000

4. Start the server:
npm start

### Frontend:
1. Navigate to `frontend/`:
cd frontend

2. Install dependencies:
npm install

3. Start the React app:
npm start

## Testing: 
For the backend, I used Jest and Supertest to verify the REST API returns correct data and errors.
For the frontend, I wrote unit tests with React Testing Library to validate rendering of stock cards and the chart.

## Notes
- The polling interval is set to 60 seconds due to API rate limits.


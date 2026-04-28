# Weather Dashboard - Frontend

This is the frontend for the Weather Dashboard project, built with **Vue 3**, **TypeScript**, and **Vite**. It provides a real-time weather monitoring interface with live updates and short-term forecasts.

## Features
- **Real-time Weather Data**: Displays current temperature, conditions, and location-specific details.
- **8-Hour Forecast**: Visualize upcoming weather trends at a glance.
- **Live Updates**: Integrates with a NestJS backend via WebSockets for instantaneous data synchronization.
- **Responsive Design**: Modern and clean interface that works across various devices.

![App Screenshot](./public/screenshots/app-screenshot.png)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. Clone the repository and navigate to the `frontend` directory:
   ```bash
   cd weather/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your backend WebSocket URL:
   ```bash
   VITE_WEBSOCKET_URL=ws://localhost:8080
   ```

### Running the Project
To start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173/`.

**Note**: Ensure the [backend](../backend/README.md) is running to receive real-time weather updates.

## Scripts
- `npm run dev`: Starts the development server using Vite.
- `npm run build`: Compiles and minifies for production.
- `npm run preview`: Locally preview the production build.
- `npm run test`: Runs unit tests using Vitest.


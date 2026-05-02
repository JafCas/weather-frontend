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
3. Create a `.env` file with your backend URL:

   ```bash
   # Option 1 (Cloud Run / HTTP polling)
   VITE_WEATHER_API_URL=https://weather-service-287683122914.us-central1.run.app/weather
   VITE_WEATHER_API_AUTH_TOKEN=your_identity_token

   # Option 2 (local WebSocket)
   VITE_WEBSOCKET_URL=ws://localhost:8080
   ```

### Environment Configuration

The project uses `.env.local` to manage your environment variables. You don't need to create this manually; the development script will handle it for you.

#### Switching Backend Environments

You can toggle between the local backend and the deployed cloud backend using our selection tool. This is automatically triggered when you run the development server, but you can also run it independently:

```bash
npm run dev
```

Options include:

1. **Localhost**: `ws://localhost:3000` (Use when running the backend locally)
2. **Deployed**: `wss://weather-service-ijfebkkxsa-uc.a.run.app` (Use the cloud-hosted backend)

### Running the Project

To start the development server:

```bash
npm run dev
```

When you run this command, you will first be prompted to select your backend source. After making a selection, the Vite development server will start at `http://localhost:5173/`.

Optional overrides:

```bash
# Provide the full Authorization header value, e.g. "Bearer <token>"
VITE_WEATHER_API_AUTH_HEADER=Bearer your_identity_token

# Polling interval in milliseconds (default: 60000)
VITE_WEATHER_POLL_INTERVAL_MS=60000
```

The application will be available at `http://localhost:5173/`. (Use `--host` if you need to access it from other devices on your network).

**Note**: Ensure the [backend](../backend/README.md) is running to receive real-time weather updates.

## Scripts

- `npm run dev`: Prompts for backend selection and starts the development server.
- `npm run backend-select`: Toggles the backend target (`.env.local`).
- `npm run build`: Compiles and minifies for production.
- `npm run preview`: Locally preview the production build.
- `npm run test`: Runs unit tests using Vitest.

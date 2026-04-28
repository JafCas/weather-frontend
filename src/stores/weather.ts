import { defineStore } from 'pinia';

export interface WeatherData {
  current: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
  forecast: Array<{
    time: string;
    temperature: number;
    weathercode: number;
  }>;
}

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    weather: null as WeatherData | null,
    isConnected: false,
    socket: null as WebSocket | null,
  }),
  actions: {
    connect() {
      if (this.socket) return;
      const wsUrl = import.meta.env.VITE_WEBSOCKET_URL as string | undefined;
      if (!wsUrl) {
        console.error('Missing VITE_WEBSOCKET_URL environment variable');
        return;
      }

      this.socket = new WebSocket(wsUrl);
      
      this.socket.onopen = () => {
        this.isConnected = true;
        console.log('Connected to Weather WebSocket');
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'weather_update') {
            this.weather = data.data;
          }
        } catch (error) {
          console.error('Failed to parse websocket message', error);
        }
      };

      this.socket.onclose = () => {
        this.isConnected = false;
        this.socket = null;
        console.log('Disconnected from Weather WebSocket. Reconnecting in 5s...');
        setTimeout(() => this.connect(), 5000);
      };
    },
    disconnect() {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }
    }
  }
});

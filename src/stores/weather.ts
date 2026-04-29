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

const getAuthHeaders = () => {
  const headers = new Headers();
  const authHeader = import.meta.env.VITE_WEATHER_API_AUTH_HEADER as string | undefined;
  const authToken = import.meta.env.VITE_WEATHER_API_AUTH_TOKEN as string | undefined;

  if (authHeader) {
    headers.set('Authorization', authHeader);
  } else if (authToken) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }

  return headers;
};

const normalizeWeatherData = (data: any): WeatherData | null => {
  if (!data) return null;

  if (data.current && Array.isArray(data.forecast)) {
    return data as WeatherData;
  }

  const current = data.current_weather ?? data.current ?? data;
  if (typeof current?.temperature === 'number') {
    return {
      current: {
        temperature: current.temperature,
        windspeed: current.windspeed ?? 0,
        weathercode: current.weathercode ?? 0,
      },
      forecast: Array.isArray(data.forecast) ? data.forecast : [],
    };
  }

  return null;
};

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    weather: null as WeatherData | null,
    isConnected: false,
    socket: null as WebSocket | null,
    pollIntervalId: null as number | null,
  }),
  actions: {
    connect() {
      if (this.socket) return;
      if (this.pollIntervalId) return;

      const apiUrl = import.meta.env.VITE_WEATHER_API_URL as string | undefined;
      if (apiUrl) {
        this.startPolling(apiUrl);
        return;
      }

      const wsUrl = import.meta.env.VITE_WEBSOCKET_URL as string | undefined;
      if (!wsUrl) {
        console.error('Missing VITE_WEATHER_API_URL or VITE_WEBSOCKET_URL environment variable');
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
    async startPolling(apiUrl: string) {
      const pollIntervalMs = Number(import.meta.env.VITE_WEATHER_POLL_INTERVAL_MS) || 60000;

      const fetchWeather = async () => {
        try {
          const response = await fetch(apiUrl, {
            headers: getAuthHeaders(),
          });

          if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
          }

          const data = await response.json();
          const normalized = normalizeWeatherData(data);

          if (normalized) {
            this.weather = normalized;
            this.isConnected = true;
          } else {
            console.warn('Weather API returned an unexpected payload.');
          }
        } catch (error) {
          this.isConnected = false;
          console.error('Failed to fetch weather data', error);
        }
      };

      await fetchWeather();
      this.pollIntervalId = window.setInterval(fetchWeather, pollIntervalMs);
    },
    disconnect() {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }

      if (this.pollIntervalId) {
        window.clearInterval(this.pollIntervalId);
        this.pollIntervalId = null;
      }
    }
  }
});

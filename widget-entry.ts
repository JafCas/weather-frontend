import { createApp } from 'vue';
import { createPinia } from 'pinia';
import i18n from './src/i18n';
import WeatherWidget from './src/components/WeatherWidget.vue';
import { useWeatherStore } from './src/stores/weather';
import './src/style.css'; // Include the CSS for the widget

export interface WidgetConfig {
  selector: string;
  apiUrl?: string;
}

export function initWeatherWidget(config: WidgetConfig) {
  const app = createApp(WeatherWidget);
  const pinia = createPinia();
  
  app.use(pinia);
  app.use(i18n);

  const el = document.querySelector(config.selector);
  if (!el) {
    console.error(`[WeatherWidget] Could not find element with selector: ${config.selector}`);
    return;
  }
  
  // Mount the Vue application to the target element
  app.mount(el);

  // Initialize data connection
  const store = useWeatherStore();
  
  // Allow parent app to override the backend URL if provided
  if (config.apiUrl) {
    store.startPolling(config.apiUrl);
  } else {
    // Fallback to the environment variables hardcoded during build time
    store.connect();
  }
}

// Bind to window object for easy CDN usage
if (typeof window !== 'undefined') {
  (window as any).WeatherWidget = {
    init: initWeatherWidget
  };
}

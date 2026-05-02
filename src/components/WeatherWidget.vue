<script setup lang="ts">
import { computed } from 'vue';
import { useWeatherStore } from '../stores/weather';
import { getWeatherIcon } from '../utils/weather';
import * as icons from 'lucide-vue-next';

const weatherStore = useWeatherStore();

const weather = computed(() => weatherStore.weather?.current);
const IconComponent = computed(() => {
  if (!weather.value) return icons.Loader2;
  const iconName = getWeatherIcon(weather.value.weathercode);
  return (icons as any)[iconName] || icons.Sun;
});
</script>

<template>
  <div class="weather-widget glass-panel">
    <div class="widget-header">
      <h2>Benito Juarez, MX</h2>
      <div v-if="weatherStore.isConnected" class="status-indicator online"></div>
      <div v-else class="status-indicator offline"></div>
    </div>
    
    <div v-if="weather" class="widget-body">
      <component :is="IconComponent" :size="80" class="weather-icon" stroke-width="1.5" />
      <div class="temperature">
        {{ Math.round(weather.temperature) }}°
      </div>
    </div>
    
    <div v-else class="widget-loading">
      <component :is="IconComponent" :size="48" class="loading-spinner" />
      <p>Loading real-time data...</p>
    </div>
  </div>
</template>

<style scoped>
.weather-widget {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-bottom: 1.5rem;
}

@media (min-width: 1024px) {
  .weather-widget {
    margin-bottom: 0;
    min-width: 320px;
  }
}

.widget-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1.5rem;
}

.widget-header h2 {
  font-size: 1.25rem;
  font-weight: 500;
}

@media (min-width: 768px) {
  .widget-header h2 {
    font-size: 1.5rem;
  }
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 8px currentColor;
}

.online { color: #4ade80; background: #4ade80; }
.offline { color: #f87171; background: #f87171; }

.widget-body {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.temperature {
  font-size: 4rem;
  font-weight: 300;
  line-height: 1;
}

@media (min-width: 768px) {
  .temperature {
    font-size: 5rem;
  }
}

.weather-icon {
  color: var(--accent);
  filter: drop-shadow(0 0 12px rgba(110, 231, 183, 0.5));
}

.widget-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0;
}

.loading-spinner {
  animation: spin 2s linear infinite;
  color: var(--accent);
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}
</style>

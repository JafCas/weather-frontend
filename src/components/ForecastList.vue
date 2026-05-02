<script setup lang="ts">
import { computed } from 'vue';
import { useWeatherStore } from '../stores/weather';
import { getWeatherIcon, formatTime } from '../utils/weather';
import * as icons from 'lucide-vue-next';

const weatherStore = useWeatherStore();

const forecast = computed(() => weatherStore.weather?.forecast || []);

const getIcon = (code: number) => {
  const iconName = getWeatherIcon(code);
  return (icons as any)[iconName] || icons.Sun;
};
</script>

<template>
  <div class="forecast-list glass-panel">
    <h3>8-Hour Forecast</h3>
    <div class="forecast-container" v-if="forecast.length > 0">
      <div v-for="item in forecast" :key="item.time" class="forecast-item glass-item">
        <span class="time">{{ formatTime(item.time) }}</span>
        <component :is="getIcon(item.weathercode)" :size="24" class="icon" />
        <span class="temp">{{ Math.round(item.temperature) }}°</span>
      </div>
    </div>
    <div v-else class="forecast-loading">
      Waiting for data...
    </div>
  </div>
</template>

<style scoped>
.forecast-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 600px;
}

.forecast-list h3 {
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  text-align: center;
}

.forecast-container {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  /* hide scrollbar for cleaner look */
  scrollbar-width: none;
}

.forecast-container::-webkit-scrollbar {
  display: none;
}

.forecast-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  min-width: 80px;
}

.time {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.icon {
  color: var(--accent);
}

.temp {
  font-size: 1.25rem;
  font-weight: 500;
}

.forecast-loading {
  text-align: center;
  color: var(--text-secondary);
  padding: 2rem;
}
</style>

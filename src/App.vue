<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useWeatherStore } from './stores/weather';
import WeatherWidget from './components/WeatherWidget.vue';
import ForecastList from './components/ForecastList.vue';

const weatherStore = useWeatherStore();

onMounted(() => {
  weatherStore.connect();
});

onUnmounted(() => {
  weatherStore.disconnect();
});
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>real_time_weather</h1>
    </header>
    <main>
      <WeatherWidget />
      <ForecastList />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 1rem;
}

@media (min-width: 768px) {
  .app-container {
    padding: 2rem;
  }
}

.app-header {
  margin-bottom: 3rem;
  text-align: center;
}

.app-header h1 {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(to right, #ffffff, var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}

@media (min-width: 768px) {
  .app-header h1 {
    font-size: 2.5rem;
  }
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  main {
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    gap: 3rem;
  }
}
</style>

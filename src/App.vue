<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { useWeatherStore } from "./stores/weather";
import WeatherWidget from "./components/WeatherWidget.vue";
import ForecastList from "./components/ForecastList.vue";

const weatherStore = useWeatherStore();
const { t, locale } = useI18n();
const languages = [
  { code: 'en', key: 'language.en' },
  { code: 'es', key: 'language.es' },
  { code: 'fr', key: 'language.fr' },
];
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
      <div class="header-content">
        <h1>{{ t('app.title') }}</h1>
        <div class="lang-switcher glass-item">
          <select v-model="locale" class="lang-select">
            <option v-for="lang in languages" :key="lang.code" :value="lang.code">
              {{ t(lang.key) }}
            </option>
          </select>
        </div>
      </div>
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
  width: 100%;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
}

@media (min-width: 768px) {
  .header-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.lang-switcher {
  padding: 0.5rem 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.lang-select {
  background: transparent;
  color: var(--text-primary);
  border: none;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
  font-family: inherit;
}

.lang-select option {
  background: #1e293b;
  color: #f1f5f9;
}

.app-header h1 {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(to right, #ffffff, var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
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

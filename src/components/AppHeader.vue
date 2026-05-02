<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const languages = [
  { code: "en", key: "language.en" },
  { code: "es", key: "language.es" },
  { code: "fr", key: "language.fr" },
];
</script>

<template>
  <div class="header-content">
    <h1>{{ t("app.title") }}</h1>
    <div class="lang-switcher glass-item">
      <select v-model="locale" class="lang-select">
        <option v-for="lang in languages" :key="lang.code" :value="lang.code">
          {{ t(lang.key) }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  margin-bottom: 1.5rem;
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
</style>

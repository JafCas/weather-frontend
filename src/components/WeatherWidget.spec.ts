import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import WeatherWidget from './WeatherWidget.vue';
import { useWeatherStore } from '../stores/weather';

describe('WeatherWidget.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders loading state initially', () => {
    const wrapper = mount(WeatherWidget);
    expect(wrapper.text()).toContain('Loading real-time data...');
  });

  it('renders weather data when available', () => {
    const store = useWeatherStore();
    store.weather = {
      current: {
        temperature: 25,
        windspeed: 10,
        weathercode: 0,
      },
      forecast: [],
    };
    store.isConnected = true;

    const wrapper = mount(WeatherWidget);
    expect(wrapper.text()).toContain('Benito Juarez, MX');
    expect(wrapper.text()).toContain('25°');
    expect(wrapper.find('.online').exists()).toBe(true);
  });
});

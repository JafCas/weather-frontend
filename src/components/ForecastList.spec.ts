import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import ForecastList from './ForecastList.vue';
import { useWeatherStore } from '../stores/weather';

describe('ForecastList.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders loading state initially', () => {
    const wrapper = mount(ForecastList);
    expect(wrapper.text()).toContain('Waiting for data...');
  });

  it('renders forecast data', () => {
    const store = useWeatherStore();
    store.weather = {
      current: { temperature: 25, windspeed: 10, weathercode: 0 },
      forecast: [
        { time: '2023-10-10T10:00', temperature: 20, weathercode: 0 },
        { time: '2023-10-10T11:00', temperature: 22, weathercode: 1 },
      ],
    };

    const wrapper = mount(ForecastList);
    expect(wrapper.text()).toContain('8-Hour Forecast');
    expect(wrapper.text()).toContain('20°');
    expect(wrapper.text()).toContain('22°');
    expect(wrapper.findAll('.forecast-item').length).toBe(2);
  });
});

export const getWeatherIcon = (code: number) => {
  // WMO Weather interpretation codes (WW)
  switch (true) {
    case code === 0:
      return 'Sun'; // Clear sky
    case code === 1 || code === 2 || code === 3:
      return 'CloudSun'; // Mainly clear, partly cloudy, and overcast
    case code >= 45 && code <= 48:
      return 'CloudFog'; // Fog and depositing rime fog
    case code >= 51 && code <= 55:
      return 'CloudDrizzle'; // Drizzle: Light, moderate, and dense intensity
    case code >= 56 && code <= 57:
      return 'CloudRain'; // Freezing Drizzle: Light and dense intensity
    case code >= 61 && code <= 65:
      return 'CloudRain'; // Rain: Slight, moderate and heavy intensity
    case code >= 66 && code <= 67:
      return 'CloudSnow'; // Freezing Rain: Light and heavy intensity
    case code >= 71 && code <= 77:
      return 'Snowflake'; // Snow fall: Slight, moderate, and heavy intensity
    case code >= 80 && code <= 82:
      return 'CloudRain'; // Rain showers: Slight, moderate, and violent
    case code >= 85 && code <= 86:
      return 'CloudSnow'; // Snow showers slight and heavy
    case code >= 95:
      return 'CloudLightning'; // Thunderstorm: Slight or moderate
    case code >= 96 && code <= 99:
      return 'CloudLightning'; // Thunderstorm with slight and heavy hail
    default:
      return 'Sun';
  }
};

export const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

import axios from 'axios';
import { useState, useCallback } from 'react';
import { WeatherData } from '../types/WeatherTypes';

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const useWeatherApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherByCity = useCallback(
    async (cityName: string): Promise<WeatherData | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(BASE_URL, {
          params: {
            q: cityName,
            appid: API_KEY,
            units: 'metric',
          },
        });

        return response.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unexpected error occurred';

        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { fetchWeatherByCity, loading, error };
};

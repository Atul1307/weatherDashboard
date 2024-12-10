import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CityCard from './components/CityCard';
import { useWeatherApi } from './hooks/useWeatherApi.ts';
import { WeatherData } from './types/WeatherTypes.ts';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

const App: React.FC = () => {
  const [cities, setCities] = useState<WeatherData[]>(() => {
    // Load cities from local storage on initial render
    const savedCities = localStorage.getItem('weatherCities');
    return savedCities ? JSON.parse(savedCities) : [];
  });
  const [pincodeState, setPincodeState] = useState<{ [key: string]: string }>(
    () => {
      // Load search strings (pincodes) from local storage
      const savedPincodes = localStorage.getItem('weatherPincodes');
      return savedPincodes ? JSON.parse(savedPincodes) : {};
    }
  );

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const { fetchWeatherByCity, loading, error } = useWeatherApi();

  // Save cities to local storage whenever the cities array changes
  useEffect(() => {
    localStorage.setItem('weatherCities', JSON.stringify(cities));
    localStorage.setItem('searchStrings', JSON.stringify(pincodeState));
  }, [cities, pincodeState]);

  // Update theme in local storage and on the document
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleAddCity = async (cityNameOrPincode: string) => {
    const normalizedInput = cityNameOrPincode.toLowerCase();

    if (!isNaN(Number(cityNameOrPincode))) {
      // It's a pincode
      if (pincodeState[normalizedInput]) {
        // If pincode exists in pincodeState, use the data
        const cityName = pincodeState[normalizedInput];
        const weatherData = cities.find(
          (city) => city.name.toLowerCase() === cityName
        );
        if (weatherData) {
          return; // Already have weather data for this city, do nothing
        }
      } else {
        // If not found in pincodeState, make the API call
        const weatherData = await fetchWeatherByCity(cityNameOrPincode);
        if (weatherData) {
          const cityName = weatherData.name.toLowerCase();
          const isCityPresent = cities.some(
            (city) => city.name.toLowerCase() === cityName
          );

          if (isCityPresent) {
            // If the city exists, only update pincodeState
            setPincodeState((prevState) => ({
              ...prevState,
              [normalizedInput]: cityName, // Store pincode with city name
            }));
          } else {
            // If the city is not present, update both cities and pincodeState
            setCities((prevCities) => [...prevCities, weatherData]);
            setPincodeState((prevState) => ({
              ...prevState,
              [normalizedInput]: cityName, // Store pincode with city name
            }));
          }
        }
      }
    } else {
      // It's a city name
      const existingCity = cities.find(
        (city) => city.name.toLowerCase() === normalizedInput
      );
      if (existingCity) {
        return; // Avoid making the API call if city data already exists
      } else {
        // If city not found in cities state, make the API call
        const weatherData = await fetchWeatherByCity(cityNameOrPincode);
        if (weatherData) {
          setCities((prevCities) => [...prevCities, weatherData]);
        }
      }
    }
  };

  const handleRemoveCity = (cityId: string, cityName: string) => {
    // Remove city from cities state
    setCities((prevCities) => prevCities.filter((city) => city.id !== cityId));

    // Remove associated pincode from pincodeState if it exists
    setPincodeState((prevState) => {
      // Find the pincode(s) associated with the city name
      const updatedState = { ...prevState };
      for (const pincode in updatedState) {
        if (updatedState[pincode].toLowerCase() === cityName.toLowerCase()) {
          delete updatedState[pincode]; // Remove the pincode
          break;
        }
      }
      return updatedState;
    });
  };
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen p-4 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'
      }`}
    >
      <div className='container mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold'>Weather Dashboard by Atul</h1>
          <button
            onClick={toggleTheme}
            className='p-2 rounded-full bg-gray-200 dark:bg-gray-700'
          >
            {darkMode ? (
              <SunIcon className='h-6 w-6 text-yellow-500' />
            ) : (
              <MoonIcon className='h-6 w-6 text-blue-700' />
            )}
          </button>
        </div>

        <SearchBar onAddCity={handleAddCity} loading={loading} error={error} />

        {error && (
          <div
            className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4'
            role='alert'
          >
            {error}
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
          {cities.map((city) => (
            <CityCard
              key={city.id}
              city={city}
              onRemove={(cityId, cityName) =>
                handleRemoveCity(cityId, cityName)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

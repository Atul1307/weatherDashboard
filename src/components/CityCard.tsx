import React from 'react';
import { CityWeatherProps } from '../types/WeatherTypes.ts';
import {
  ArrowTrendingUpIcon,
  BeakerIcon,
  CloudIcon,
} from '@heroicons/react/24/solid';
import { getWeatherIcon } from '../utils/WeatherIcon.ts';

const CityCard: React.FC<CityWeatherProps> = ({ city, onRemove }) => {
  const { name, main, wind, weather } = city;
  const weatherMain = weather[0];

  return (
    <div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 relative'>
      <button
        onClick={() => onRemove(city.id, city.name)}
        className='absolute top-2 right-2 text-red-500 hover:text-red-700'
      >
        ✕
      </button>

      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold dark:text-white'>{name}</h2>
        <img
          src={getWeatherIcon(weatherMain.icon)}
          alt={weatherMain.description}
          className='w-16 h-16'
        />
      </div>

      <div className='space-y-3'>
        <div className='flex items-center'>
          <ArrowTrendingUpIcon className='h-6 w-6 mr-2 text-blue-500' />
          <p className='dark:text-white'>
            Temperature: {main.temp.toFixed(1)}°C
            <span className='text-sm ml-2'>
              (Min: {main.temp_min.toFixed(1)}°C | Max:{' '}
              {main.temp_max.toFixed(1)}°C)
            </span>
          </p>
        </div>

        <div className='flex items-center'>
          <CloudIcon className='h-6 w-6 mr-2 text-blue-400' />
          <p className='dark:text-white'>Humidity: {main.humidity}%</p>
        </div>

        <div className='flex items-center'>
          <BeakerIcon className='h-6 w-6 mr-2 text-gray-500' />
          <p className='dark:text-white'>Wind Speed: {wind.speed} m/s</p>
        </div>

        <div className='mt-2'>
          <p className='text-gray-600 dark:text-gray-300 italic'>
            {weatherMain.description.charAt(0).toUpperCase() +
              weatherMain.description.slice(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CityCard;

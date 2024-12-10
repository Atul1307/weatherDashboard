import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface SearchBarProps {
  onAddCity: (cityName: string) => void;
  loading: boolean;
  error: string | null;
}

const SearchBar: React.FC<SearchBarProps> = ({ onAddCity, loading }) => {
  const [cityName, setCityName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityName.trim()) {
      onAddCity(cityName.trim());
      setCityName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mb-4'>
      <div className='relative'>
        <input
          type='text'
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder='Enter city name'
          className='w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white'
        />
        <MagnifyingGlassIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
        <button
          type='submit'
          disabled={loading}
          className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50'
        >
          {loading ? 'Loading...' : 'Add'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

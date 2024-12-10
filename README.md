# Dynamic Weather Dashboard

## Overview

A React-based weather dashboard that allows users to search and view weather information for multiple cities.
Users can search using either city name or pincode.

## Features

- Search for cities and add them to the dashboard
- View detailed weather information
- Responsive design
- Error handling for API requests
- Optimisation to avoid redundant API calls for same city

## ProjectURL

- https://weatherdashboardbyatul.netlify.app/

## Prerequisites

- Node.js (v14 or later)
- npm

## Setup Instructions(If you want to run this locally)

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory
4. Add your OpenWeatherMap API key:
   ```
   VITE_OPENWEATHERMAP_API_KEY=your_api_key_here
   ```
5. Run the development server:
   ```
   npm run dev
   ```

## API Key

- Sign up at OpenWeatherMap (https://openweathermap.org/)
- Generate a free API key
- Add the key to your `.env` file

## Assumptions

- API key is valid and has necessary permissions
- Internet connection is available
- User inputs valid city names

## Future improvements

- Automated testing
- Improved UI/UX for better experience

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- Axios

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'weather-background': '#f0f4f8',
        'weather-card': '#ffffff',
        'weather-text': '#1a202c',
      },
      boxShadow: {
        'weather-card': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};

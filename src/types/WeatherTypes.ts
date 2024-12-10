export interface WeatherData {
  id: string;
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  dt: number;
}

export interface CityWeatherProps {
  city: WeatherData;
  onRemove: (cityId: string, cityName: string) => void;
}

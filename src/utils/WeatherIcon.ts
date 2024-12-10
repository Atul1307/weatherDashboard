// Weather icon mapping based on OpenWeatherMap icons
export const getWeatherIcon = (iconCode: string): string => {
  const baseUrl = 'https://openweathermap.org/img/wn/';
  return `${baseUrl}${iconCode}@2x.png`;
};

export const getWeatherConditionClass = (iconCode: string): string => {
  const conditionMap: { [key: string]: string } = {
    '01': 'clear-sky',
    '02': 'few-clouds',
    '03': 'scattered-clouds',
    '04': 'broken-clouds',
    '09': 'shower-rain',
    '10': 'rain',
    '11': 'thunderstorm',
    '13': 'snow',
    '50': 'mist',
  };

  const baseCondition = iconCode.slice(0, 2);
  return conditionMap[baseCondition] || 'default';
};

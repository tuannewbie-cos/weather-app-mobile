export interface City {
  id: string;
  name: string;
  country: string;
  admin1?: string; // Province / State
  latitude: number;
  longitude: number;
}

export interface WeatherCondition {
  code: number;
  label: string;
  iconName: string;
  emoji: string;
  gradient: [string, string];
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  isDay: boolean;
  pressure: number;
  uvIndex?: number;
  condition: WeatherCondition;
}

export interface HourlyForecastItem {
  time: string;
  hourLabel: string;
  temperature: number;
  weatherCode: number;
  condition: WeatherCondition;
  precipitationProbability: number;
}

export interface DailyForecastItem {
  date: string;
  dayLabel: string;
  weatherCode: number;
  condition: WeatherCondition;
  maxTemp: number;
  minTemp: number;
  uvIndex: number;
  precipitationSum: number;
}

export interface WeatherData {
  city: City;
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  updatedAt: string;
}

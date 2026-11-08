import { City, WeatherData, HourlyForecastItem, DailyForecastItem } from '@/types/weather';
import { getWeatherCondition } from '@/constants/cities';

const OPEN_METEO_BASE = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_BASE = 'https://geocoding-api.open-meteo.com/v1/search';

export async function fetchWeatherData(city: City): Promise<WeatherData> {
  const url = `${OPEN_METEO_BASE}?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,surface_pressure&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum&timezone=auto`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Lỗi kết nối máy chủ thời tiết: ${res.statusText}`);
  }

  const data = await res.json();
  const currentRaw = data.current;
  const isDay = currentRaw.is_day === 1;
  const currentCondition = getWeatherCondition(currentRaw.weather_code, isDay);

  // Process hourly (take next 24 hours starting from current hour)
  const hourlyTimes: string[] = data.hourly?.time || [];
  const hourlyTemps: number[] = data.hourly?.temperature_2m || [];
  const hourlyCodes: number[] = data.hourly?.weather_code || [];
  const hourlyPrecipProbs: number[] = data.hourly?.precipitation_probability || [];

  const currentTime = currentRaw.time;
  let startIndex = hourlyTimes.findIndex((t) => t >= currentTime);
  if (startIndex === -1) startIndex = 0;

  const hourly: HourlyForecastItem[] = [];
  const hoursCount = Math.min(24, hourlyTimes.length - startIndex);

  for (let i = 0; i < hoursCount; i++) {
    const idx = startIndex + i;
    const timeStr = hourlyTimes[idx];
    const dateObj = new Date(timeStr);
    const hour = dateObj.getHours();
    const hourLabel = i === 0 ? 'Bây giờ' : `${hour.toString().padStart(2, '0')}:00`;
    const code = hourlyCodes[idx] ?? 0;
    const isDayHour = hour >= 6 && hour < 18;

    hourly.push({
      time: timeStr,
      hourLabel,
      temperature: Math.round(hourlyTemps[idx] ?? 0),
      weatherCode: code,
      condition: getWeatherCondition(code, isDayHour),
      precipitationProbability: hourlyPrecipProbs[idx] ?? 0,
    });
  }

  // Process daily (7 days)
  const dailyDates: string[] = data.daily?.time || [];
  const dailyMaxTemps: number[] = data.daily?.temperature_2m_max || [];
  const dailyMinTemps: number[] = data.daily?.temperature_2m_min || [];
  const dailyCodes: number[] = data.daily?.weather_code || [];
  const dailyUVs: number[] = data.daily?.uv_index_max || [];
  const dailyPrecips: number[] = data.daily?.precipitation_sum || [];

  const daysOfWeek = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

  const daily: DailyForecastItem[] = dailyDates.slice(0, 7).map((dateStr, idx) => {
    const dateObj = new Date(dateStr);
    const dayOfWeek = daysOfWeek[dateObj.getDay()];
    const dayLabel = idx === 0 ? 'Hôm nay' : dayOfWeek;
    const code = dailyCodes[idx] ?? 0;

    return {
      date: dateStr,
      dayLabel,
      weatherCode: code,
      condition: getWeatherCondition(code, true),
      maxTemp: Math.round(dailyMaxTemps[idx] ?? 0),
      minTemp: Math.round(dailyMinTemps[idx] ?? 0),
      uvIndex: Math.round((dailyUVs[idx] ?? 0) * 10) / 10,
      precipitationSum: Math.round((dailyPrecips[idx] ?? 0) * 10) / 10,
    };
  });

  return {
    city,
    current: {
      temperature: Math.round(currentRaw.temperature_2m),
      apparentTemperature: Math.round(currentRaw.apparent_temperature),
      humidity: currentRaw.relative_humidity_2m,
      windSpeed: Math.round(currentRaw.wind_speed_10m * 10) / 10,
      weatherCode: currentRaw.weather_code,
      isDay,
      pressure: Math.round(currentRaw.surface_pressure),
      uvIndex: daily[0]?.uvIndex ?? 5,
      condition: currentCondition,
    },
    hourly,
    daily,
    updatedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
  };
}

export async function searchCities(query: string): Promise<City[]> {
  if (!query || query.trim().length < 2) return [];

  const url = `${GEOCODING_BASE}?name=${encodeURIComponent(query.trim())}&count=8&language=vi&format=json`;
  const res = await fetch(url);
  if (!res.ok) return [];

  const data = await res.json();
  if (!data.results) return [];

  return data.results.map((item: any) => ({
    id: `${item.id}`,
    name: item.name,
    country: item.country || '',
    admin1: item.admin1 || '',
    latitude: item.latitude,
    longitude: item.longitude,
  }));
}

import { City, WeatherCondition } from '@/types/weather';

export const DEFAULT_CITIES: City[] = [
  {
    id: 'hanoi',
    name: 'Hà Nội',
    country: 'Việt Nam',
    latitude: 21.0285,
    longitude: 105.8542,
  },
  {
    id: 'hcm',
    name: 'TP. Hồ Chí Minh',
    country: 'Việt Nam',
    latitude: 10.8231,
    longitude: 106.6297,
  },
  {
    id: 'danang',
    name: 'Đà Nẵng',
    country: 'Việt Nam',
    latitude: 16.0544,
    longitude: 108.2022,
  },
  {
    id: 'haiphong',
    name: 'Hải Phòng',
    country: 'Việt Nam',
    latitude: 20.8449,
    longitude: 106.6881,
  },
  {
    id: 'dalat',
    name: 'Đà Lạt',
    country: 'Việt Nam',
    latitude: 11.9404,
    longitude: 108.4583,
  },
  {
    id: 'nhatrang',
    name: 'Nha Trang',
    country: 'Việt Nam',
    latitude: 12.2388,
    longitude: 109.1967,
  },
  {
    id: 'cantho',
    name: 'Cần Thơ',
    country: 'Việt Nam',
    latitude: 10.0452,
    longitude: 105.7469,
  },
  {
    id: 'sapa',
    name: 'Sa Pa',
    country: 'Việt Nam',
    latitude: 22.3364,
    longitude: 103.8438,
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Nhật Bản',
    latitude: 35.6762,
    longitude: 139.6503,
  },
  {
    id: 'seoul',
    name: 'Seoul',
    country: 'Hàn Quốc',
    latitude: 37.5665,
    longitude: 126.978,
  },
];

/**
 * WMO Weather interpretation codes (WW)
 * https://open-meteo.com/en/docs
 */
export function getWeatherCondition(code: number, isDay = true): WeatherCondition {
  switch (code) {
    case 0:
      return {
        code,
        label: isDay ? 'Trời quang đãng' : 'Đêm quang đãng',
        iconName: isDay ? 'sunny' : 'moon',
        emoji: isDay ? '☀️' : '🌙',
        gradient: isDay ? ['#38ef7d', '#11998e'] : ['#2c3e50', '#000000'],
      };
    case 1:
    case 2:
      return {
        code,
        label: isDay ? 'Ít mây / Nắng nhẹ' : 'Mây thưa',
        iconName: isDay ? 'partly-sunny' : 'cloudy-night',
        emoji: isDay ? '🌤️' : '☁️',
        gradient: ['#4facfe', '#00f2fe'],
      };
    case 3:
      return {
        code,
        label: 'Nhiều mây u ám',
        iconName: 'cloudy',
        emoji: '☁️',
        gradient: ['#757F9A', '#D7DDE8'],
      };
    case 45:
    case 48:
      return {
        code,
        label: 'Có sương mù',
        iconName: 'filter',
        emoji: '🌫️',
        gradient: ['#8e9eab', '#eef2f3'],
      };
    case 51:
    case 53:
    case 55:
      return {
        code,
        label: 'Mưa phùn nhẹ',
        iconName: 'rainy',
        emoji: '🌦️',
        gradient: ['#89f7fe', '#66a6ff'],
      };
    case 61:
    case 63:
    case 65:
      return {
        code,
        label: 'Mưa rào',
        iconName: 'rainy',
        emoji: '🌧️',
        gradient: ['#4b6cb7', '#182848'],
      };
    case 71:
    case 73:
    case 75:
    case 77:
      return {
        code,
        label: 'Tuyết rơi',
        iconName: 'snow',
        emoji: '❄️',
        gradient: ['#E0EAFC', '#CFDEF3'],
      };
    case 80:
    case 81:
    case 82:
      return {
        code,
        label: 'Mưa nặng hạt',
        iconName: 'thunderstorm',
        emoji: '⛈️',
        gradient: ['#3a6073', '#16222f'],
      };
    case 95:
    case 96:
    case 99:
      return {
        code,
        label: 'Giông bão sét',
        iconName: 'thunderstorm',
        emoji: '⚡',
        gradient: ['#0f0c29', '#302b63'],
      };
    default:
      return {
        code,
        label: 'Có mây',
        iconName: 'cloud',
        emoji: '⛅',
        gradient: ['#3a7bd5', '#3a6073'],
      };
  }
}

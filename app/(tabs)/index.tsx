import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { City, WeatherData } from '@/types/weather';
import { DEFAULT_CITIES } from '@/constants/cities';
import { fetchWeatherData } from '@/services/weatherService';
import { CurrentWeatherCard } from '@/components/weather/CurrentWeatherCard';
import { WeatherMetricsGrid } from '@/components/weather/WeatherMetricsGrid';
import { HourlyForecastList } from '@/components/weather/HourlyForecastList';
import { DailyForecastList } from '@/components/weather/DailyForecastList';
import { CitySearchModal } from '@/components/weather/CitySearchModal';

const SELECTED_CITY_STORAGE_KEY = '@weather_selected_city';

export default function WeatherScreen() {
  const [selectedCity, setSelectedCity] = useState<City>(DEFAULT_CITIES[0]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Load saved city on mount
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(SELECTED_CITY_STORAGE_KEY);
        if (saved) {
          const parsed: City = JSON.parse(saved);
          setSelectedCity(parsed);
          loadWeather(parsed);
          return;
        }
      } catch (err) {
        console.warn('Could not read saved city:', err);
      }
      loadWeather(DEFAULT_CITIES[0]);
    })();
  }, []);

  const loadWeather = async (city: City) => {
    try {
      setError(null);
      const data = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (err: any) {
      setError(err?.message || 'Không thể tải dữ liệu thời tiết');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadWeather(selectedCity);
  }, [selectedCity]);

  const handleSelectCity = async (city: City) => {
    setSelectedCity(city);
    setLoading(true);
    await AsyncStorage.setItem(SELECTED_CITY_STORAGE_KEY, JSON.stringify(city));
    await loadWeather(city);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.background}>
        {/* Main Content */}
        {loading && !refreshing && !weatherData ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#38bdf8" />
            <Text style={styles.loadingMessage}>Đang lấy dự báo thời tiết...</Text>
          </View>
        ) : error && !weatherData ? (
          <View style={styles.centerContainer}>
            <Ionicons name="cloud-offline-outline" size={60} color="#f87171" />
            <Text style={styles.errorTitle}>Không thể kết nối</Text>
            <Text style={styles.errorMessage}>{error}</Text>
            <TouchableOpacity
              style={styles.retryBtn}
              onPress={() => {
                setLoading(true);
                loadWeather(selectedCity);
              }}
            >
              <Text style={styles.retryText}>Thử lại</Text>
            </TouchableOpacity>
          </View>
        ) : weatherData ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor="#38bdf8"
                colors={['#38bdf8']}
              />
            }
          >
            {/* Hero Current Weather */}
            <CurrentWeatherCard
              weather={weatherData}
              onOpenSearch={() => setSearchModalOpen(true)}
            />

            {/* Hourly Forecast */}
            <HourlyForecastList hourly={weatherData.hourly} />

            {/* Detailed Metrics */}
            <WeatherMetricsGrid current={weatherData.current} />

            {/* 7-Day Forecast */}
            <DailyForecastList daily={weatherData.daily} />
          </ScrollView>
        ) : null}

        {/* City Picker Modal */}
        <CitySearchModal
          visible={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          onSelectCity={handleSelectCity}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0b1120',
  },
  background: {
    flex: 1,
    backgroundColor: '#0b1120',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  loadingMessage: {
    color: '#94a3b8',
    fontSize: 15,
  },
  errorTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },
  errorMessage: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: 8,
    backgroundColor: '#38bdf8',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  retryText: {
    color: '#0b1120',
    fontWeight: '700',
    fontSize: 15,
  },
});

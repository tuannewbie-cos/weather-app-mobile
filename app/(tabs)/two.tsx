import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { City } from '@/types/weather';
import { DEFAULT_CITIES, getWeatherCondition } from '@/constants/cities';

const SELECTED_CITY_STORAGE_KEY = '@weather_selected_city';

interface CitySummary {
  city: City;
  temp?: number;
  conditionEmoji?: string;
  conditionLabel?: string;
  loading?: boolean;
}

export default function CitiesScreen() {
  const router = useRouter();
  const [citiesData, setCitiesData] = useState<CitySummary[]>(
    DEFAULT_CITIES.map((c) => ({ city: c, loading: true }))
  );

  useEffect(() => {
    // Fetch overview temperatures for each default city
    (async () => {
      const updated = await Promise.all(
        DEFAULT_CITIES.map(async (city) => {
          try {
            const res = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,weather_code,is_day&timezone=auto`
            );
            if (!res.ok) throw new Error();
            const data = await res.json();
            const cond = getWeatherCondition(data.current.weather_code, data.current.is_day === 1);
            return {
              city,
              temp: Math.round(data.current.temperature_2m),
              conditionEmoji: cond.emoji,
              conditionLabel: cond.label,
              loading: false,
            };
          } catch {
            return {
              city,
              temp: undefined,
              conditionEmoji: '⛅',
              conditionLabel: 'Có mây',
              loading: false,
            };
          }
        })
      );
      setCitiesData(updated);
    })();
  }, []);

  const handleSelectCity = async (city: City) => {
    await AsyncStorage.setItem(SELECTED_CITY_STORAGE_KEY, JSON.stringify(city));
    router.navigate('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Các tỉnh & thành phố</Text>
          <Text style={styles.subtitle}>Chạm vào một địa điểm để xem chi tiết thời tiết</Text>
        </View>

        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {citiesData.map((item) => (
            <TouchableOpacity
              key={item.city.id}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => handleSelectCity(item.city)}
            >
              <View style={styles.cityInfoCol}>
                <Text style={styles.cityName}>{item.city.name}</Text>
                <Text style={styles.countryName}>{item.city.country}</Text>
                <Text style={styles.conditionLabel}>{item.conditionLabel || 'Đang cập nhật...'}</Text>
              </View>

              <View style={styles.tempCol}>
                {item.loading ? (
                  <ActivityIndicator size="small" color="#38bdf8" />
                ) : (
                  <>
                    <Text style={styles.emoji}>{item.conditionEmoji}</Text>
                    {item.temp !== undefined && <Text style={styles.tempText}>{item.temp}°</Text>}
                  </>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0b1120',
  },
  container: {
    flex: 1,
    backgroundColor: '#0b1120',
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
  list: {
    paddingBottom: 24,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  cityInfoCol: {
    flex: 1,
  },
  cityName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  countryName: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
  },
  conditionLabel: {
    fontSize: 13,
    color: '#38bdf8',
    marginTop: 6,
    fontWeight: '500',
  },
  tempCol: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minWidth: 70,
  },
  emoji: {
    fontSize: 28,
    marginBottom: 2,
  },
  tempText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
  },
});

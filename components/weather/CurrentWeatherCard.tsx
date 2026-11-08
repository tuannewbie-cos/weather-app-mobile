import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WeatherData } from '@/types/weather';

interface Props {
  weather: WeatherData;
  onOpenSearch: () => void;
}

export const CurrentWeatherCard: React.FC<Props> = ({ weather, onOpenSearch }) => {
  const { city, current, daily, updatedAt } = weather;
  const todayForecast = daily[0];

  return (
    <View style={styles.cardContainer}>
      {/* Top Location Bar */}
      <TouchableOpacity
        style={styles.locationSelector}
        activeOpacity={0.7}
        onPress={onOpenSearch}
      >
        <Ionicons name="location-sharp" size={20} color="#38bdf8" />
        <View style={styles.cityTextContainer}>
          <Text style={styles.cityName}>{city.name}</Text>
          <Text style={styles.countryName}>
            {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
          </Text>
        </View>
        <Ionicons name="chevron-down-circle-outline" size={20} color="#94a3b8" />
      </TouchableOpacity>

      {/* Main Temperature & Weather Icon */}
      <View style={styles.weatherHero}>
        <Text style={styles.emojiDisplay}>{current.condition.emoji}</Text>
        <Text style={styles.tempText}>{current.temperature}°</Text>
        <Text style={styles.conditionText}>{current.condition.label}</Text>

        {/* High / Low & Apparent Temp */}
        <View style={styles.subStatsRow}>
          <View style={styles.pillBadge}>
            <Ionicons name="thermometer-outline" size={14} color="#f97316" />
            <Text style={styles.pillText}>
              Cảm giác như {current.apparentTemperature}°C
            </Text>
          </View>
          {todayForecast && (
            <View style={styles.pillBadge}>
              <Text style={styles.pillText}>
                Cao: {todayForecast.maxTemp}° / Thấp: {todayForecast.minTemp}°
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.updatedAtText}>Cập nhật lúc: {updatedAt}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    alignSelf: 'center',
    marginBottom: 16,
    gap: 8,
  },
  cityTextContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  cityName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
  },
  countryName: {
    fontSize: 13,
    color: '#cbd5e1',
  },
  weatherHero: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  emojiDisplay: {
    fontSize: 64,
    marginBottom: 4,
  },
  tempText: {
    fontSize: 76,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -2,
    lineHeight: 84,
  },
  conditionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#e2e8f0',
    marginTop: 2,
    marginBottom: 14,
  },
  subStatsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  pillText: {
    color: '#f8fafc',
    fontSize: 13,
    fontWeight: '500',
  },
  updatedAtText: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },
});

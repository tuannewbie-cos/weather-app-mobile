import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { HourlyForecastItem } from '@/types/weather';

interface Props {
  hourly: HourlyForecastItem[];
}

export const HourlyForecastList: React.FC<Props> = ({ hourly }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Dự báo 24 giờ tới</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {hourly.map((item, index) => (
          <View
            key={`${item.time}-${index}`}
            style={[
              styles.hourCard,
              index === 0 ? styles.currentHourCard : null,
            ]}
          >
            <Text style={styles.hourText}>{item.hourLabel}</Text>
            <Text style={styles.emoji}>{item.condition.emoji}</Text>
            <Text style={styles.tempText}>{item.temperature}°</Text>
            {item.precipitationProbability > 0 ? (
              <Text style={styles.rainChance}>💧 {item.precipitationProbability}%</Text>
            ) : (
              <View style={styles.placeholder} />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
    marginHorizontal: 20,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  hourCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
    minWidth: 70,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  currentHourCard: {
    backgroundColor: 'rgba(56, 189, 248, 0.25)',
    borderColor: '#38bdf8',
  },
  hourText: {
    fontSize: 13,
    color: '#cbd5e1',
    fontWeight: '600',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 26,
    marginBottom: 8,
  },
  tempText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  rainChance: {
    fontSize: 11,
    color: '#7dd3fc',
    marginTop: 6,
    fontWeight: '500',
  },
  placeholder: {
    height: 16,
    marginTop: 6,
  },
});

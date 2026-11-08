import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DailyForecastItem } from '@/types/weather';

interface Props {
  daily: DailyForecastItem[];
}

export const DailyForecastList: React.FC<Props> = ({ daily }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Dự báo 7 ngày tới</Text>
      <View style={styles.cardContainer}>
        {daily.map((item, index) => (
          <View
            key={item.date}
            style={[
              styles.dayRow,
              index !== daily.length - 1 ? styles.borderBottom : null,
            ]}
          >
            {/* Day name */}
            <Text style={styles.dayLabel}>{item.dayLabel}</Text>

            {/* Weather Condition */}
            <View style={styles.conditionCol}>
              <Text style={styles.emoji}>{item.condition.emoji}</Text>
              <Text style={styles.conditionText} numberOfLines={1}>
                {item.condition.label}
              </Text>
            </View>

            {/* Temperature range */}
            <View style={styles.tempRangeCol}>
              <Text style={styles.minTemp}>{item.minTemp}°</Text>
              <View style={styles.tempBarTrack}>
                <View style={styles.tempBarFill} />
              </View>
              <Text style={styles.maxTemp}>{item.maxTemp}°</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
    paddingLeft: 4,
  },
  cardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  dayLabel: {
    width: 90,
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  conditionCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 4,
  },
  emoji: {
    fontSize: 20,
  },
  conditionText: {
    fontSize: 13,
    color: '#cbd5e1',
    flexShrink: 1,
  },
  tempRangeCol: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 110,
    gap: 8,
    justifyContent: 'flex-end',
  },
  minTemp: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
    width: 24,
    textAlign: 'right',
  },
  tempBarTrack: {
    flex: 1,
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  tempBarFill: {
    width: '100%',
    height: '100%',
    backgroundColor: '#38bdf8',
    borderRadius: 3,
  },
  maxTemp: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '700',
    width: 24,
    textAlign: 'left',
  },
});

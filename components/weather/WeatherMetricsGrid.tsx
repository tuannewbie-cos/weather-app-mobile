import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { CurrentWeather } from '@/types/weather';

interface Props {
  current: CurrentWeather;
}

export const WeatherMetricsGrid: React.FC<Props> = ({ current }) => {
  const getUVStatus = (uv?: number) => {
    if (!uv || uv < 3) return { text: 'Thấp', color: '#4ade80' };
    if (uv < 6) return { text: 'Trung bình', color: '#facc15' };
    if (uv < 8) return { text: 'Cao', color: '#fb923c' };
    return { text: 'Rất cao', color: '#f87171' };
  };

  const uvStatus = getUVStatus(current.uvIndex);

  const metrics = [
    {
      id: 'humidity',
      label: 'Độ ẩm',
      value: `${current.humidity}%`,
      sub: current.humidity > 70 ? 'Độ ẩm cao' : 'Bình thường',
      icon: <Ionicons name="water-outline" size={24} color="#38bdf8" />,
    },
    {
      id: 'wind',
      label: 'Sức gió',
      value: `${current.windSpeed} km/h`,
      sub: current.windSpeed < 15 ? 'Gió nhẹ' : 'Gió giật mạnh',
      icon: <Feather name="wind" size={24} color="#a78bfa" />,
    },
    {
      id: 'uv',
      label: 'Chỉ số UV',
      value: `${current.uvIndex ?? 0}`,
      sub: uvStatus.text,
      subColor: uvStatus.color,
      icon: <Ionicons name="sunny-outline" size={24} color="#fbbf24" />,
    },
    {
      id: 'pressure',
      label: 'Áp suất',
      value: `${current.pressure} hPa`,
      sub: 'Áp suất chuẩn',
      icon: <MaterialCommunityIcons name="gauge" size={24} color="#34d399" />,
    },
  ];

  return (
    <View style={styles.gridContainer}>
      <Text style={styles.sectionHeader}>Thông số thời tiết</Text>
      <View style={styles.grid}>
        {metrics.map((item) => (
          <View key={item.id} style={styles.metricCard}>
            <View style={styles.iconContainer}>{item.icon}</View>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
            <Text style={[styles.sub, item.subColor ? { color: item.subColor } : null]}>
              {item.sub}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    marginHorizontal: 16,
    marginTop: 18,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
    paddingLeft: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: '46%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  iconContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    color: '#94a3b8',
    fontWeight: '500',
    marginBottom: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  sub: {
    fontSize: 12,
    color: '#cbd5e1',
    fontWeight: '500',
  },
});

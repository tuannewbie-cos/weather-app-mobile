import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#38bdf8',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          backgroundColor: '#0f172a',
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Thời tiết',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="partly-sunny"
              size={size || 24}
              color={typeof color === 'string' ? color : '#38bdf8'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Địa điểm',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="location"
              size={size || 24}
              color={typeof color === 'string' ? color : '#38bdf8'}
            />
          ),
        }}
      />
    </Tabs>
  );
}

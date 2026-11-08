import { StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const stacks = [
    {
      name: 'React Native',
      badge: 'Mobile Core',
      desc: 'Nền tảng build ứng dụng native đa nền tảng (iOS, Android, Web) bằng React.',
      color: '#00D8FF',
      url: 'https://reactnative.dev',
    },
    {
      name: 'Expo',
      badge: 'SDK 58',
      desc: 'Hệ sinh thái công cụ phát triển nhanh, test trực tiếp qua Expo Go bằng mã QR.',
      color: '#000000',
      url: 'https://expo.dev',
    },
    {
      name: 'TypeScript',
      badge: 'Type Safety',
      desc: 'Giúp code an toàn, tự động gợi ý code, hạn chế tối đa lỗi runtime trong hackathon.',
      color: '#3178C6',
      url: 'https://www.typescriptlang.org',
    },
    {
      name: 'Supabase',
      badge: 'Backend & DB',
      desc: 'Cơ sở dữ liệu Postgres, Auth, Storage và Realtime API dựng sẵn chỉ trong vài phút.',
      color: '#3ECF8E',
      url: 'https://supabase.com',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.emoji}>🚀</Text>
          <Text style={styles.title}>Hackathon Starter App</Text>
          <Text style={styles.subtitle}>
            Bộ 4 Stack: React Native + Expo + TypeScript + Supabase
          </Text>
        </View>

        <View style={styles.stackList}>
          {stacks.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => Linking.openURL(item.url)}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <View
                  style={[styles.badge, { backgroundColor: item.color + '22' }]}
                >
                  <Text style={[styles.badgeText, { color: item.color }]}>
                    {item.badge}
                  </Text>
                </View>
              </View>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => router.push('/(tabs)/two')}
        >
          <Text style={styles.ctaButtonText}>
            👉 Thử nghiệm Supabase Auth & Config
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginVertical: 16,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 6,
    textAlign: 'center',
  },
  stackList: {
    width: '100%',
    gap: 12,
    marginVertical: 14,
  },
  card: {
    backgroundColor: 'rgba(128, 128, 128, 0.08)',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.15)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  cardDesc: {
    fontSize: 14,
    opacity: 0.75,
    lineHeight: 20,
  },
  ctaButton: {
    width: '100%',
    backgroundColor: '#3ECF8E',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

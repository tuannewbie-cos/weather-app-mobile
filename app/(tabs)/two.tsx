import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { Text, View } from '@/components/Themed';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

export default function SupabaseScreen() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
  const isConfigured =
    supabaseUrl.length > 0 && !supabaseUrl.includes('your-project.supabase.co');

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleSignIn() {
    if (!email || !password) {
      notify('Lỗi', 'Vui lòng nhập email và mật khẩu');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      notify('Đăng nhập thất bại', error.message);
    } else {
      notify('Thành công', 'Đăng nhập thành công!');
    }
  }

  async function handleSignUp() {
    if (!email || !password) {
      notify('Lỗi', 'Vui lòng nhập email và mật khẩu');
      return;
    }
    setLoading(true);
    const {
      data: { session: newSession },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      notify('Đăng ký thất bại', error.message);
    } else if (!newSession) {
      notify('Đăng ký thành công', 'Vui lòng kiểm tra email để xác nhận tài khoản!');
    } else {
      notify('Thành công', 'Đăng ký và đăng nhập thành công!');
    }
  }

  async function handleSignOut() {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    notify('Thông báo', 'Đã đăng xuất');
  }

  function notify(title: string, message: string) {
    if (Platform.OS === 'web') {
      setStatusMessage(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Supabase Integration</Text>
        <Text style={styles.subtitle}>React Native + Expo + TypeScript</Text>

        <View style={styles.badgeContainer}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isConfigured ? '#10B981' : '#F59E0B' },
            ]}
          />
          <Text style={styles.badgeText}>
            {isConfigured
              ? 'Đã cấu hình Supabase URL'
              : 'Chưa điền Supabase Key trong file .env'}
          </Text>
        </View>

        {statusMessage && (
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>{statusMessage}</Text>
          </View>
        )}

        {session && session.user ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Đã đăng nhập 🎉</Text>
            <Text style={styles.cardSubtitle}>
              Email: {session.user.email}
            </Text>
            <Text style={styles.cardSubtitle}>User ID: {session.user.id}</Text>

            <TouchableOpacity
              style={[styles.button, styles.signOutButton]}
              onPress={handleSignOut}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Đăng xuất</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Xác thực (Authentication)</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={handleSignIn}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Đăng nhập</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={handleSignUp}
                disabled={loading}
              >
                <Text style={styles.secondaryButtonText}>Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.guideCard}>
          <Text style={styles.guideTitle}>💡 Hướng dẫn cho Hackathon</Text>
          <Text style={styles.guideItem}>
            1. Mở file <Text style={styles.codeText}>.env</Text> và điền{' '}
            <Text style={styles.codeText}>EXPO_PUBLIC_SUPABASE_URL</Text> và{' '}
            <Text style={styles.codeText}>EXPO_PUBLIC_SUPABASE_ANON_KEY</Text>.
          </Text>
          <Text style={styles.guideItem}>
            2. Import client ở bất kỳ file nào:{' '}
            <Text style={styles.codeText}>
              {"import { supabase } from '@/lib/supabase';"}
            </Text>
          </Text>
          <Text style={styles.guideItem}>
            3. Chạy lệnh <Text style={styles.codeText}>npm start</Text> để mở Expo QR
            Code và quét bằng Expo Go.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
    marginBottom: 16,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
  },
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(128, 128, 128, 0.08)',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardSubtitle: {
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.8,
  },
  input: {
    backgroundColor: 'rgba(128, 128, 128, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 15,
    marginBottom: 12,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#3ECF8E', // Supabase Green
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3ECF8E',
  },
  signOutButton: {
    backgroundColor: '#EF4444',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  secondaryButtonText: {
    color: '#3ECF8E',
    fontWeight: 'bold',
    fontSize: 15,
  },
  messageBox: {
    width: '100%',
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  messageText: {
    color: '#2563EB',
    fontSize: 14,
  },
  guideCard: {
    width: '100%',
    padding: 18,
    borderRadius: 12,
    backgroundColor: 'rgba(128, 128, 128, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.15)',
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  guideItem: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 8,
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontWeight: '600',
    color: '#3ECF8E',
  },
});

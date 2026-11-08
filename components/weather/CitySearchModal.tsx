import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { City } from '@/types/weather';
import { DEFAULT_CITIES } from '@/constants/cities';
import { searchCities } from '@/services/weatherService';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelectCity: (city: City) => void;
}

export const CitySearchModal: React.FC<Props> = ({
  visible,
  onClose,
  onSelectCity,
}) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchCities(query);
        setSearchResults(results);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (city: City) => {
    onSelectCity(city);
    setQuery('');
    setSearchResults([]);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Chọn địa điểm</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Search Input */}
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#94a3b8" />
            <TextInput
              style={styles.input}
              placeholder="Nhập tên thành phố (Hà Nội, Tokyo...)"
              placeholderTextColor="#94a3b8"
              value={query}
              onChangeText={setQuery}
              autoFocus={true}
              returnKeyType="search"
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')}>
                <Ionicons name="close-circle" size={18} color="#94a3b8" />
              </TouchableOpacity>
            )}
          </View>

          {/* Preset Cities Pill List */}
          <View style={styles.presetsSection}>
            <Text style={styles.sectionTitle}>Địa điểm phổ biến</Text>
            <View style={styles.pillsRow}>
              {DEFAULT_CITIES.slice(0, 8).map((city) => (
                <TouchableOpacity
                  key={city.id}
                  style={styles.pill}
                  onPress={() => handleSelect(city)}
                >
                  <Text style={styles.pillText}>{city.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Search Results List */}
          <View style={styles.resultsContainer}>
            {loading ? (
              <View style={styles.loadingBox}>
                <ActivityIndicator size="small" color="#38bdf8" />
                <Text style={styles.loadingText}>Đang tìm kiếm...</Text>
              </View>
            ) : searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.resultItem}
                    onPress={() => handleSelect(item)}
                  >
                    <Ionicons name="location-outline" size={20} color="#38bdf8" />
                    <View style={styles.resultTextCol}>
                      <Text style={styles.resultCityName}>{item.name}</Text>
                      <Text style={styles.resultSubtitle}>
                        {item.admin1 ? `${item.admin1}, ` : ''}{item.country}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#64748b" />
                  </TouchableOpacity>
                )}
              />
            ) : query.trim().length >= 2 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>Không tìm thấy thành phố nào</Text>
              </View>
            ) : null}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#0f172a',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    height: '80%',
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  closeBtn: {
    padding: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
  },
  presetsSection: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  pillText: {
    color: '#e2e8f0',
    fontSize: 13,
    fontWeight: '500',
  },
  resultsContainer: {
    flex: 1,
    marginTop: 16,
  },
  loadingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 8,
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
    gap: 12,
  },
  resultTextCol: {
    flex: 1,
  },
  resultCityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  resultSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
  },
  emptyBox: {
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 14,
  },
});

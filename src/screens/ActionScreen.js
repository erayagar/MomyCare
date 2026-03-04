import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { getCategories, getCities } from '../data/mockData';
import Button from '../components/Button';

const ActionScreen = ({ route, navigation }) => {
  const { onApplyFilters, currentFilters = {} } = route.params || {};
  
  const [search, setSearch] = useState(currentFilters.search || '');
  const [selectedCategory, setSelectedCategory] = useState(currentFilters.category || 'Tümü');
  const [selectedCity, setSelectedCity] = useState(currentFilters.city || '');
  const [maxPrice, setMaxPrice] = useState(currentFilters.maxPrice ? String(currentFilters.maxPrice) : '');
  
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Kategorileri ve şehirleri yükle
    setCategories(getCategories());
    setCities(getCities());
  }, []);

  const handleApplyFilters = () => {
    const filters = {
      search: search.trim(),
      category: selectedCategory !== 'Tümü' ? selectedCategory : null,
      city: selectedCity || null,
      maxPrice: maxPrice ? parseInt(maxPrice) : null,
    };

    // Filtreleri temizle (boş değerleri kaldır)
    Object.keys(filters).forEach(key => {
      if (filters[key] === null || filters[key] === '') {
        delete filters[key];
      }
    });

    if (onApplyFilters) {
      onApplyFilters(filters);
    }

    navigation.goBack();
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('Tümü');
    setSelectedCity('');
    setMaxPrice('');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Arama Bölümü */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ara</Text>
          <TextInput
            style={styles.input}
            placeholder="Rota, şehir veya etiket ara..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
          />
        </View>

        {/* Kategori Filtresi */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kategori</Text>
          <View style={styles.chipContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.chip,
                  selectedCategory === category && styles.chipActive,
                ]}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedCategory === category && styles.chipTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Şehir Filtresi */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Şehir</Text>
          <View style={styles.chipContainer}>
            <TouchableOpacity
              style={[
                styles.chip,
                selectedCity === '' && styles.chipActive,
              ]}
              onPress={() => setSelectedCity('')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedCity === '' && styles.chipTextActive,
                ]}
              >
                Tümü
              </Text>
            </TouchableOpacity>
            {cities.map((city) => (
              <TouchableOpacity
                key={city}
                style={[
                  styles.chip,
                  selectedCity === city && styles.chipActive,
                ]}
                onPress={() => setSelectedCity(city)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedCity === city && styles.chipTextActive,
                  ]}
                >
                  {city}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Fiyat Filtresi */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Maksimum Fiyat (₺)</Text>
          <TextInput
            style={styles.input}
            placeholder="Örn: 1000"
            placeholderTextColor="#9CA3AF"
            value={maxPrice}
            onChangeText={setMaxPrice}
            keyboardType="numeric"
          />
        </View>

        {/* Butonlar */}
        <View style={styles.buttonContainer}>
          <Button
            title="Filtreleri Uygula"
            onPress={handleApplyFilters}
            variant="primary"
            style={styles.applyButton}
          />
          <Button
            title="Filtreleri Temizle"
            onPress={handleResetFilters}
            variant="secondary"
            style={styles.resetButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 32,
  },
  applyButton: {
    marginBottom: 12,
  },
  resetButton: {
    // Secondary button styles already defined in Button component
  },
});

export default ActionScreen;

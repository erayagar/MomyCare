import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { fetchTravelItemById } from '../data/mockData';
import ErrorState from '../components/ErrorState';
import Button from '../components/Button';

const DetailScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadItem();
  }, [itemId]);

  const loadItem = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchTravelItemById(itemId);
      setItem(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#059669" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <ErrorState message={error} onRetry={loadItem} />
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.container}>
        <ErrorState message="İçerik bulunamadı" onRetry={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>⭐ {item.rating}</Text>
            <Text style={styles.reviewsText}>({item.reviews} değerlendirme)</Text>
          </View>
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Fiyat</Text>
            <Text style={styles.infoValue}>{item.price} ₺</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Süre</Text>
            <Text style={styles.infoValue}>{item.duration}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Konum</Text>
            <Text style={styles.infoValue}>{item.location.city}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Açıklama</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Öne Çıkanlar</Text>
          {item.highlights.map((highlight, index) => (
            <View key={index} style={styles.highlightItem}>
              <Text style={styles.highlightIcon}>✓</Text>
              <Text style={styles.highlightText}>{highlight}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Etiketler</Text>
          <View style={styles.tagsContainer}>
            {item.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Müsait Tarihler</Text>
          <View style={styles.datesContainer}>
            {item.availableDates.map((date, index) => (
              <View key={index} style={styles.dateBadge}>
                <Text style={styles.dateText}>{date}</Text>
              </View>
            ))}
          </View>
        </View>

        <Button
          title="Rezervasyon Yap"
          onPress={() => {
            // Rezervasyon işlemi simülasyonu
            alert('Rezervasyon özelliği yakında eklenecek!');
          }}
          style={styles.reserveButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  categoryBadge: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textTransform: 'uppercase',
  },
  ratingBadge: {
    alignItems: 'flex-end',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400E',
  },
  reviewsText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  highlightIcon: {
    fontSize: 20,
    color: '#059669',
    marginRight: 12,
    fontWeight: '700',
  },
  highlightText: {
    fontSize: 15,
    color: '#374151',
    flex: 1,
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 13,
    color: '#059669',
    fontWeight: '600',
  },
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dateBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#92400E',
    fontWeight: '600',
  },
  reserveButton: {
    marginTop: 8,
    marginBottom: 32,
  },
});

export default DetailScreen;

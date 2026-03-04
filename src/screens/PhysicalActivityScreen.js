import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchPhysicalActivities } from '../data/mockData';
import { colors, shadows, borderRadius, spacing } from '../constants/colors';
import ErrorState from '../components/ErrorState';
import SkeletonLoader from '../components/SkeletonLoader';
import ModernButton from '../components/ModernButton';

const PhysicalActivityScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!loading && data.length > 0) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [loading, data]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchPhysicalActivities();
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LinearGradient
        colors={colors.gradients.primary}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.backButton}>
                <Text style={styles.backIcon}>←</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Fiziksel Aktivitelerim</Text>
            <View style={styles.placeholder} />
          </View>
          <SkeletonLoader />
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient
        colors={colors.gradients.primary}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.backButton}>
                <Text style={styles.backIcon}>←</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Fiziksel Aktivitelerim</Text>
            <View style={styles.placeholder} />
          </View>
          <ErrorState message={error} onRetry={loadData} />
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={colors.gradients.primary}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Modern Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Fiziksel Aktivitelerim</Text>
            <Text style={styles.headerSubtitle}>Egzersiz kayıtlarınız</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        {/* Modern Add Button */}
        <View style={styles.addButtonContainer}>
          <ModernButton
            title="Yeni Aktivite Ekle"
            onPress={() => {
              Alert.alert(
                'Bilgi',
                'Aktivite ekleme özelliği yakında aktif olacak!',
                [{ text: 'Tamam' }]
              );
            }}
            variant="secondary"
            icon="➕"
          />
        </View>

        {/* Activity Cards */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.cardsContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            {data.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.activityCard,
                  item.borderColor === 'green' && styles.greenBorder,
                  item.borderColor === 'red' && styles.redBorder,
                ]}
              >
                <LinearGradient
                  colors={
                    item.borderColor === 'green'
                      ? ['#FFFFFF', '#F0FDF4']
                      : ['#FFFFFF', '#FEF2F2']
                  }
                  style={styles.cardGradient}
                >
                  {item.day > 0 && (
                    <LinearGradient
                      colors={
                        item.borderColor === 'green'
                          ? colors.gradients.success
                          : colors.gradients.primary
                      }
                      style={styles.dayHeader}
                    >
                      <Text style={styles.dayTitle}>{item.day}. Gün Aktivitesi</Text>
                    </LinearGradient>
                  )}

                  <View style={styles.cardContent}>
                    {item.description ? (
                      <Text style={styles.description}>{item.description}</Text>
                    ) : null}

                    <View style={styles.activityDetails}>
                      <View style={styles.detailRow}>
                        <View style={styles.detailLabelContainer}>
                          <Text style={styles.detailLabel}>Aktivite Türü:</Text>
                        </View>
                        <View style={styles.detailValueContainer}>
                          <Text style={styles.detailValue}>{item.activityType}</Text>
                        </View>
                      </View>
                      <View style={styles.detailRow}>
                        <View style={styles.detailLabelContainer}>
                          <Text style={styles.detailLabel}>Süre:</Text>
                        </View>
                        <View style={styles.detailValueContainer}>
                          <Text style={styles.detailValue}>{item.duration} dk</Text>
                        </View>
                      </View>
                      <View style={styles.detailRow}>
                        <View style={styles.detailLabelContainer}>
                          <Text style={styles.detailLabel}>Durum:</Text>
                        </View>
                        <View
                          style={[
                            styles.statusBadge,
                            item.status === 'Yapıldı' && styles.statusDone,
                          ]}
                        >
                          <Text
                            style={[
                              styles.statusText,
                              item.status === 'Yapıldı' && styles.statusDoneText,
                            ]}
                          >
                            {item.status}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.detailRow}>
                        <View style={styles.detailLabelContainer}>
                          <Text
                            style={[
                              styles.detailLabel,
                              item.borderColor === 'red' && styles.redLabel,
                              item.borderColor === 'green' && styles.greenLabel,
                            ]}
                          >
                            Tarih-Saat:
                          </Text>
                        </View>
                        <Text style={styles.detailValue}>{item.dateTime}</Text>
                      </View>
                    </View>

                    <TouchableOpacity style={styles.deleteButton} activeOpacity={0.7}>
                      <LinearGradient
                        colors={colors.gradients.primary}
                        style={styles.deleteButtonGradient}
                      >
                        <Text style={styles.deleteIcon}>🗑️</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            ))}
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  backIcon: {
    fontSize: 20,
    color: colors.textWhite,
    fontWeight: 'bold',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textWhite,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    marginTop: 2,
  },
  placeholder: {
    width: 40,
  },
  addButtonContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  cardsContainer: {
    gap: spacing.md,
  },
  activityCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 3,
    ...shadows.large,
    marginBottom: spacing.md,
  },
  greenBorder: {
    borderColor: colors.gradients.success[0],
  },
  redBorder: {
    borderColor: colors.gradients.primary[0],
  },
  cardGradient: {
    borderRadius: borderRadius.xl,
  },
  dayHeader: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textWhite,
    textAlign: 'center',
  },
  cardContent: {
    padding: spacing.lg,
    position: 'relative',
  },
  description: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  activityDetails: {
    marginTop: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  detailLabelContainer: {
    minWidth: 120,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.gradients.success[0],
    fontWeight: '700',
  },
  greenLabel: {
    color: colors.gradients.success[0],
  },
  redLabel: {
    color: colors.gradients.primary[0],
  },
  detailValueContainer: {
    backgroundColor: colors.gradients.secondary[0] + '15',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  detailValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  statusBadge: {
    backgroundColor: colors.textTertiary + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: borderRadius.md,
  },
  statusDone: {
    backgroundColor: colors.gradients.success[0] + '20',
  },
  statusText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  statusDoneText: {
    color: colors.gradients.success[0],
  },
  deleteButton: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.md,
    width: 44,
    height: 44,
  },
  deleteButtonGradient: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.medium,
  },
  deleteIcon: {
    fontSize: 20,
  },
});

export default PhysicalActivityScreen;

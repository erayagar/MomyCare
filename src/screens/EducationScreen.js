import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, shadows, borderRadius, spacing } from '../constants/colors';
import ErrorState from '../components/ErrorState';

const EducationScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1000);
  }, []);

  const educationItems = [
    {
      id: '1',
      title: 'Kan Şekeri Yönetimi',
      description: 'Gebelikte kan şekeri değerlerini nasıl kontrol edeceğinizi öğrenin.',
      icon: '🩸',
      gradient: colors.gradients.primary,
    },
    {
      id: '2',
      title: 'Beslenme Rehberi',
      description: 'Sağlıklı beslenme alışkanlıkları ve gebelikte önemli besinler.',
      icon: '🥗',
      gradient: colors.gradients.success,
    },
    {
      id: '3',
      title: 'Egzersiz Programları',
      description: 'Gebelikte güvenli egzersiz hareketleri ve programları.',
      icon: '🏃',
      gradient: colors.gradients.accent,
    },
    {
      id: '4',
      title: 'İnsülin Kullanımı',
      description: 'İnsülin enjeksiyonu ve doz ayarlama hakkında bilgiler.',
      icon: '💉',
      gradient: colors.gradients.secondary,
    },
  ];

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
            <Text style={styles.headerTitle}>Eğitimler</Text>
            <View style={styles.placeholder} />
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.textWhite} />
          </View>
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
            <Text style={styles.headerTitle}>Eğitimler</Text>
            <View style={styles.placeholder} />
          </View>
          <ErrorState message={error} onRetry={() => setError(null)} />
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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Eğitimler</Text>
            <Text style={styles.headerSubtitle}>Sağlık bilgileri ve rehberler</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.itemsContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            {educationItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={styles.educationCard}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
                  style={styles.cardGradient}
                >
                  <View style={styles.cardContent}>
                    <LinearGradient
                      colors={item.gradient}
                      style={styles.iconContainer}
                    >
                      <Text style={styles.cardIcon}>{item.icon}</Text>
                    </LinearGradient>
                    <View style={styles.textContainer}>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={styles.cardDescription}>{item.description}</Text>
                    </View>
                    <View style={styles.arrowContainer}>
                      <LinearGradient
                        colors={item.gradient}
                        style={styles.arrowGradient}
                      >
                        <Text style={styles.arrowIcon}>→</Text>
                      </LinearGradient>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
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
    fontSize: 24,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  itemsContainer: {
    gap: spacing.md,
  },
  educationCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.large,
    marginBottom: spacing.md,
  },
  cardGradient: {
    borderRadius: borderRadius.xl,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.medium,
  },
  cardIcon: {
    fontSize: 32,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    letterSpacing: -0.3,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  arrowContainer: {
    width: 40,
    height: 40,
  },
  arrowGradient: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.small,
  },
  arrowIcon: {
    fontSize: 18,
    color: colors.textWhite,
    fontWeight: 'bold',
  },
});

export default EducationScreen;

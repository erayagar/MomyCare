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

const DailyGoalsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnims = useRef({}).current;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      
      // Progress animasyonları
      goals.forEach((goal) => {
        if (!progressAnims[goal.id]) {
          progressAnims[goal.id] = new Animated.Value(0);
        }
        Animated.timing(progressAnims[goal.id], {
          toValue: goal.status === 'completed' ? 1 : 0.7,
          duration: 1000,
          delay: 200,
          useNativeDriver: false,
        }).start();
      });
    }, 1000);
  }, []);

  const goals = [
    {
      id: '1',
      title: 'Kan Şekeri Hedefleri',
      target: 'Açlık: 60-95 mg/dl',
      current: 'Açlık: 75 mg/dl',
      status: 'completed',
      icon: '🩸',
      gradient: colors.gradients.primary,
    },
    {
      id: '2',
      title: 'Su Tüketimi',
      target: '2.5 Litre',
      current: '1.8 Litre',
      status: 'in-progress',
      icon: '💧',
      gradient: colors.gradients.secondary,
    },
    {
      id: '3',
      title: 'Egzersiz',
      target: '30 dakika',
      current: '20 dakika',
      status: 'in-progress',
      icon: '🏃',
      gradient: colors.gradients.accent,
    },
    {
      id: '4',
      title: 'Kalori Alımı',
      target: '2200 kcal',
      current: '1850 kcal',
      status: 'in-progress',
      icon: '🍎',
      gradient: colors.gradients.success,
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
            <Text style={styles.headerTitle}>Günlük Hedefler</Text>
            <View style={styles.placeholder} />
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.textWhite} />
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors.gradients.primary}
        style={styles.headerGradient}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.backButton}>
                <Text style={styles.backIcon}>←</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Günlük Hedefler</Text>
              <Text style={styles.headerSubtitle}>Günlük hedeflerinizi takip edin</Text>
            </View>
            <View style={styles.placeholder} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          {/* Modern Main Goals Card */}
          <View style={styles.mainCard}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={styles.mainCardGradient}
            >
              <View style={styles.mainCardIcon}>
                <Text style={styles.mainCardEmoji}>🎯</Text>
              </View>
              <Text style={styles.mainCardTitle}>Günlük Hedefler</Text>
              <View style={styles.mainCardDecoration} />
            </LinearGradient>
          </View>

          {/* Modern Goals List */}
          {goals.map((goal) => {
            const progressWidth = progressAnims[goal.id]?.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', goal.status === 'completed' ? '100%' : '70%'],
            }) || '0%';

            return (
              <View key={goal.id} style={styles.goalCard}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
                  style={styles.goalCardGradient}
                >
                  <View style={styles.goalHeader}>
                    <LinearGradient
                      colors={goal.gradient}
                      style={styles.goalIconContainer}
                    >
                      <Text style={styles.goalIcon}>{goal.icon}</Text>
                    </LinearGradient>
                    <View style={styles.goalInfo}>
                      <Text style={styles.goalTitle}>{goal.title}</Text>
                      <Text style={styles.goalTarget}>Hedef: {goal.target}</Text>
                      <Text style={styles.goalCurrent}>Mevcut: {goal.current}</Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        goal.status === 'completed' && styles.statusCompleted,
                      ]}
                    >
                      <Text style={styles.statusText}>
                        {goal.status === 'completed' ? '✓' : '...'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar}>
                      <Animated.View
                        style={[
                          styles.progressFill,
                          {
                            width: progressWidth,
                            backgroundColor: goal.gradient[0],
                          },
                        ]}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </View>
            );
          })}

          {/* Modern Information Card */}
          <View style={styles.infoCard}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
              style={styles.infoCardGradient}
            >
              <Text style={styles.infoTitle}>Gebelikte Hedeflenen Kan Şekeri Değerleri</Text>
              <View style={styles.infoList}>
                <View style={styles.infoItem}>
                  <View style={styles.infoBullet} />
                  <Text style={styles.infoItemText}>
                    Açlık kan şekeri: <Text style={styles.infoBold}>60-95 mg/dl</Text>
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <View style={styles.infoBullet} />
                  <Text style={styles.infoItemText}>
                    Yemekten 1 saat sonra: <Text style={styles.infoBold}>140 mg/dl altında</Text>
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <View style={styles.infoBullet} />
                  <Text style={styles.infoItemText}>
                    Yemekten 2 saat sonra: <Text style={styles.infoBold}>120 mg/dl altında</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.warningBox}>
                <Text style={styles.warningText}>
                  ⚠️ Kan şekeri değeri 60 mg/dl altında olmamalı!
                </Text>
              </View>
            </LinearGradient>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerGradient: {
    paddingBottom: spacing.md,
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
  content: {
    gap: spacing.md,
  },
  mainCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadows.xlarge,
  },
  mainCardGradient: {
    padding: spacing.xl,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  mainCardIcon: {
    marginBottom: spacing.md,
  },
  mainCardEmoji: {
    fontSize: 64,
  },
  mainCardTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textWhite,
    letterSpacing: -0.5,
  },
  mainCardDecoration: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 150,
    height: 150,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  goalCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.large,
  },
  goalCardGradient: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  goalIconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    ...shadows.medium,
  },
  goalIcon: {
    fontSize: 28,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    letterSpacing: -0.3,
  },
  goalTarget: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  goalCurrent: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  statusBadge: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: colors.textTertiary + '30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusCompleted: {
    backgroundColor: colors.gradients.success[0] + '30',
  },
  statusText: {
    fontSize: 20,
    color: colors.gradients.success[0],
    fontWeight: '800',
  },
  progressBarContainer: {
    marginTop: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.borderLight,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  infoCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginTop: spacing.md,
    ...shadows.large,
  },
  infoCardGradient: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    letterSpacing: -0.3,
  },
  infoList: {
    marginBottom: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  infoBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.gradients.primary[0],
    marginTop: 6,
    marginRight: spacing.sm,
  },
  infoItemText: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  infoBold: {
    fontWeight: '800',
    color: colors.gradients.primary[0],
  },
  warningBox: {
    backgroundColor: colors.gradients.accent[0] + '20',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.gradients.accent[0],
  },
  warningText: {
    fontSize: 14,
    color: colors.gradients.accent[0],
    fontWeight: '700',
    lineHeight: 20,
  },
});

export default DailyGoalsScreen;

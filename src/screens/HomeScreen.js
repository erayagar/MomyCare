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
import { fetchHomeCards } from '../data/mockData';
import { colors, shadows, borderRadius, spacing } from '../constants/colors';
import ErrorState from '../components/ErrorState';
import AnimatedCard from '../components/AnimatedCard';

const HomeScreen = ({ navigation }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    if (!loading && cards.length > 0) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [loading, cards]);

  const loadCards = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchHomeCards();
      setCards(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCardPress = (card) => {
    if (card.screen === 'Forms') {
      navigation.navigate('Forms');
    } else if (card.screen === 'Education') {
      navigation.navigate('Education');
    } else if (card.screen === 'DailyGoals') {
      navigation.navigate('DailyGoals');
    } else if (card.screen === 'FAQ') {
      navigation.navigate('FAQ');
    } else if (card.screen === 'Notifications') {
      navigation.navigate('Notifications');
    } else if (card.screen === 'Survey') {
      navigation.navigate('Survey');
    } else if (card.screen === 'WhatsappEmergency') {
      navigation.navigate('WhatsappEmergency');
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('tr-TR', options);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Anasayfa</Text>
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Yükleniyor...</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Anasayfa</Text>
          </View>
          <ErrorState message={error} onRetry={loadCards} />
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Profesyonel Header */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View>
                <Text style={styles.greeting}>Merhaba</Text>
                <Text style={styles.userName}>Değerli Kullanıcı</Text>
              </View>
              <TouchableOpacity style={styles.profileButton}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>DK</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.date}>{getCurrentDate()}</Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Hoş Geldiniz Kartı */}
            <Animated.View
              style={[
                styles.welcomeCard,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <View style={styles.welcomeContent}>
                <View style={styles.welcomeIcon}>
                  <Text style={styles.welcomeEmoji}>👋</Text>
                </View>
                <View style={styles.welcomeTextContainer}>
                  <Text style={styles.welcomeTitle}>Hoş Geldiniz!</Text>
                  <Text style={styles.welcomeSubtitle}>
                    Sağlık takibinizi kolaylaştırmak için buradayız
                  </Text>
                </View>
              </View>
            </Animated.View>

            {/* Modüller Başlığı */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Modüller</Text>
            </View>

            {/* Kartlar Grid - Tüm kartlar tam genişlikte */}
            <View style={styles.cardsContainer}>
              {cards.map((card, index) => (
                <AnimatedCard
                  key={card.id}
                  icon={card.icon}
                  title={card.title}
                  onPress={() => handleCardPress(card)}
                  wide={true}
                  index={index}
                />
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  animatedContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textSecondary,
    marginBottom: 2,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  date: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    ...shadows.small,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textWhite,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.xxl,
  },
  welcomeCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.sectionSpacing,
    ...shadows.medium,
  },
  welcomeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    backgroundColor: colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  welcomeEmoji: {
    fontSize: 28,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  welcomeSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  cardsContainer: {
    flexDirection: 'column',
    gap: spacing.md,
  },
});

export default HomeScreen;

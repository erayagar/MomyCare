import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, shadows, borderRadius, spacing } from '../constants/colors';

const FORM_CARDS = [
  {
    id: '1',
    title: 'Kan Şekeri\nİzlem',
    bigIcon: '🩺',
    screen: 'BloodSugar',
    gradient: ['#FFFFFF', '#FFF0F1'],
    accentColor: '#EE3A4C',
  },
  {
    id: '2',
    title: 'Fiziksel\nAktivite',
    bigIcon: '🤸‍♀️',
    screen: 'PhysicalActivity',
    gradient: ['#FFFFFF', '#F0F4FF'],
    accentColor: '#4169E1',
  },
  {
    id: '3',
    title: 'Beslenme\nDeğerlendirme',
    bigIcon: '🥦',
    screen: 'Nutrition',
    gradient: ['#FFFFFF', '#F0FFF4'],
    accentColor: '#34C759',
  },
];

const FormsScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
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
  }, []);

  return (
    <LinearGradient colors={['#EE3A4C', '#FF6B6B']} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Formlar</Text>
            <Text style={styles.headerSubtitle}>Sağlık kayıt formları</Text>
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
              styles.grid,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.row}>
              {FORM_CARDS.slice(0, 2).map((card) => (
                <TouchableOpacity
                  key={card.id}
                  style={styles.gridCard}
                  onPress={() => navigation.navigate(card.screen)}
                  activeOpacity={0.85}
                >
                  <LinearGradient colors={card.gradient} style={styles.cardGradient}>
                    <View
                      style={[
                        styles.cardIconWrapper,
                        { backgroundColor: card.accentColor + '18' },
                      ]}
                    >
                      <Text style={styles.cardBigIcon}>{card.bigIcon}</Text>
                    </View>
                    <Text style={[styles.cardTitle, { color: card.accentColor }]}>
                      {card.title}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.fullCard}
              onPress={() => navigation.navigate(FORM_CARDS[2].screen)}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={FORM_CARDS[2].gradient}
                style={styles.fullCardGradient}
              >
                <View
                  style={[
                    styles.fullCardIconWrapper,
                    { backgroundColor: FORM_CARDS[2].accentColor + '18' },
                  ]}
                >
                  <Text style={styles.fullCardBigIcon}>{FORM_CARDS[2].bigIcon}</Text>
                </View>
                <Text
                  style={[
                    styles.fullCardTitle,
                    { color: FORM_CARDS[2].accentColor },
                  ]}
                >
                  {FORM_CARDS[2].title.replace('\n', ' ')}
                </Text>
                <Text style={[styles.fullCardArrow, { color: FORM_CARDS[2].accentColor }]}>→</Text>
              </LinearGradient>
            </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  backIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  grid: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  gridCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  cardGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 160,
    justifyContent: 'center',
  },
  cardIconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardBigIcon: {
    fontSize: 38,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 20,
  },
  fullCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  fullCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  fullCardIconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullCardBigIcon: {
    fontSize: 38,
  },
  fullCardTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 24,
  },
  fullCardArrow: {
    fontSize: 22,
    fontWeight: '800',
  },
});

export default FormsScreen;

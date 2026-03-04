import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, shadows, borderRadius, spacing } from '../constants/colors';

const FAQScreen = ({ navigation }) => {
  const [expandedItems, setExpandedItems] = useState([]);
  const rotateAnims = useRef({}).current;

  const faqItems = [
    {
      id: '1',
      question: 'Gebelikte kan şekeri değerleri nasıl olmalıdır?',
      answer: 'Gebelikte açlık kan şekeri 60-95 mg/dl arasında olmalıdır. Yemekten 1 saat sonra 140 mg/dl, 2 saat sonra ise 120 mg/dl altında olmalıdır. Kan şekeri değeri 60 mg/dl altında olmamalıdır.',
    },
    {
      id: '2',
      question: 'İnsülin dozu nasıl ayarlanır?',
      answer: 'İnsülin dozu doktorunuz tarafından belirlenir ve kan şekeri değerlerinize göre ayarlanır. Doz ayarlamalarını mutlaka doktorunuzla görüşerek yapmalısınız.',
    },
    {
      id: '3',
      question: 'Gebelikte hangi egzersizler güvenlidir?',
      answer: 'Yürüyüş, yüzme, gebelik yogası gibi hafif egzersizler gebelikte güvenlidir. Ağır egzersizlerden ve düşme riski olan aktivitelerden kaçınmalısınız.',
    },
    {
      id: '4',
      question: 'Günlük kalori ihtiyacım ne kadar?',
      answer: 'Gebelikte günlük kalori ihtiyacı genellikle 2200 kcal civarındadır. Ancak bu değer kişiden kişiye değişebilir ve doktorunuz tarafından belirlenmelidir.',
    },
    {
      id: '5',
      question: 'Kan şekeri düşüklüğünde ne yapmalıyım?',
      answer: 'Kan şekeri düşüklüğünde (hipoglisemi) hızlı etkili şeker almalısınız. 15-20 gram karbonhidrat içeren bir şey yiyip 15 dakika bekleyin, sonra tekrar ölçün.',
    },
  ];

  const toggleItem = (id) => {
    if (!rotateAnims[id]) {
      rotateAnims[id] = new Animated.Value(0);
    }

    const isExpanded = expandedItems.includes(id);
    setExpandedItems((prev) =>
      isExpanded
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );

    Animated.spring(rotateAnims[id], {
      toValue: isExpanded ? 0 : 1,
      useNativeDriver: true,
      friction: 4,
    }).start();
  };

  const rotate = (id) => {
    if (!rotateAnims[id]) {
      rotateAnims[id] = new Animated.Value(0);
    }
    return rotateAnims[id].interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
  };

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
            <Text style={styles.headerTitle}>Sık Sorulan Sorular</Text>
            <Text style={styles.headerSubtitle}>Yardıma mı ihtiyacınız var?</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={colors.gradients.accent}
              style={styles.iconGradient}
            >
              <Text style={styles.mainIcon}>😰</Text>
            </LinearGradient>
          </View>

          {faqItems.map((item) => {
            const isExpanded = expandedItems.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.faqCard}
                onPress={() => toggleItem(item.id)}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
                  style={styles.faqGradient}
                >
                  <View style={styles.faqHeader}>
                    <Text style={styles.faqQuestion}>{item.question}</Text>
                    <Animated.View
                      style={[
                        styles.expandIconContainer,
                        {
                          transform: [{ rotate: rotate(item.id) }],
                        },
                      ]}
                    >
                      <LinearGradient
                        colors={colors.gradients.primary}
                        style={styles.expandIconGradient}
                      >
                        <Text style={styles.expandIcon}>▼</Text>
                      </LinearGradient>
                    </Animated.View>
                  </View>
                  {isExpanded && (
                    <View style={styles.faqAnswerContainer}>
                      <Text style={styles.faqAnswer}>{item.answer}</Text>
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.large,
  },
  mainIcon: {
    fontSize: 48,
  },
  faqCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.large,
  },
  faqGradient: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginRight: spacing.md,
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  expandIconContainer: {
    width: 32,
    height: 32,
  },
  expandIconGradient: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.small,
  },
  expandIcon: {
    fontSize: 12,
    color: colors.textWhite,
    fontWeight: 'bold',
  },
  faqAnswerContainer: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  faqAnswer: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});

export default FAQScreen;

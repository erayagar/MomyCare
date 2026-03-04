import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, shadows, borderRadius, spacing } from '../constants/colors';
import ModernButton from '../components/ModernButton';

const SurveyScreen = ({ navigation }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const questions = [
    {
      id: '1',
      question: 'Günlük kan şekeri ölçümlerinizi düzenli yapıyor musunuz?',
      type: 'radio',
      options: ['Evet, her gün', 'Bazen', 'Hayır'],
    },
    {
      id: '2',
      question: 'Günlük egzersiz yapıyor musunuz?',
      type: 'radio',
      options: ['Evet, düzenli', 'Ara sıra', 'Hayır'],
    },
    {
      id: '3',
      question: 'Beslenme planınıza uyuyor musunuz?',
      type: 'radio',
      options: ['Evet, tamamen', 'Kısmen', 'Hayır'],
    },
    {
      id: '4',
      question: 'İlaçlarınızı düzenli kullanıyor musunuz?',
      type: 'radio',
      options: ['Evet, her zaman', 'Bazen unutuyorum', 'Hayır'],
    },
    {
      id: '5',
      question: 'Eklemek istediğiniz görüş veya önerileriniz var mı?',
      type: 'text',
    },
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      alert('Anket başarıyla gönderildi! Teşekkür ederiz.');
      navigation.goBack();
    }, 1000);
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
            <Text style={styles.headerTitle}>Anket</Text>
            <Text style={styles.headerSubtitle}>Geri bildiriminiz bizim için değerli</Text>
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
              styles.content,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={colors.gradients.accent}
                style={styles.iconGradient}
              >
                <Text style={styles.mainIcon}>🏋️</Text>
              </LinearGradient>
            </View>

            <View style={styles.descriptionCard}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
                style={styles.descriptionGradient}
              >
                <Text style={styles.description}>
                  Lütfen aşağıdaki soruları cevaplayarak bize geri bildirimde bulunun.
                </Text>
              </LinearGradient>
            </View>

            {questions.map((q, index) => (
              <View key={q.id} style={styles.questionCard}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
                  style={styles.questionGradient}
                >
                  <Text style={styles.questionText}>{q.question}</Text>

                  {q.type === 'radio' ? (
                    <View style={styles.optionsContainer}>
                      {q.options.map((option, optIndex) => (
                        <TouchableOpacity
                          key={optIndex}
                          style={[
                            styles.optionButton,
                            answers[q.id] === option && styles.optionSelected,
                          ]}
                          onPress={() => handleAnswer(q.id, option)}
                          activeOpacity={0.8}
                        >
                          {answers[q.id] === option && (
                            <LinearGradient
                              colors={colors.gradients.success}
                              style={styles.optionSelectedGradient}
                            >
                              <Text style={styles.optionTextSelected}>{option}</Text>
                            </LinearGradient>
                          )}
                          {answers[q.id] !== option && (
                            <Text style={styles.optionText}>{option}</Text>
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <TextInput
                      style={styles.textInput}
                      placeholder="Cevabınızı buraya yazın..."
                      placeholderTextColor={colors.textTertiary}
                      multiline
                      numberOfLines={4}
                      value={answers[q.id] || ''}
                      onChangeText={(text) => handleAnswer(q.id, text)}
                    />
                  )}
                </LinearGradient>
              </View>
            ))}

            <ModernButton
              title={submitted ? 'Gönderiliyor...' : 'Anketi Gönder'}
              onPress={handleSubmit}
              disabled={submitted || Object.keys(answers).length < questions.length - 1}
              variant="success"
              style={styles.submitButton}
            />
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
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
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
  descriptionCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.medium,
  },
  descriptionGradient: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  description: {
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
  questionCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.large,
  },
  questionGradient: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  optionsContainer: {
    gap: spacing.sm,
  },
  optionButton: {
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.borderLight,
    backgroundColor: colors.cardBackground,
    ...shadows.small,
  },
  optionSelected: {
    borderColor: colors.gradients.success[0],
    overflow: 'hidden',
  },
  optionSelectedGradient: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  optionText: {
    fontSize: 14,
    color: colors.textPrimary,
    textAlign: 'center',
    fontWeight: '600',
  },
  optionTextSelected: {
    fontSize: 14,
    color: colors.textWhite,
    textAlign: 'center',
    fontWeight: '700',
  },
  textInput: {
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    fontSize: 14,
    color: colors.textPrimary,
    borderWidth: 2,
    borderColor: colors.borderLight,
    textAlignVertical: 'top',
    minHeight: 100,
    ...shadows.small,
  },
  submitButton: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
});

export default SurveyScreen;

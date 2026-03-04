import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchNutritionData, getMeals } from '../data/mockData';
import { colors, shadows, borderRadius, spacing } from '../constants/colors';
import ErrorState from '../components/ErrorState';
import ModernButton from '../components/ModernButton';

const NutritionScreen = ({ navigation }) => {
  const [pregnancyWeek, setPregnancyWeek] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('Sabah');
  const [totalCalories, setTotalCalories] = useState(80.50);
  const [loading, setLoading] = useState(false);
  const [meals] = useState(getMeals());

  const handleGoToFoodSelection = () => {
    navigation.navigate('FoodSelection');
  };

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
            <Text style={styles.headerTitle}>Beslenme Ekleme</Text>
            <Text style={styles.headerSubtitle}>Günlük beslenme takibi</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Modern Form Card */}
          <View style={styles.formCard}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
              style={styles.formGradient}
            >
              {/* Pregnancy Week Selection */}
              <View style={styles.section}>
                <Text style={styles.label}>Gebelik Haftasını Seçiniz</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Gebelik Haftasını Seçiniz"
                    placeholderTextColor={colors.textTertiary}
                    value={pregnancyWeek}
                    onChangeText={setPregnancyWeek}
                  />
                  <View style={styles.dropdownIconContainer}>
                    <Text style={styles.dropdownIcon}>▼</Text>
                  </View>
                </View>
              </View>

              {/* Meal Selection */}
              <View style={styles.section}>
                <Text style={styles.label}>Öğünü Seçiniz</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    value={selectedMeal}
                    editable={false}
                  />
                  <View style={styles.dropdownIconContainer}>
                    <Text style={styles.dropdownIcon}>▼</Text>
                  </View>
                </View>
              </View>

              {/* Go to Food Selection Button */}
              <ModernButton
                title="Besin Seçimine Git"
                onPress={handleGoToFoodSelection}
                variant="accent"
                icon="→"
                style={styles.foodSelectionButton}
              />

              {/* Total Calories Card */}
              <View style={styles.caloriesCard}>
                <LinearGradient
                  colors={colors.gradients.success}
                  style={styles.caloriesGradient}
                >
                  <Text style={styles.caloriesLabel}>Toplam Kalori</Text>
                  <Text style={styles.caloriesValue}>{totalCalories} cal</Text>
                </LinearGradient>
              </View>
            </LinearGradient>
          </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  formCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.xlarge,
  },
  formGradient: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.textPrimary,
    borderWidth: 2,
    borderColor: colors.borderLight,
    ...shadows.small,
  },
  dropdownIconContainer: {
    position: 'absolute',
    right: spacing.md,
    top: spacing.md,
  },
  dropdownIcon: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  foodSelectionButton: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  caloriesCard: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.medium,
  },
  caloriesGradient: {
    padding: spacing.lg,
    alignItems: 'center',
    borderRadius: borderRadius.lg,
  },
  caloriesLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  caloriesValue: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.textWhite,
    letterSpacing: -1,
  },
});

export default NutritionScreen;

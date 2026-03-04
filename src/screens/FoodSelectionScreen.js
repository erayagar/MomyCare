import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, shadows, borderRadius, spacing } from '../constants/colors';
import ModernButton from '../components/ModernButton';

const FoodSelectionScreen = ({ navigation }) => {
  const [selectedFood, setSelectedFood] = useState('Ayran');
  const [quantity, setQuantity] = useState('');

  const foodDetails = {
    name: 'Ayran',
    calories: 114,
    unit: 'Cc',
    measurement: '300 Cc',
    description: '1,5 su bardağı = 300 ml',
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
            <Text style={styles.headerTitle}>Besin Ekleme</Text>
            <Text style={styles.headerSubtitle}>Besin bilgileri</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Food Selection */}
          <View style={styles.section}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={selectedFood}
                editable={false}
              />
              <View style={styles.dropdownIconContainer}>
                <Text style={styles.dropdownIcon}>▼</Text>
              </View>
            </View>
          </View>

          {/* Modern Food Details Card */}
          <View style={styles.detailsCard}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
              style={styles.detailsGradient}
            >
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Besin Adı:</Text>
                <View style={styles.detailValueContainer}>
                  <Text style={styles.detailValue}>{foodDetails.name}</Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Kalorisi:</Text>
                <View style={styles.caloriesContainer}>
                  <Text style={styles.caloriesValue}>{foodDetails.calories}</Text>
                  <Text style={styles.caloriesUnit}>cal / {foodDetails.measurement}</Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Ölçüm Birimi:</Text>
                <View style={styles.detailValueContainer}>
                  <Text style={styles.detailValue}>{foodDetails.unit}</Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Açıklama:</Text>
                <Text style={styles.detailDescription}>{foodDetails.description}</Text>
              </View>
            </LinearGradient>
          </View>

          {/* Quantity Input */}
          <View style={styles.section}>
            <Text style={styles.label}>Besin Miktarı (Cc)</Text>
            <TextInput
              style={styles.quantityInput}
              placeholder="Besin miktarını giriniz"
              placeholderTextColor={colors.textTertiary}
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />
          </View>

          {/* Save Button */}
          <ModernButton
            title="Listeye Kaydet"
            onPress={() => {}}
            variant="secondary"
            style={styles.saveButton}
          />
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
  detailsCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadows.large,
  },
  detailsGradient: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textLabel,
    fontWeight: '600',
    marginRight: spacing.sm,
    minWidth: 120,
  },
  detailValueContainer: {
    backgroundColor: colors.gradients.secondary[0] + '15',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  caloriesContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: colors.gradients.accent[0] + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: borderRadius.md,
    gap: 4,
  },
  caloriesValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.gradients.accent[0],
  },
  caloriesUnit: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  detailDescription: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '400',
    flex: 1,
    lineHeight: 20,
  },
  quantityInput: {
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
  saveButton: {
    marginTop: spacing.md,
  },
});

export default FoodSelectionScreen;

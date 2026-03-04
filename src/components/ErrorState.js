import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, shadows, borderRadius, spacing } from '../constants/colors';

const ErrorState = ({ message = 'Bir hata oluştu', onRetry }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>⚠️</Text>
      </View>
      <Text style={styles.title}>{message}</Text>
      <Text style={styles.subtitle}>
        Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.
      </Text>
      {onRetry && (
        <TouchableOpacity 
          style={styles.button} 
          onPress={onRetry}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Tekrar Dene</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: colors.cardBackground,
  },
  iconContainer: {
    marginBottom: 24,
  },
  icon: {
    fontSize: 64,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    ...shadows.medium,
  },
  buttonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ErrorState;

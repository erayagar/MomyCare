import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, borderRadius, spacing } from '../constants/colors';

const Chip = ({ 
  label, 
  selected = false, 
  onPress,
  style,
  variant = 'default'
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        selected && styles.selected,
        variant === 'outline' && styles.outline,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          selected && styles.selectedLabel,
          variant === 'outline' && selected && styles.outlineSelectedLabel,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.chipBackground,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 32,
  },
  selected: {
    backgroundColor: colors.chipSelected,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.borderMedium,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  selectedLabel: {
    color: colors.textWhite,
    fontWeight: '600',
  },
  outlineSelectedLabel: {
    color: colors.chipSelected,
  },
});

export default Chip;

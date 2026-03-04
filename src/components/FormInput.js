import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing } from '../constants/colors';

const FormInput = ({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  ...props
}) => {
  const showError = touched && error;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          showError && styles.inputError,
          multiline && styles.inputMultiline,
          !editable && styles.inputDisabled,
        ]}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={editable}
        accessibilityLabel={label || placeholder}
        accessibilityHint={error || undefined}
        accessibilityState={{ invalid: !!showError }}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.borderLight,
    minHeight: 48,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: colors.error,
  },
  inputDisabled: {
    backgroundColor: colors.borderLight,
    opacity: 0.6,
  },
  errorText: {
    fontSize: 12,
    color: colors.primaryDark,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default FormInput;

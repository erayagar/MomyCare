import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, shadows, borderRadius, spacing } from '../constants/colors';

const ModernButton = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  style,
  ...props
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.96,
        useNativeDriver: true,
        friction: 3,
      }),
      Animated.timing(rippleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 3,
      }),
      Animated.timing(rippleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };

  const getGradient = () => {
    switch (variant) {
      case 'primary':
        return colors.gradients.primary;
      case 'secondary':
        return colors.gradients.secondary;
      case 'accent':
        return colors.gradients.accent;
      case 'success':
        return colors.gradients.success;
      default:
        return colors.gradients.primary;
    }
  };

  const rippleScale = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 4],
  });

  const rippleOpacity = rippleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.3, 0],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: scaleAnim }] },
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={1}
        style={styles.touchable}
        {...props}
      >
        <LinearGradient
          colors={getGradient()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Animated.View
            style={[
              styles.ripple,
              {
                transform: [{ scale: rippleScale }],
                opacity: rippleOpacity,
              },
            ]}
          />
          
          {loading ? (
            <ActivityIndicator color={colors.textWhite} size="small" />
          ) : (
            <View style={styles.content}>
              {icon && <Text style={styles.icon}>{icon}</Text>}
              <Text style={styles.text}>{title}</Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...shadows.medium,
  },
  touchable: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    position: 'relative',
    overflow: 'hidden',
  },
  ripple: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: borderRadius.full,
    backgroundColor: colors.textWhite,
    top: '50%',
    left: '50%',
    marginTop: -50,
    marginLeft: -50,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 18,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textWhite,
    letterSpacing: 0.3,
  },
  disabled: {
    opacity: 0.6,
  },
});

export default ModernButton;

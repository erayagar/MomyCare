import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { colors, shadows, borderRadius, spacing } from '../constants/colors';

const AnimatedCard = ({ 
  icon, 
  title, 
  onPress, 
  wide = false,
  index = 0 
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Stagger animation
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 50,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  // Icon'a göre renk belirleme
  const getCardColor = () => {
    const cardColors = [
      colors.primary,
      colors.secondary,
      colors.accent,
      colors.success,
    ];
    return cardColors[index % cardColors.length];
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          transform: [
            { translateY: translateYAnim },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={styles.touchable}
      >
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={[styles.iconContainer, { backgroundColor: getCardColor() + '15' }]}>
              <Text style={styles.icon}>{icon}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.arrowContainer}>
              <Text style={styles.arrow}>→</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.md,
  },
  wideContainer: {
    width: '100%',
    marginBottom: spacing.md,
  },
  touchable: {
    width: '100%',
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.cardPadding,
    minHeight: 100,
    ...shadows.medium,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: 22,
  },
  arrowContainer: {
    marginLeft: spacing.sm,
  },
  arrow: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default AnimatedCard;

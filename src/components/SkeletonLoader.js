import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors, shadows, borderRadius, spacing } from '../constants/colors';

const SkeletonLoader = () => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.container}>
      {[1, 2, 3].map((item) => (
        <View key={item} style={styles.card}>
          <Animated.View 
            style={[styles.imageSkeleton, { opacity }]} 
          />
          <View style={styles.content}>
            <Animated.View 
              style={[styles.line, styles.shortLine, { opacity }]} 
            />
            <Animated.View 
              style={[styles.line, styles.mediumLine, { opacity }]} 
            />
            <Animated.View 
              style={[styles.line, styles.longLine, { opacity }]} 
            />
            <View style={styles.footer}>
              <Animated.View 
                style={[styles.line, styles.priceLine, { opacity }]} 
              />
              <Animated.View 
                style={[styles.line, styles.durationLine, { opacity }]} 
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
    overflow: 'hidden',
    ...shadows.large,
  },
  imageSkeleton: {
    width: '100%',
    height: 200,
    backgroundColor: colors.borderLight,
  },
  content: {
    padding: spacing.lg,
  },
  line: {
    height: 12,
    backgroundColor: colors.borderLight,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
  },
  shortLine: {
    width: '30%',
  },
  mediumLine: {
    width: '60%',
  },
  longLine: {
    width: '90%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  priceLine: {
    width: '25%',
    height: 16,
  },
  durationLine: {
    width: '20%',
    height: 14,
  },
});

export default SkeletonLoader;

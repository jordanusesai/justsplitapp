import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: number | string;
  height?: number | string;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'circular':
        return { borderRadius: typeof height === 'number' ? height / 2 : 9999 };
      case 'rectangular':
        return { borderRadius: 8 };
      default:
        return { borderRadius: 4, height: 16 };
    }
  };

  return (
    <Animated.View
      style={[
        styles.base,
        getVariantStyle(),
        { width: typeof width === 'string' ? parseFloat(width) || 100 : width, height: typeof height === 'string' ? parseFloat(height) || 100 : height, opacity },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#E5E7EB',
  },
});

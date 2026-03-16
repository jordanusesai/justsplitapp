import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Animated, ViewStyle } from 'react-native';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
  style?: ViewStyle;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  style,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onClose?.();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, fadeAnim, onClose]);

  const typeStyles = {
    success: { backgroundColor: '#16A34A' },
    error: { backgroundColor: '#DC2626' },
    info: { backgroundColor: '#2563EB' },
    warning: { backgroundColor: '#D97706' },
  };

  return (
    <Animated.View
      style={[
        styles.container,
        typeStyles[type],
        { opacity: fadeAnim },
        style,
      ]}
      accessibilityRole="alert"
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100, // Above tab bar
    left: 20,
    right: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 9999,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

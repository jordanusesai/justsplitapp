import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from '@justsplitapp/tokens';

export interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'large', 
  color = colors.primary[500] 
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

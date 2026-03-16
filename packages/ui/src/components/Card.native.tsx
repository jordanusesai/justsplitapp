import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { colors, shadows, borderRadius } from '@justsplitapp/tokens';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
  elevation?: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  style, 
  elevation = 'base',
  ...props 
}) => {
  return (
    <View 
      style={[
        styles.card, 
        elevation !== 'none' && styles.shadow,
        style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12, // Matches UI Prompt (12-16px)
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});

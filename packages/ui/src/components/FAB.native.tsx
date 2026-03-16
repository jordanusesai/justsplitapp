import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@justsplitapp/tokens';

export interface FABProps {
  icon: React.ReactNode;
  onPress: () => void;
  label: string;
  style?: ViewStyle;
}

export const FAB: React.FC<FABProps> = ({
  icon,
  onPress,
  label,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.fab, style]}
      accessibilityLabel={label}
      accessibilityRole="button"
      activeOpacity={0.8}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 80, // Above tab bar
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 1000,
  },
});

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '@justsplitapp/tokens';

export interface ActionChipProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'critical';
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export const ActionChip: React.FC<ActionChipProps> = ({
  label,
  onPress,
  variant = 'outline',
  icon,
  style,
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'primary': return styles.primary;
      case 'secondary': return styles.secondary;
      case 'critical': return styles.critical;
      default: return styles.outline;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary': return styles.primaryText;
      case 'critical': return styles.criticalText;
      default: return styles.outlineText;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.base, getVariantStyle(), style]}
      activeOpacity={0.7}
      accessibilityRole="button"
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.text, getTextStyle()]}>{label}</Text>
    </TouchableOpacity>
  );
};

export const ActionChips: React.FC<{ actions: ActionChipProps[] }> = ({ actions }) => {
  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <ActionChip key={index} {...action} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  base: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 32,
  },
  primary: {
    backgroundColor: colors.primary[500],
  },
  secondary: {
    backgroundColor: '#F3F4F6',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  critical: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  primaryText: {
    color: '#fff',
  },
  outlineText: {
    color: '#374151',
  },
  criticalText: {
    color: '#DC2626',
  },
  iconContainer: {
    marginRight: 4,
  },
});

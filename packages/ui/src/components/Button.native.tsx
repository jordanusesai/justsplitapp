import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  View,
  TouchableOpacityProps 
} from 'react-native';
import { colors } from '@justsplitapp/tokens';

export interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  style,
  ...props
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondary;
      case 'outline':
        return styles.outline;
      default:
        return styles.primary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return styles.outlineText;
      default:
        return styles.primaryText;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return styles.sm;
      case 'lg':
        return styles.lg;
      default:
        return styles.md;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.base,
        getVariantStyle(),
        getSizeStyle(),
        (disabled || loading) && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: !!disabled }}
      {...props}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={variant === 'outline' ? colors.primary[500] : '#fff'} size="small" />
          <Text style={[getTextStyle(), styles.loadingText]}>Loading...</Text>
        </View>
      ) : (
        <Text style={getTextStyle()}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: 44,
  },
  primary: {
    backgroundColor: colors.primary[500],
  },
  secondary: {
    backgroundColor: colors.gray[500],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary[500],
  },
  primaryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  outlineText: {
    color: colors.primary[500],
    fontWeight: '600',
    fontSize: 16,
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 36,
  },
  md: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  lg: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    minHeight: 56,
  },
  disabled: {
    opacity: 0.5,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    marginLeft: 8,
  },
});

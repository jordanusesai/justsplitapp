import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export interface ListItemProps {
  title: string;
  subtitle?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?: () => void;
  style?: any;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leading,
  trailing,
  onClick,
  style,
}) => {
  const Container = onClick ? TouchableOpacity : View;

  return (
    <Container 
      onPress={onClick} 
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      {leading && <View style={styles.leading}>{leading}</View>}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {subtitle && <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>}
      </View>
      {trailing && <View style={styles.trailing}>{trailing}</View>}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    minHeight: 56, // 44pt+ target
  },
  leading: {
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  trailing: {
    marginLeft: 16,
  },
});

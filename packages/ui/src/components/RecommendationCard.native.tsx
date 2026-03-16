import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from './Card.native';
import { Button } from './Button.native';
import { colors } from '@justsplitapp/tokens';

export interface RecommendationCardProps {
  name: string;
  address: string;
  category: string;
  distance?: string | number;
  isMock?: boolean;
  onAttach?: () => void;
  style?: any;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  name,
  address,
  category,
  distance,
  isMock = false,
  onAttach,
  style,
}) => {
  return (
    <Card style={[styles.container, style]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          {isMock && (
            <View style={styles.mockBadge}>
              <Text style={styles.mockText}>MOCK DATA</Text>
            </View>
          )}
        </View>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.address} numberOfLines={2}>{address}</Text>
        {distance && (
          <Text style={styles.distance}>
            {typeof distance === 'number' 
              ? (distance < 1000 ? `${distance}m away` : `${(distance / 1000).toFixed(1)}km away`)
              : distance}
          </Text>
        )}
      </View>
      <View style={styles.footer}>
        <Button 
          variant="outline" 
          size="sm" 
          onPress={onAttach} 
          style={styles.button}
        >
          Attach to Expense
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  mockBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  mockText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary[500],
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  distance: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  footer: {
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  button: {
    minHeight: 36,
  },
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Linking } from 'react-native';
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
  const handleViewOnMap = () => {
    const encodedAddress = encodeURIComponent(address);
    const url = Platform.select({
      ios: `maps:0,0?q=${encodedAddress}`,
      android: `geo:0,0?q=${encodedAddress}`,
    });

    if (url) {
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          // Fallback to google maps in browser
          Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`);
        }
      });
    }
  };

  return (
    <Card style={[styles.container, style]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          {isMock && (
            <View style={styles.mockBadgeSmall}>
              <Text style={styles.mockTextSmall}>MOCK DATA</Text>
            </View>
          )}
        </View>
        <Text style={styles.category}>{category}</Text>
        <TouchableOpacity onPress={handleViewOnMap}>
          <Text style={styles.address} numberOfLines={2}>{address}</Text>
        </TouchableOpacity>
        {distance && (
          <Text style={styles.distance}>
            {typeof distance === 'number' 
              ? (distance < 1000 ? `${distance}m away` : `${(distance / 1000).toFixed(1)}km away`)
              : distance}
          </Text>
        )}
      </View>
      <View style={styles.footer}>
        <View style={styles.buttonRow}>
          <Button 
            variant="primary" 
            size="sm" 
            onPress={onAttach} 
            style={styles.flexButton}
          >
            Attach
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onPress={handleViewOnMap} 
            style={styles.flexButton}
          >
            Map
          </Button>
        </View>
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
  mockBadgeSmall: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  mockTextSmall: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#2563EB',
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
    textDecorationLine: 'underline',
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
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  flexButton: {
    flex: 1,
    minHeight: 36,
  },
  clearText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
  },
});

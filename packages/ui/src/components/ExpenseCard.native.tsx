import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from './Card.native';
import { Button } from './Button.native';
import { colors } from '@justsplitapp/tokens';

export interface ExpenseCardProps {
  title: string;
  amount: number;
  currency: string;
  date: string;
  participants: Array<{ name: string; avatar?: string }>;
  onApprove?: () => void;
  onAdjust?: () => void;
  onSettle?: () => void;
  onViewReceipt?: () => void;
  style?: any;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  title,
  amount,
  currency,
  date,
  participants,
  onApprove,
  onAdjust,
  onSettle,
  onViewReceipt,
  style,
}) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);

  return (
    <Card style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
        </View>
        <Text style={styles.amount}>{formattedAmount}</Text>
      </View>

      <View style={styles.participantsContainer}>
        {participants.map((participant, index) => (
          <View
            key={index}
            style={[
              styles.avatar,
              { marginLeft: index === 0 ? 0 : -10 }
            ]}
          >
            {participant.avatar ? (
              <Image source={{ uri: participant.avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{participant.name.charAt(0).toUpperCase()}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      <View style={styles.actionsGrid}>
        {onApprove && (
          <Button variant="primary" size="sm" onPress={onApprove} style={styles.actionButton}>
            Approve
          </Button>
        )}
        {onAdjust && (
          <Button variant="outline" size="sm" onPress={onAdjust} style={styles.actionButton}>
            Adjust
          </Button>
        )}
        {onSettle && (
          <Button variant="secondary" size="sm" onPress={onSettle} style={styles.actionButton}>
            Settle
          </Button>
        )}
        {onViewReceipt && (
          <Button variant="outline" size="sm" onPress={onViewReceipt} style={styles.actionButton}>
            View Receipt
          </Button>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary[500],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary[500],
  },
  participantsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
  },
});

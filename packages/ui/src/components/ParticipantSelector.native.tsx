import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Image 
} from 'react-native';
import { colors } from '@justsplitapp/tokens';

export interface Participant {
  id: string;
  name: string;
  avatar?: string;
  selected?: boolean;
}

export interface ParticipantSelectorProps {
  participants: Participant[];
  onSelectionChange: (selectedIds: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: any;
}

export const ParticipantSelector: React.FC<ParticipantSelectorProps> = ({
  participants,
  onSelectionChange,
  placeholder = 'Search participants...',
  disabled = false,
  style,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredParticipants = participants.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleParticipant = (id: string) => {
    const newSelected = selectedIds.includes(id)
      ? selectedIds.filter(selectedId => selectedId !== id)
      : [...selectedIds, id];
    
    setSelectedIds(newSelected);
    onSelectionChange(newSelected);
  };

  const renderParticipant = ({ item }: { item: Participant }) => {
    const isSelected = selectedIds.includes(item.id);

    return (
      <TouchableOpacity
        style={[
          styles.participantItem,
          isSelected && styles.participantItemSelected,
          disabled && styles.disabled,
        ]}
        onPress={() => !disabled && toggleParticipant(item.id)}
        disabled={disabled}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isSelected, disabled }}
      >
        <View style={styles.avatarContainer}>
          {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
            </View>
          )}
        </View>
        <Text style={styles.participantName}>{item.name}</Text>
        <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
          {isSelected && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          editable={!disabled}
          accessibilityLabel="Search participants"
        />
      </View>

      <FlatList
        data={filteredParticipants}
        renderItem={renderParticipant}
        keyExtractor={(item) => item.id}
        style={styles.list}
        scrollEnabled={false} // Assuming it's inside a ScrollView
        ListEmptyComponent={
          <Text style={styles.emptyText}>No participants found</Text>
        }
      />

      {selectedIds.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {selectedIds.length} selected
          </Text>
          <TouchableOpacity 
            onPress={() => {
              setSelectedIds([]);
              onSelectionChange([]);
            }}
            disabled={disabled}
          >
            <Text style={styles.clearButton}>Clear all</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    minHeight: 44, // 44pt target
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    height: '100%',
  },
  list: {
    width: '100%',
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 8,
    minHeight: 56, // 44pt+ target
  },
  participantItemSelected: {
    borderColor: colors.primary[500],
    backgroundColor: '#EFF6FF',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B5563',
  },
  participantName: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  clearButton: {
    fontSize: 14,
    color: colors.primary[500],
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
});

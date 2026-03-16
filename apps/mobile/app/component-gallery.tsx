import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Button, 
  Card, 
  AmountInput, 
  ParticipantSelector, 
  ExpenseCard, 
  RecommendationCard, 
  SplitSelector,
  ListItem,
  Skeleton,
  EmptyState,
  Toast,
  Modal,
  FAB
} from '@justsplitapp/ui';
import { Ionicons } from '@expo/vector-icons';

export default function ComponentGalleryScreen() {
  const { t } = useTranslation();
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(42.50);

  const mockParticipants = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen options={{ title: 'Component Gallery' }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Section title="Buttons">
          <View style={styles.row}>
            <Button variant="primary" size="sm">Primary SM</Button>
            <Button variant="secondary" size="sm">Secondary SM</Button>
          </View>
          <Button variant="primary" style={styles.marginV}>Primary Medium</Button>
          <Button variant="outline" style={styles.marginV}>Outline Medium</Button>
          <Button variant="primary" size="lg" loading style={styles.marginV}>Loading Large</Button>
        </Section>

        <Section title="Inputs">
          <Text style={styles.label}>Amount Input</Text>
          <AmountInput value={amount} onChange={setAmount} />
        </Section>

        <Section title="Cards">
          <Card>
            <Text>This is a standard card component with default elevation.</Text>
          </Card>
        </Section>

        <Section title="Expense Card">
          <ExpenseCard
            title="Dinner Split"
            amount={85.00}
            currency="USD"
            date={new Date().toISOString()}
            participants={[{ name: 'Me' }, { name: 'John' }, { name: 'Jane' }]}
            onApprove={() => alert('Approved')}
            onViewReceipt={() => alert('Viewing Receipt')}
          />
        </Section>

        <Section title="Recommendation Card">
          <RecommendationCard
            name="Coffee Shop"
            address="123 Main St"
            category="Cafe"
            distance="200m"
            isMock
            onAttach={() => alert('Attached')}
          />
        </Section>

        <Section title="Selectors">
          <Text style={styles.label}>Participant Selector</Text>
          <ParticipantSelector 
            participants={mockParticipants} 
            onSelectionChange={(ids) => console.log(ids)} 
          />
          
          <Text style={[styles.label, { marginTop: 20 }]}>Split Selector</Text>
          <SplitSelector
            totalAmount={100}
            participants={mockParticipants}
            onChange={(splits) => console.log(splits)}
          />
        </Section>

        <Section title="List Items">
          <ListItem 
            title="Menu Item" 
            subtitle="Description goes here" 
            leading={<Ionicons name="settings-outline" size={24} color="#4B5563" />}
            trailing={<Ionicons name="chevron-forward" size={20} color="#D1D5DB" />}
            onClick={() => {}}
          />
        </Section>

        <Section title="Skeletons & Feedback">
          <View style={styles.row}>
            <Skeleton variant="circular" width={40} height={40} />
            <View style={{ flex: 1, gap: 8 }}>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </View>
          </View>
          
          <Button 
            variant="outline" 
            style={styles.marginV} 
            onPress={() => setShowToast(true)}
          >
            Show Toast
          </Button>
          
          <Button 
            variant="outline" 
            onPress={() => setShowModal(true)}
          >
            Show Modal
          </Button>
        </Section>

        <Section title="Empty State">
          <EmptyState
            title="No Data"
            description="You don't have any items yet."
            icon={<Ionicons name="folder-open-outline" size={48} color="#D1D5DB" />}
          />
        </Section>

        <View style={{ height: 100 }} />
      </ScrollView>

      {showToast && (
        <Toast 
          message="This is a success message!" 
          type="success" 
          onClose={() => setShowToast(false)} 
        />
      )}

      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title="Component Gallery Modal"
      >
        <Text style={{ marginBottom: 20 }}>
          This is a reusable modal component that supports custom content and scrollable bodies.
        </Text>
        <Button onPress={() => setShowModal(false)}>Close Modal</Button>
      </Modal>

      <FAB 
        icon={<Ionicons name="rocket" size={24} color="#fff" />} 
        label="Action" 
        onPress={() => alert('FAB Pressed')} 
      />
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  marginV: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  }
});

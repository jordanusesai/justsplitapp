import { Split, User } from '@justsplitapp/types'

export const mockUser: User = {
  id: 'user-1',
  email: 'test@example.com',
  name: 'Test User',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const mockSplit: Split = {
  id: 'split-1',
  title: 'Dinner at Restaurant',
  description: 'Split the bill for dinner',
  amount: 120.50,
  currency: 'USD',
  participants: [
    {
      userId: 'user-1',
      name: 'John Doe',
      amount: 40.17,
      paid: false,
    },
    {
      userId: 'user-2',
      name: 'Jane Smith',
      amount: 40.17,
      paid: true,
      settledAt: new Date(),
    },
    {
      userId: 'user-3',
      name: 'Bob Johnson',
      amount: 40.16,
      paid: false,
    },
  ],
  createdBy: 'user-1',
  status: 'active',
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const createMockSplit = (overrides: Partial<Split> = {}): Split => ({
  ...mockSplit,
  ...overrides,
})

export const createMockUser = (overrides: Partial<User> = {}): User => ({
  ...mockUser,
  ...overrides,
})

export const mockApiResponse = <T>(data: T) => ({
  success: true,
  data,
  message: 'Success',
})

export const mockErrorResponse = (message: string) => ({
  success: false,
  error: message,
})

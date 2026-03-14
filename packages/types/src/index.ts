export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Split {
  id: string
  title: string
  description?: string
  amount: number
  currency: string
  participants: Participant[]
  createdBy: string
  status: 'active' | 'settled'
  createdAt: Date
  updatedAt: Date
}

export interface Participant {
  userId: string
  name: string
  amount: number
  paid: boolean
  settledAt?: Date
}

export interface CreateSplitDto {
  title: string
  description?: string
  amount: number
  currency: string
  participants: Omit<Participant, 'paid' | 'settledAt'>[]
}

export interface UpdateSplitDto {
  title?: string
  description?: string
  amount?: number
  currency?: string
  participants?: Participant[]
}

export interface FeatureFlags {
  recommendations: boolean
  ocr: boolean
  chat: boolean
  mockMode: boolean
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

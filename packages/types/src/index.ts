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
  exchangeRate?: number
  exchangeRateProvider?: string
  exchangeRateTimestamp?: number
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
}

export interface OCRResult {
  merchant: string;
  date?: string;
  total: number;
  items: OCRItem[];
  tax?: number;
  confidence: number;
  isMock?: boolean;
}

export interface OCRItem {
  description: string;
  amount: number;
  quantity?: number;
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

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginDto {
  email: string;
}

export interface VerifyTokenDto {
  token: string;
}

export interface Place {
  fsq_id: string;
  name: string;
  location: {
    address?: string;
    cross_street?: string;
    formatted_address?: string;
    locality?: string;
    region?: string;
  };
  categories: Array<{ name: string }>;
  distance?: number;
  isMock?: boolean;
}

export * from './chat'

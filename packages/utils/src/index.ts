import { Split, Participant } from '@justsplitapp/types'

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function calculateSplitAmounts(total: number, participants: string[]): Participant[] {
  const amountPerPerson = total / participants.length
  
  return participants.map((userId, index) => ({
    userId,
    name: `Participant ${index + 1}`,
    amount: amountPerPerson,
    paid: false,
  }))
}

export function validateSplit(split: Partial<Split>): string[] {
  const errors: string[] = []
  
  if (!split.title || split.title.trim().length === 0) {
    errors.push('Title is required')
  }
  
  if (!split.amount || split.amount <= 0) {
    errors.push('Amount must be greater than 0')
  }
  
  if (!split.participants || split.participants.length === 0) {
    errors.push('At least one participant is required')
  }
  
  return errors
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + '...'
}

/**
 * Observability & Analytics
 */

export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp: number
}

export const trackEvent = (name: string, properties?: Record<string, any>) => {
  const event: AnalyticsEvent = {
    name,
    properties,
    timestamp: Date.now(),
  }
  
  // In a real app, send to Segment, Mixpanel, etc.
  console.log(`[Analytics] ${name}`, properties)
  
  return event
}

export const reportError = (error: Error, context?: Record<string, any>) => {
  // In a real app, send to Sentry, Bugsnag, etc.
  console.error(`[Error Reporting]`, {
    message: error.message,
    stack: error.stack,
    ...context,
  })
}

export const logger = {
  info: (message: string, context?: any) => console.log(`[INFO] ${message}`, context || ''),
  warn: (message: string, context?: any) => console.warn(`[WARN] ${message}`, context || ''),
  error: (message: string, context?: any) => console.error(`[ERROR] ${message}`, context || ''),
}

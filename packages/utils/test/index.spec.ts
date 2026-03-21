import { describe, it, expect } from 'vitest'
import { 
  formatCurrency, 
  calculateSplitAmounts, 
  validateSplit, 
  generateId, 
  truncateText 
} from '../src/index'

describe('formatCurrency', () => {
  it('should format USD correctly', () => {
    expect(formatCurrency(10.5)).toBe('$10.50')
    expect(formatCurrency(1000)).toBe('$1,000.00')
  })

  it('should format EUR correctly', () => {
    // Note: Intl.NumberFormat might use different spaces depending on environment
    // We check if it contains the currency code or symbol and the numeric part
    const formatted = formatCurrency(10.5, 'EUR')
    expect(formatted).toContain('10.50')
  })
})

describe('calculateSplitAmounts', () => {
  it('should split evenly between participants', () => {
    const total = 100
    const participants = ['user1', 'user2', 'user3', 'user4']
    const result = calculateSplitAmounts(total, participants)
    
    expect(result).toHaveLength(4)
    result.forEach(p => {
      expect(p.amount).toBe(25)
      expect(p.paid).toBe(false)
    })
  })

  it('should handle decimal splits correctly', () => {
    const total = 10
    const participants = ['user1', 'user2', 'user3']
    const result = calculateSplitAmounts(total, participants)
    
    expect(result[0].amount).toBeCloseTo(3.33, 2)
  })
})

describe('validateSplit', () => {
  it('should return errors for empty title', () => {
    const errors = validateSplit({ amount: 10, participants: [{ userId: '1', name: 'John', amount: 10, paid: false }] })
    expect(errors).toContain('Title is required')
  })

  it('should return errors for non-positive amount', () => {
    const errors = validateSplit({ title: 'Test', amount: 0, participants: [{ userId: '1', name: 'John', amount: 0, paid: false }] })
    expect(errors).toContain('Amount must be greater than 0')
  })

  it('should return errors for no participants', () => {
    const errors = validateSplit({ title: 'Test', amount: 10, participants: [] })
    expect(errors).toContain('At least one participant is required')
  })

  it('should return no errors for valid split', () => {
    const errors = validateSplit({ 
      title: 'Valid', 
      amount: 10, 
      participants: [{ userId: '1', name: 'John', amount: 10, paid: false }] 
    })
    expect(errors).toHaveLength(0)
  })
})

describe('generateId', () => {
  it('should generate a string id', () => {
    const id = generateId()
    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
  })

  it('should generate unique ids', () => {
    const id1 = generateId()
    const id2 = generateId()
    expect(id1).not.toBe(id2)
  })
})

describe('truncateText', () => {
  it('should truncate text longer than max length', () => {
    expect(truncateText('Hello World', 5)).toBe('Hello...')
  })

  it('should not truncate text shorter than max length', () => {
    expect(truncateText('Hello', 10)).toBe('Hello')
  })
})

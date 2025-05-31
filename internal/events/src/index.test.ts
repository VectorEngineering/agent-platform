import { describe, expect, test } from 'vitest'
import { event, Event } from './index'

describe('Event Schema Validation', () => {
    describe('verifications.usage.record', () => {
        test('validates correct verification usage record', () => {
            const validEvent = {
                type: 'verifications.usage.record',
                timestamp: '2024-03-20T12:00:00Z',
                data: {
                    eventId: 'evt_123',
                    interval: {
                        start: 1710936000,
                        end: 1710939600
                    },
                    keySpaceId: 'ks_123',
                    records: [
                        {
                            ownerId: 'usr_123',
                            verifications: 5
                        }
                    ]
                }
            }

            const result = event.safeParse(validEvent)
            expect(result.success).toBe(true)
        })

        test('fails with invalid timestamp', () => {
            const invalidEvent = {
                type: 'verifications.usage.record',
                timestamp: 'invalid-date',
                data: {
                    eventId: 'evt_123',
                    interval: {
                        start: 1710936000,
                        end: 1710939600
                    },
                    keySpaceId: 'ks_123',
                    records: []
                }
            }

            const result = event.safeParse(invalidEvent)
            expect(result.success).toBe(false)
        })
    })

    describe('transaction.created', () => {
        test('validates correct transaction created event', () => {
            const validEvent = {
                type: 'transaction.created',
                timestamp: '2024-03-20T12:00:00Z',
                data: {
                    transactionId: 'tx_123',
                    amount: 1000,
                    currency: 'USD',
                    sourceAccountId: 'acc_123',
                    destinationAccountId: 'acc_456',
                    status: 'pending',
                    metadata: {
                        description: 'Payment for services'
                    }
                }
            }

            const result = event.safeParse(validEvent)
            expect(result.success).toBe(true)
        })

        test('validates transaction without optional metadata', () => {
            const validEvent = {
                type: 'transaction.created',
                timestamp: '2024-03-20T12:00:00Z',
                data: {
                    transactionId: 'tx_123',
                    amount: 1000,
                    currency: 'USD',
                    sourceAccountId: 'acc_123',
                    destinationAccountId: 'acc_456',
                    status: 'pending'
                }
            }

            const result = event.safeParse(validEvent)
            expect(result.success).toBe(true)
        })

        test('fails with invalid status', () => {
            const invalidEvent = {
                type: 'transaction.created',
                timestamp: '2024-03-20T12:00:00Z',
                data: {
                    transactionId: 'tx_123',
                    amount: 1000,
                    currency: 'USD',
                    sourceAccountId: 'acc_123',
                    destinationAccountId: 'acc_456',
                    status: 'invalid_status'
                }
            }

            const result = event.safeParse(invalidEvent)
            expect(result.success).toBe(false)
        })
    })

    describe('account.created', () => {
        test('validates correct account created event', () => {
            const validEvent = {
                type: 'account.created',
                timestamp: '2024-03-20T12:00:00Z',
                data: {
                    accountId: 'acc_123',
                    accountType: 'individual',
                    ownerId: 'usr_123',
                    currency: 'EUR',
                    status: 'active'
                }
            }

            const result = event.safeParse(validEvent)
            expect(result.success).toBe(true)
        })

        test('fails with invalid account type', () => {
            const invalidEvent = {
                type: 'account.created',
                timestamp: '2024-03-20T12:00:00Z',
                data: {
                    accountId: 'acc_123',
                    accountType: 'invalid_type',
                    ownerId: 'usr_123',
                    currency: 'EUR',
                    status: 'active'
                }
            }

            const result = event.safeParse(invalidEvent)
            expect(result.success).toBe(false)
        })
    })

    describe('kyc.verification.started', () => {
        test('validates correct KYC verification started event', () => {
            const validEvent = {
                type: 'kyc.verification.started',
                timestamp: '2024-03-20T12:00:00Z',
                data: {
                    verificationId: 'ver_123',
                    accountId: 'acc_123',
                    documentType: 'passport',
                    requiredDocuments: ['passport_scan', 'selfie']
                }
            }

            const result = event.safeParse(validEvent)
            expect(result.success).toBe(true)
        })
    })

    describe('balance.updated', () => {
        test('validates correct balance updated event', () => {
            const validEvent = {
                type: 'balance.updated',
                timestamp: '2024-03-20T12:00:00Z',
                data: {
                    accountId: 'acc_123',
                    previousBalance: 1000,
                    newBalance: 1500,
                    currency: 'USD',
                    reason: 'deposit',
                    transactionId: 'tx_123'
                }
            }

            const result = event.safeParse(validEvent)
            expect(result.success).toBe(true)
        })

        test('validates balance update without optional transactionId', () => {
            const validEvent = {
                type: 'balance.updated',
                timestamp: '2024-03-20T12:00:00Z',
                data: {
                    accountId: 'acc_123',
                    previousBalance: 1000,
                    newBalance: 500,
                    currency: 'USD',
                    reason: 'withdrawal'
                }
            }

            const result = event.safeParse(validEvent)
            expect(result.success).toBe(true)
        })

        test('fails with invalid reason', () => {
            const invalidEvent = {
                type: 'balance.updated',
                timestamp: '2024-03-20T12:00:00Z',
                data: {
                    accountId: 'acc_123',
                    previousBalance: 1000,
                    newBalance: 1500,
                    currency: 'USD',
                    reason: 'invalid_reason'
                }
            }

            const result = event.safeParse(invalidEvent)
            expect(result.success).toBe(false)
        })
    })

    describe('Type checking', () => {
        test('event type is correctly inferred', () => {
            const validEvent: Event = {
                type: 'transaction.created',
                timestamp: '2024-03-20T12:00:00Z',
                data: {
                    transactionId: 'tx_123',
                    amount: 1000,
                    currency: 'USD',
                    sourceAccountId: 'acc_123',
                    destinationAccountId: 'acc_456',
                    status: 'pending'
                }
            }

            // This is a type-level test - if it compiles, it passes
            expect(true).toBe(true)
        })
    })
})

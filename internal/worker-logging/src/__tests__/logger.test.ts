import { Logger, Fields } from '../interface'

// Mock implementation of Logger for testing
class TestLogger implements Logger {
    public logs: Array<{ level: string; message: string; fields?: Fields }> = []

    debug(message: string, fields?: Fields): void {
        this.logs.push({ level: 'debug', message, fields })
    }

    info(message: string, fields?: Fields): void {
        this.logs.push({ level: 'info', message, fields })
    }

    warn(message: string, fields?: Fields): void {
        this.logs.push({ level: 'warn', message, fields })
    }

    error(message: string, fields?: Fields): void {
        this.logs.push({ level: 'error', message, fields })
    }
}

describe('Logger Interface', () => {
    let logger: TestLogger

    beforeEach(() => {
        logger = new TestLogger()
    })

    it('should log debug messages with fields', () => {
        const fields = { userId: '123', requestId: 'abc' }
        logger.debug('Debug message', fields)

        expect(logger.logs).toHaveLength(1)
        expect(logger.logs[0]).toEqual({
            level: 'debug',
            message: 'Debug message',
            fields
        })
    })

    it('should log info messages without fields', () => {
        logger.info('Info message')

        expect(logger.logs).toHaveLength(1)
        expect(logger.logs[0]).toEqual({
            level: 'info',
            message: 'Info message'
        })
    })

    it('should log warn messages with complex fields', () => {
        const fields = {
            currentRate: 95,
            threshold: 100,
            metadata: { region: 'us-east', instance: 'worker-1' }
        }
        logger.warn('Warning message', fields)

        expect(logger.logs).toHaveLength(1)
        expect(logger.logs[0]).toEqual({
            level: 'warn',
            message: 'Warning message',
            fields
        })
    })

    it('should log error messages with error objects', () => {
        const error = new Error('Test error')
        const fields = { error, code: 'ERR_001' }
        logger.error('Error message', fields)

        expect(logger.logs).toHaveLength(1)
        expect(logger.logs[0]).toEqual({
            level: 'error',
            message: 'Error message',
            fields
        })
    })

    it('should handle undefined fields', () => {
        logger.debug('Debug message')
        logger.info('Info message')
        logger.warn('Warning message')
        logger.error('Error message')

        expect(logger.logs).toHaveLength(4)
        logger.logs.forEach((log) => {
            expect(log).toHaveProperty('message')
            expect(log.fields).toBeUndefined()
        })
    })

    it('should handle empty string messages', () => {
        logger.info('')
        expect(logger.logs).toHaveLength(1)
        expect(logger.logs[0].message).toBe('')
    })

    it('should preserve field types correctly', () => {
        const fields = {
            number: 42,
            boolean: true,
            string: 'test',
            date: new Date('2024-01-01'),
            nullValue: null,
            undefinedValue: undefined,
            array: [1, 2, 3]
        }

        logger.debug('Type test', fields)

        expect(logger.logs[0].fields).toEqual(fields)
    })

    it('should handle multiple logs in sequence', () => {
        const sequence = [
            { level: 'debug', message: 'Debug 1' },
            { level: 'info', message: 'Info 1' },
            { level: 'debug', message: 'Debug 2' },
            { level: 'warn', message: 'Warn 1' }
        ]

        sequence.forEach(({ level, message }) => {
            logger[level as keyof Logger](message)
        })

        expect(logger.logs).toHaveLength(4)
        sequence.forEach((expected, index) => {
            expect(logger.logs[index]).toMatchObject(expected)
        })
    })

    it('should handle circular references in fields', () => {
        const circular: any = { name: 'test' }
        circular.self = circular

        logger.info('Circular reference test', { circular })

        expect(logger.logs).toHaveLength(1)
        expect(logger.logs[0].level).toBe('info')
    })

    it('should handle very large field objects', () => {
        const largeObject: Record<string, number> = {}
        for (let i = 0; i < 1000; i++) {
            largeObject[`key${i}`] = i
        }

        logger.debug('Large object test', largeObject)

        expect(logger.logs).toHaveLength(1)
        expect(Object.keys(logger.logs[0].fields!)).toHaveLength(1000)
    })

    it('should maintain log order', () => {
        const messages = ['First', 'Second', 'Third', 'Fourth']
        messages.forEach((msg) => logger.info(msg))

        expect(logger.logs).toHaveLength(4)
        messages.forEach((msg, index) => {
            expect(logger.logs[index].message).toBe(msg)
        })
    })

    it('should handle special characters in messages', () => {
        const specialChars = 'Special chars: 🚀 →☺★∴ ∵≠≈ 漢字'
        logger.info(specialChars)

        expect(logger.logs[0].message).toBe(specialChars)
    })

    it('should handle fields with Buffer data', () => {
        const fields = {
            binary: Buffer.from('Hello, World!'),
            text: 'normal text'
        }

        logger.debug('Buffer test', fields)

        expect(logger.logs[0].fields).toEqual(fields)
    })

    it('should handle multiple field updates', () => {
        const message = 'Multiple updates'
        const initialFields = { count: 1 }
        const updatedFields = { count: 2 }

        logger.info(message, initialFields)
        logger.info(message, updatedFields)

        expect(logger.logs).toHaveLength(2)
        expect(logger.logs[0].fields).toEqual(initialFields)
        expect(logger.logs[1].fields).toEqual(updatedFields)
    })

    it('should handle nested error objects in fields', () => {
        const nestedError = new Error('Nested error')
        const topError = new Error('Top error')
        const fields = {
            topLevel: topError,
            nested: {
                error: nestedError,
                additional: 'info'
            }
        }

        logger.error('Complex error structure', fields)

        expect(logger.logs).toHaveLength(1)
        expect(logger.logs[0].fields).toEqual(fields)
        expect((logger.logs[0].fields as any).nested.error).toBe(nestedError)
        expect((logger.logs[0].fields as any).topLevel).toBe(topError)
    })
})

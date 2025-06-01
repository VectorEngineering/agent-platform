var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b
                    }) ||
                function (d, b) {
                    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
                }
            return extendStatics(d, b)
        }
        return function (d, b) {
            if (typeof b !== 'function' && b !== null)
                throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null')
            extendStatics(d, b)
            function __() {
                this.constructor = d
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
        }
    })()
var __read =
    (this && this.__read) ||
    function (o, n) {
        var m = typeof Symbol === 'function' && o[Symbol.iterator]
        if (!m) return o
        var i = m.call(o),
            r,
            ar = [],
            e
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value)
        } catch (error) {
            e = { error: error }
        } finally {
            try {
                if (r && !r.done && (m = i['return'])) m.call(i)
            } finally {
                if (e) throw e.error
            }
        }
        return ar
    }
var __spreadArray =
    (this && this.__spreadArray) ||
    function (to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar) ar = Array.prototype.slice.call(from, 0, i)
                    ar[i] = from[i]
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from))
    }
import { BaseError } from '../errors/base'
// Test implementation of BaseError for testing
var TestError = /** @class */ (function (_super) {
    __extends(TestError, _super)
    function TestError() {
        var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this
        _this.retry = false
        _this.name = 'TestError'
        return _this
    }
    return TestError
})(BaseError)
describe('BaseError', function () {
    describe('constructor', function () {
        it('should create error with basic message', function () {
            var error = new TestError({ message: 'test error' })
            expect(error.message).toBe('test error')
            expect(error.name).toBe('TestError')
            expect(error.retry).toBe(false)
            expect(error.context).toBeUndefined()
            expect(error.cause).toBeUndefined()
        })
        it('should create error with context', function () {
            var context = { testId: 'test-123' }
            var error = new TestError({ message: 'test error', context: context })
            expect(error.context).toEqual(context)
        })
        it('should create error with cause', function () {
            var cause = new TestError({ message: 'cause error' })
            var error = new TestError({ message: 'test error', cause: cause })
            expect(error.cause).toBe(cause)
        })
        it('should handle empty context object', function () {
            var error = new TestError({
                message: 'test error',
                context: {}
            })
            expect(error.context).toEqual({})
            expect(error.toString()).toBe('TestError: test error - {} - caused by undefined')
        })
        it('should handle deeply nested cause chain', function () {
            var _a, _b, _c
            var cause3 = new TestError({ message: 'root cause' })
            var cause2 = new TestError({ message: 'intermediate cause', cause: cause3 })
            var cause1 = new TestError({ message: 'direct cause', cause: cause2 })
            var error = new TestError({ message: 'main error', cause: cause1 })
            expect(error.cause).toBe(cause1)
            expect((_a = error.cause) === null || _a === void 0 ? void 0 : _a.cause).toBe(cause2)
            expect(
                (_c = (_b = error.cause) === null || _b === void 0 ? void 0 : _b.cause) === null || _c === void 0 ? void 0 : _c.cause
            ).toBe(cause3)
        })
        it('should handle both context and cause', function () {
            var _a
            var cause = new TestError({
                message: 'cause error',
                context: { testId: 'cause-123' }
            })
            var error = new TestError({
                message: 'test error',
                context: { testId: 'test-123' },
                cause: cause
            })
            expect(error.context).toEqual({ testId: 'test-123' })
            expect(error.cause).toBe(cause)
            expect((_a = error.cause) === null || _a === void 0 ? void 0 : _a.context).toEqual({ testId: 'cause-123' })
        })
    })
    describe('toString', function () {
        it('should format error without context or cause', function () {
            var error = new TestError({ message: 'test error' })
            expect(error.toString()).toBe('TestError: test error - undefined - caused by undefined')
        })
        it('should format error with context', function () {
            var error = new TestError({
                message: 'test error',
                context: { testId: 'test-123' }
            })
            expect(error.toString()).toBe('TestError: test error - {"testId":"test-123"} - caused by undefined')
        })
        it('should format error with cause', function () {
            var cause = new TestError({ message: 'cause error' })
            var error = new TestError({ message: 'test error', cause: cause })
            expect(error.toString()).toBe(
                'TestError: test error - undefined - caused by TestError: cause error - undefined - caused by undefined'
            )
        })
        it('should handle deeply nested cause chain in toString', function () {
            var cause2 = new TestError({
                message: 'root cause',
                context: { testId: 'root' }
            })
            var cause1 = new TestError({
                message: 'intermediate',
                context: { testId: 'mid' },
                cause: cause2
            })
            var error = new TestError({
                message: 'main error',
                context: { testId: 'main' },
                cause: cause1
            })
            expect(error.toString()).toBe(
                'TestError: main error - {"testId":"main"} - caused by ' +
                    'TestError: intermediate - {"testId":"mid"} - caused by ' +
                    'TestError: root cause - {"testId":"root"} - caused by undefined'
            )
        })
        it('should handle special characters in message', function () {
            var error = new TestError({
                message: 'test\nerror\twith "special" \'chars\''
            })
            expect(error.toString()).toBe('TestError: test\nerror\twith "special" \'chars\' - undefined - caused by undefined')
        })
        it('should handle special characters in context', function () {
            var error = new TestError({
                message: 'test error',
                context: { testId: 'test\nwith\t"quotes"' }
            })
            expect(error.toString()).toBe('TestError: test error - {"testId":"test\\nwith\\t\\"quotes\\""} - caused by undefined')
        })
    })
    describe('inheritance', function () {
        // Create a new base class for testing inheritance
        var ExtendableError = /** @class */ (function (_super) {
            __extends(ExtendableError, _super)
            function ExtendableError() {
                var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this
                _this.retry = false
                _this.name = 'ExtendableError'
                return _this
            }
            return ExtendableError
        })(BaseError)
        var ChildError = /** @class */ (function (_super) {
            __extends(ChildError, _super)
            function ChildError() {
                var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this
                _this.name = 'ChildError'
                _this.retry = true
                return _this
            }
            return ChildError
        })(ExtendableError)
        it('should properly inherit from parent error', function () {
            var error = new ChildError({ message: 'child error' })
            expect(error).toBeInstanceOf(ExtendableError)
            expect(error).toBeInstanceOf(BaseError)
            expect(error).toBeInstanceOf(Error)
        })
        it('should allow overriding properties', function () {
            var error = new ChildError({ message: 'child error' })
            expect(error.name).toBe('ChildError')
            expect(error.retry).toBe(true)
        })
        it('should maintain toString functionality', function () {
            var error = new ChildError({
                message: 'child error',
                context: { testId: 'child-123' }
            })
            expect(error.toString()).toBe('ChildError: child error - {"testId":"child-123"} - caused by undefined')
        })
    })
    describe('error properties', function () {
        it('should preserve stack trace', function () {
            var error = new TestError({ message: 'test error' })
            expect(error.stack).toBeDefined()
            expect(error.stack).toContain('test error')
            expect(error.stack).toContain('base.test.ts')
        })
        it('should be catchable as standard error', function () {
            try {
                throw new TestError({ message: 'test error' })
            } catch (e) {
                expect(e).toBeInstanceOf(Error)
                expect(e).toBeInstanceOf(BaseError)
                expect(e).toBeInstanceOf(TestError)
            }
        })
    })
})

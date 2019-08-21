const utils = require('../lib/utils')
const switchHandlers = require('../lib/helpers/switch-handlers')

/* eslint-env jest */

describe('switchHandlers', () => {
  test('connection timeout', () => { // --connect-timeout
    const timeOut = utils.randomInt(1000, 60000)
    expect(switchHandlers.connectTimeout(['dummy', 'value'])({})).toEqual({})
    expect(switchHandlers.connectTimeout(['dummy', null])({ a: 1 })).toEqual({ a: 1 })
    expect(switchHandlers.connectTimeout(['--connect-timeout', timeOut])({})).toHaveProperty('timeout', timeOut)
    expect(switchHandlers.connectTimeout(['--connect-timeout', timeOut.toString()])({})).toHaveProperty('timeout', timeOut)
  })
  test('data', () => { // -d | --data
    expect(switchHandlers.data(['dummy', 'a=b'])({})).toEqual({})
    expect(switchHandlers.data(['dummy', null])({ a: 1 })).toEqual({ a: 1 })
    expect(switchHandlers.data(['-d', 'a= b'])({})).toEqual({ data: { a: 'b' } })
    // expect(() => switchHandlers.data(['-d', 'a=c'])({ data: { a: 'b' } })).toThrow()
  })
  test('header', () => { // -H | --header
    expect(switchHandlers.header(['dummy', 'value'])({})).toEqual({})
    expect(switchHandlers.header(['dummy', null])({ a: 1 })).toEqual({ a: 1 })
    expect(switchHandlers.header(['-H', 'a: b'])({})).toEqual({ headers: { a: 'b' } })
    // expect(() => switchHandlers.header(['-H', 'a: c'])({ headers: { a: 'b' } })).toThrow()
  })
  test('maxRedirs', () => { // --max-redirs
    expect(switchHandlers.maxRedirs(['dummy', 'value'])({})).toEqual({})
    expect(switchHandlers.maxRedirs(['dummy', null])({ a: 1 })).toEqual({ a: 1 })
    const count = utils.randomInt(5, 50)
    const config1 = switchHandlers.maxRedirs(['--max-redirs', count.toString()])({ a: 1 })
    expect(config1).toHaveProperty('maxRedirects', count)
  })
  test('request', () => { // --request
    expect(switchHandlers.request(['dummy', 'value'])({})).toEqual({})
    expect(switchHandlers.request(['-x', 'value'])({ a: 1 })).toEqual({ a: 1 })
    expect(switchHandlers.request(['--request', 'post'])({})).toEqual({ method: 'post' })
    expect(switchHandlers.request(['-X', 'post'])({ method: 'get' })).toEqual({ method: 'get' })
    expect(() => switchHandlers.request(['-X', 'dummy'])({})).toThrow()
  })
  test('url', () => { // --url
    expect(switchHandlers.url(['dummy', 'value'])({})).toEqual({})
    expect(switchHandlers.url(['dummy', null])({ a: 1 })).toEqual({ a: 1 })
    expect(() => switchHandlers.url(['--url', 'not-a-url'])({})).toThrow()
    expect(switchHandlers.url(['--url', 'http://example.com'])({})).toHaveProperty('baseURL', 'http://example.com')
    expect(switchHandlers.url(['--url', 'http://dummy.com'])({ baseURL: 'http://example.com' })).toHaveProperty('baseURL', 'http://example.com')
  })
  test('userAgent', () => { // -A | --user-agent
    expect(switchHandlers.userAgent(['dummy', 'value'])({})).toEqual({})
    expect(switchHandlers.userAgent(['dummy', null])({ a: 1 })).toEqual({ a: 1 })
    const userAgent = utils.randomString()
    const config1 = switchHandlers.userAgent(['-A', userAgent])({ dummy: 'test' })
    expect(config1.headers).toHaveProperty('user-agent', userAgent)
  })
})

const helpers = require('../lib/helpers')

/* eslint-env jest */

describe('helpers', () => {
  test('curlParse', () => {
    const args1 = ['-H', 'h1: v1', '-f', 'http://example.com', '-i']
    const parsed1 = helpers.curlParse(args1, {})
    expect(parsed1.url).toBe('http://example.com')
    expect(parsed1.flags.length).toBe(2)
    expect(parsed1.flags[0]).toBe('-f')
    expect(parsed1.switches.length).toBe(1)
    expect(parsed1.switches[0][1]).toBe('h1: v1')
    expect(() => helpers.curlParse(['-i', 'invalid-Url'], {})).toThrow()
    expect(() => helpers.curlParse(['-d', undefined], {})).toThrow()
    // expect(helpers.curlParse(['-f', 'http://example.com'], {}).url).toBe('http://example.com')
    expect(() => helpers.curlParse(['http://example.com', 'invalid-Url'], {})).toThrow()
  })
  test('processFlags', () => {
    expect(helpers.processFlags(['dummy1', '--dummy2'])({})).toEqual({})
    expect(helpers.processFlags(['dummy'])({ x: 'y' })).toEqual({ x: 'y' })
    // --get
    expect(helpers.processFlags(['--get', '--dummy2'])({})).toEqual({ method: 'get' })
    expect(helpers.processFlags(['--get'])({ method: 'post' })).toEqual({ method: 'post' })
    expect(() => helpers.processFlags(['--get'])({ method: 'dummy' })).toThrow()
    // -L | --location
  })
  test('processSwitches', () => {
    expect(helpers.processSwitches([['--dummy', 'fake']])({})).toEqual({})
    expect(helpers.processSwitches([['-H', 'a: b']])({ x: 'y' })).toEqual({ x: 'y', headers: { a: 'b' } })
  })
  test('processUrl', () => {
    expect(helpers.processUrl('http://example.com')({})).toEqual({ baseURL: 'http://example.com' })
    expect(() => helpers.processUrl('not-a-url')({ baseURL: 'http://example.com' })).toThrow()
  })
  test('process', () => {
    expect(helpers.process('curl --header "X: 123" http://example.com')({})).toEqual({ baseURL: 'http://example.com', headers: { X: '123' } })
  })
})

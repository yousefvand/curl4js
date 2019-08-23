const utils = require('../lib/utils')

/* eslint-disable */
/* cspell:disable */
/* eslint-env jest */

describe('utils', () => {
  test('isOdd', () => {
    const even = Math.floor(Math.random() * 0xfffffffffffff) * 2
    expect(utils.isOdd(even)).not.toBe(true)
    expect(utils.isOdd(even + 1)).toBe(true)
  })
  test('noEmpty', () => {
    expect(utils.noEmpty('')).toBe(false)
    expect(utils.noEmpty('\n')).toBe(false)
    expect(utils.noEmpty(utils.randomString())).toBe(true)
  })
  test('trimEmptyLine', () => {
    expect(utils.trimEmptyLine('\na\nb\n').indexOf('\n')).toBeLessThan(0)
  })
  test('isObject', () => {
    expect(utils.isObject(Object.create(null))).toBe(false) // just literal
    expect(utils.isObject(null)).toBe(false)
    expect(utils.isObject(undefined)).toBe(false)
    expect(utils.isObject(123)).toBe(false)
    expect(utils.isObject('string')).toBe(false)
    expect(utils.isObject([1, 2, 3])).toBe(false)
    expect(utils.isObject(new Date)).toBe(false)
    expect(utils.isObject(true)).toBe(false)
    expect(utils.isObject(123)).toBe(false)
    expect(utils.isObject(new Object('test'))).toBe(false)
    expect(utils.isObject(new Number(3))).toBe(false)
    expect(utils.isObject({ a:{ b: 1 }})).toBe(true)
    expect(utils.isObject({})).toBe(true)
  })
  test('pipe', () => {
    const add3 = x => x + 3
    const div2 = x => x / 2
    const cube = x => x ** 2
    expect(utils.pipe(add3, div2, cube)(13)).toBe(64)
    expect(utils.pipe(div2, cube, add3)(16)).toBe(67)
  })
  test('randomInt', () => { // may fail rarely
    const randoms = Array(16).fill(0).map(e => utils.randomInt(1, 0xfffffffffffff))
    expect((new Set(randoms)).size).toBe(randoms.length)
  })
  test('isUrl', () => {
    // Test Urls from: https://mathiasbynens.be/demo/url-regex
    const urls = [
      'http://localhost:36789/simple',
      'http://foo.com/blah_blah',
      'http://foo.com/blah_blah/',
      'http://foo.com/blah_blah_(wikipedia)',
      'http://foo.com/blah_blah_(wikipedia)_(again)',
      'http://www.example.com/wpstyle/?p=364',
      'https://www.example.com/foo/?bar=baz&inga=42&quux',
      'http://✪df.ws/123',
      'http://userid:password@example.com:8080',
      'http://userid:password@example.com:8080/',
      'http://userid@example.com',
      'http://userid@example.com/',
      'http://userid@example.com:8080',
      'http://userid@example.com:8080/',
      'http://userid:password@example.com',
      'http://userid:password@example.com/',
      'http://142.42.1.1/',
      'http://142.42.1.1:8080/',
      'http://➡.ws/䨹',
      'http://⌘.ws',
      'http://⌘.ws/',
      'http://foo.com/blah_(wikipedia)#cite-1',
      'http://foo.com/blah_(wikipedia)_blah#cite-1',
      'http://foo.com/unicode_(✪)_in_parens',
      'http://foo.com/(something)?after=parens',
      'http://☺.damowmow.com/',
      'http://code.google.com/events/#&product=browser',
      'http://j.mp',
      'ftp://foo.bar/baz',
      'http://foo.bar/?q=Test%20URL-encoded%20stuff',
      'http://مثال.إختبار',
      'http://例子.测试',
      'http://उदाहरण.परीक्षा',
      `http://-.~_!$&'()*+,;=:%40:80%2f::::::@example.com`,
      'http://1337.net',
      'http://a.b-c.de',
      'http://223.255.255.254',
      'https://foo_bar.example.com/'
    ]
    const nonUrls = [
      'http://',
      'http://.',
      'http://..',
      'http://../',
      'http://?',
      'http://??',
      'http://??/',
      'http://#',
      'http://##',
      'http://##/',
      'http://foo.bar?q=Spaces should be encoded',
      '//',
      '//a',
      '///a',
      '///',
      'http:///a',
      'foo.com',
      'rdar://1234',
      'h://test',
      'http:// shouldfail.com',
      ':// should fail',
      'http://foo.bar/foo(bar)baz quux',
      'ftps://foo.bar/',
      'http://-error-.invalid/',
      // 'http://a.b--c.de/', // fails
      'http://-a.b.co',
      'http://a.b-.co',
      'http://0.0.0.0',
      'http://10.1.1.0',
      'http://10.1.1.255',
      'http://224.1.1.1',
      'http://1.1.1.1.1',
      'http://123.123.123',
      'http://3628126748',
      'http://.www.foo.bar/',
      // 'http://www.foo.bar./', // fails
      'http://.www.foo.bar./',
      'http://10.1.1.1',
      'http://10.1.1.254'
    ]
    urls.forEach(url => expect(utils.isUrl(url)).toBe(true))
    nonUrls.forEach(url => expect(utils.isUrl(url)).toBe(false))
  })
  test('trimSymmetricQuote', () => {
    expect(utils.trimSymmetricQuote(`'a'b'c'`).indexOf('\'')).toBe(1)
    expect(utils.trimSymmetricQuote(`'a'b'c'`).lastIndexOf('\'')).toBe(3)
    expect(utils.trimSymmetricQuote(`"a"b"c"`).indexOf('"')).toBe(1)
    expect(utils.trimSymmetricQuote(`"a"b"c"`).lastIndexOf('"')).toBe(3)
  })
  test('noLeadingCurl', () => {
    expect(['CURL', 'a', 'B', 'c'].filter(utils.noLeadingCurl).length).toBe(3)
    expect(['CUrL', 'a', 'CuRl', 'B'].filter(utils.noLeadingCurl).length).toBe(3)
    expect(['a', 'B', 'Curl', 'B'].filter(utils.noLeadingCurl).length).toBe(4)
  })
  test('charCount', () => {
    expect(utils.charCount('abcaDe', 'a')).toBe(2)
    expect(utils.charCount('1AbcadAe3A', 'A')).toBe(3)
    expect(utils.charCount(`ab'c'd'e'f`, `'`)).toBe(4)
  })
  test('randomString', () => { // may fail rarely
    const randoms = Array(16).fill(0).map(e => utils.randomString(0xff))
    expect((new Set(randoms)).size).toBe(randoms.length)
  })
  test('merge', () => {
    const override1 = {
      a: 9,
      b: [1, 2],
      c: {
        x: 2,
        y: {
          key1: 'dummy1',
          key2: 'dummy2'
        },
        z: 'test'
      }
    }
    const obj1 = {
      q: 'stand',
      b: 3,
      c: {
        q: 5,
        x: 8,
        y: {
          key3: 22,
          key2: 'override me'
        }
      }
    }
    utils.merge(override1, obj1)
    expect(obj1.a).toBe(9)
    expect(obj1.q).toBe('stand')
    expect(obj1.b).toStrictEqual([1, 2])
  })
  test('trimSymmetric', () => {
    const char = utils.randomString(1)
    const str = utils.randomString()
    const trimmed = utils.trimSymmetric(`${char}${str}${char}`, char)
    expect(trimmed.charAt(0) === char && trimmed.charAt(trimmed.length - 1) === char).toBe(false)
  })
  test('parseCookie', () => {
    expect(utils.parseCookie('a=b')).toEqual({ a: 'b' })
    expect(utils.parseCookie('a=b;; ; c=d')).toEqual({ a: 'b', c: 'd' })
    expect(utils.parseCookie('E=mc%5E2')).toEqual({E: 'mc^2' })
    expect(() => utils.parseCookie('a=%5G')).toThrow(URIError)
  })
  test('validate', () => {
    expect(() => utils.validate(`a ' b `)).toThrow()
    expect(() => utils.validate(`'a ' b ''c'`)).toThrow()
    expect(() => utils.validate(`a " b `)).toThrow()
    expect(() => utils.validate(`"a " b ""c"`)).toThrow()
    expect(() => utils.validate('a`b')).toThrow()
  })
  test('rawParse', () => {
    expect(() => utils.rawParse(' "curl http://www.`example.com/ "')).toThrow()
    expect(() => utils.rawParse(` "curl http://www.'example.com/ "`)).toThrow()
    expect(() => utils.rawParse(` "curl http://www."example.com/ "`)).toThrow()
    expect(utils.rawParse(` "curl http://www.example.com/ "`).length).toBe(1)
    expect(utils.rawParse(` curl -I  http://www.example.com`).indexOf('-I')).toBe(0)
    expect(utils.rawParse(`curl -H "X-Header: Value" https://www.keycdn.com/`).length).toBe(3)
    expect(utils.rawParse(`curl -Z curl http://www.example.com/`).length).toBe(3)
    const parsed = utils.rawParse(`curl -i -H "Authorization: Bearer xyz" -H "Content-Type: application/json" -X POST "https://example/api/data?a=b&c=d::e&f=g" -d '{"a":["1"],"b":["2"],"c":["3"]}'`)
    expect(parsed.length).toBe(10)
    expect(parsed.indexOf('POST')).toBe(6)
    expect(parsed.indexOf('-d')).toBe(8)
  })
})

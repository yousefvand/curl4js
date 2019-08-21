const flagHandlers = require('../lib/helpers/flag-handlers')

/* eslint-env jest */

describe('flagHandlers', () => {
  test('get', () => { // -G | --get
    expect(flagHandlers.get('-G')({})).toEqual({ method: 'get' })
    expect(flagHandlers.get('--get')({})).toEqual({ method: 'get' })
    expect(flagHandlers.get('--dummy')({ a: 1 })).toEqual({ a: 1 })
    expect(flagHandlers.get('--get')({ method: 'post' })).toEqual({ method: 'post' })
  })
  // -L | --location
})

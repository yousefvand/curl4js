const utils = require('../../utils')

module.exports = entry => config => {
  if (entry[0] === '-H' || entry[0] === '--header') {
    const h = utils.trimQuote(entry[1]).split(':')
    if (!h[0] || !h[1]) {
      throw Error(`Invalid header: ${entry[1]}. Example: curl -H 'key: value' http://example.com`)
    }
    const key = utils.trimQuote(h[0])
    const value = utils.trimQuote(h[1])
    config.headers = config.headers ? config.headers : {}
    if (Object.getOwnPropertyDescriptor(config.headers, key)) {
      // throw Error(`Header is already defined: '${key}: ${config.headers[key]}'`)
      return config
    }
    config.headers[key] = value
  }
  return config
}

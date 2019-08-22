const utils = require('../../utils')

module.exports = entry => config => {
  if (entry[0] === '-b' || entry[0] === '--cookie') {
    const d = utils.trimSymmetricQuote(entry[1]).split('=')
    if (!d[0] || !d[1]) {
      throw Error(`Invalid data: ${entry[1]}. Example: curl -b 'key=value' http://example.com`)
    }
    const key = utils.trimSymmetricQuote(d[0])
    const value = utils.trimSymmetricQuote(d[1])
    config.headers = config.headers || {}
    config.headers.cookie = config.headers.cookie || {}
    if (Object.getOwnPropertyDescriptor(config.headers.cookie, key)) {
      // throw Error(`Cookie is already defined: '${key}: ${config.headers.cookie[key]}'`)
      return config
    }
    config.headers.cookie[key] = value
  }
  return config
}

const utils = require('../../utils')

module.exports = entry => config => {
  if (entry[0] === '-d' || entry[0] === '--data') {
    const d = entry[1].split('=')
    if (!d[0] || !d[1]) {
      throw Error(`Invalid data: ${entry[1]}. Example: curl -d 'key=value' http://example.com`)
    }
    const key = utils.trimSymmetricQuote(d[0])
    const value = utils.trimSymmetricQuote(d[1])
    config.data = config.data || {}
    if (Object.getOwnPropertyDescriptor(config.data, key)) {
      // throw Error(`Data is already defined: '${key}: ${config.data[key]}'`)
      return config
    }
    config.data[key] = value
  }
  return config
}

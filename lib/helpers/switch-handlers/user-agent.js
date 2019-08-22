const utils = require('../../utils')

module.exports = entry => config => {
  if (entry[0] === '-A' || entry[0] === '--user-agent') {
    const ua = utils.trimSymmetricQuote(entry[1])
    if (!config.headers) {
      config.headers = {}
    }
    if (!config.headers['user-agent']) {
      config.headers['user-agent'] = ua
    }
  }
  return config
}

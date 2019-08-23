const utils = require('../../utils')

module.exports = entry => config => {
  if (entry[0] === '--max-redirs') {
    const r = ~~utils.trimSymmetricQuote(entry[1]) || 0xff
    config.maxRedirects = config.maxRedirects || r
  }
  return config
}

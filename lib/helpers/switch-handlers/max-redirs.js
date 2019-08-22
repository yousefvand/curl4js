const utils = require('../../utils')

module.exports = entry => config => {
  if (entry[0] === '--max-redirs') {
    const r = parseInt(utils.trimSymmetricQuote(entry[1])) || 8
    config.maxRedirects = config.maxRedirects || r
  }
  return config
}

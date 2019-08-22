const utils = require('../../utils')

module.exports = entry => config => {
  if (entry[0] === '--url') {
    const url = utils.trimSymmetricQuote(entry[1])
    if (!utils.isUrl(url)) {
      throw Error(`Invalid URL: ${url}`)
    } else {
      config.baseURL = config.baseURL || url
    }
  }
  return config
}

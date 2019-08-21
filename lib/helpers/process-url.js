const utils = require('../utils')

// processUrl :: url: string -> config: Object -> config: Object
const processUrl = url => config => {
  if (!utils.isUrl(url)) {
    throw Error(`Invalid URL: ${url}`)
  }
  config.baseURL = config.baseURL ? config.baseURL : url
  return config
}

module.exports = processUrl

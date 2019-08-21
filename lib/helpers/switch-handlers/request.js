const utils = require('../../utils')

module.exports = entry => config => {
  if (entry[0] === '-X' || entry[0] === '--request') {
    const method = utils.trimQuote(entry[1]).toLowerCase()
    if (!['get', 'post', 'put', 'delete'].includes(method)) {
      throw Error(`Unknown request method: ${method}`)
    }
    config.method = config.method ? config.method : method
  }
  return config
}

const url = require('./url')
const data = require('./data')
const header = require('./header')
const maxRedirs = require('./max-redirs')
const request = require('./request')
const userAgent = require('./user-agent')
const connectTimeout = require('./connect-timeout')

module.exports = {
  url,
  data,
  header,
  maxRedirs,
  request,
  userAgent,
  connectTimeout
}

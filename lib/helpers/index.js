const process = require('./process')
const curlParse = require('./curl-parse')
const processUrl = require('./process-url')
const processFlags = require('./process-flags')
const processSwitches = require('./process-switches')

module.exports = {
  process,
  curlParse,
  processUrl,
  processFlags,
  processSwitches
}

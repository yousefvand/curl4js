const utils = require('../utils')
const curlParse = require('./curl-parse')
const processUrl = require('./process-url')
const processFlags = require('./process-flags')
const processSwitches = require('./process-switches')

// process :: cmd: string -> config: Object -> config: Object
const process = cmd => config => {
  const c = utils.pipe(utils.rawParse, curlParse)(cmd)
  return utils.pipe(
    processFlags(c.flags),
    processSwitches(c.switches),
    processUrl(c.url)
  )(config)
}

module.exports = process

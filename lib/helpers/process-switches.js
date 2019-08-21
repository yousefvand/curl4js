const utils = require('../utils')
const switchHandlers = require('./switch-handlers')

const fns = Object.values(switchHandlers)

// processSwitches :: switches: Array<Array<string>> -> config: Object -> config: Object
const processSwitches = switchesArray => config => {
  const p = []
  switchesArray.forEach(s => fns.forEach(fn => p.push(fn(s))))
  return utils.pipe(...p)(config)
}

module.exports = processSwitches

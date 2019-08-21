const utils = require('../utils')
const flagHandlers = require('./flag-handlers')

const fns = Object.values(flagHandlers)

// processFlags :: flags: Array<string> -> config: Object -> config: Object
const processFlags = flagsArray => config => {
  const p = []
  flagsArray.forEach(f => fns.forEach(fn => p.push(fn(f))))
  return utils.pipe(...p)(config)
}

module.exports = processFlags

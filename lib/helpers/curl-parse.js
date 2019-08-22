const utils = require('../utils')

function curlParse (args) {
  let url = null
  const flags = []
  const switches = []
  const noFlagSwitch = []

  for (let i = 0; i < args.length; i++) {
    const current = args[i]
    const next = args[i + 1]
    if (utils.curlFlags.includes(current)) {
      flags.push(current)
    } else if (utils.curlSwitches.includes(current)) {
      if (next) {
        switches.push([current, next])
      } else {
        throw Error(`Switch without parameter: ${current}`)
      }
      i++
    } else {
      noFlagSwitch.push(current)
    }
  }
  if (noFlagSwitch.length === 1) {
    url = noFlagSwitch[0]
    if (!utils.isUrl(url)) {
      throw Error(`Invalid URL: ${url}`)
    }
  }
  // TODO: Refactor
  if (noFlagSwitch.length > 1) {
    throw Error(`Cannot decide which parameter is URL:\n${noFlagSwitch.join('\n')}`)
  }
  return { flags: flags, switches: switches, url: url }
}

module.exports = curlParse

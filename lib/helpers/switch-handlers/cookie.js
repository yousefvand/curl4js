const utils = require('../../utils')

module.exports = entry => config => {
  if (entry[0] === '-b' || entry[0] === '--cookie') {
    let cookie
    try {
      cookie = utils.parseCookie(entry[1])
      if (Object.keys(cookie).length < 1 || Object.values(cookie).includes('undefined')) {
        throw Error(`Invalid cookie: ${entry[1]}. Example: curl -b 'key1=value1; key2=value2' http://example.com`)
      }
      config.headers = config.headers || {}
      config.headers.cookie = config.headers.cookie || {}
      utils.merge(config.headers.cookie, cookie)
      config.headers.cookie = cookie
    } catch (err) {
      throw Error(`Invalid cookie: ${entry[1]}. Error decoding URI: ${err}`)
    }
  }
  return config
}

// module.exports = entry => config => {
//   if (entry[0] === '-b' || entry[0] === '--cookie') {
//     const d = utils.trimSymmetricQuote(entry[1]).split('=')
//     if (!d[0] || !d[1]) {
//       throw Error(`Invalid cookie: ${entry[1]}. Example: curl -b 'key=value' http://example.com`)
//     }
//     const key = utils.trimSymmetricQuote(d[0])
//     const value = utils.trimSymmetricQuote(d[1])
//     config.headers = config.headers || {}
//     config.headers.cookie = config.headers.cookie || {}
//     if (Object.getOwnPropertyDescriptor(config.headers.cookie, key)) {
//       // throw Error(`Cookie is already defined: '${key}: ${config.headers.cookie[key]}'`)
//       return config
//     }
//     config.headers.cookie[key] = value
//   }
//   return config
// }

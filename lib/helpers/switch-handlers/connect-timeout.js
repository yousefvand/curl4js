module.exports = entry => config => {
  if (entry[0] === '--connect-timeout') {
    let timeout = entry[1]
    timeout = parseInt(timeout) || 0
    timeout = timeout < 0 ? 0 : timeout
    config.timeout = config.timeout || timeout
  }
  return config
}

module.exports = flag => config => {
  if (flag === '-G' || flag === '--get') {
    config.method = config.method || 'get'
    if (!['GET', 'POST', 'PUT', 'DELETE'].includes(config.method.toUpperCase())) {
      throw Error(`Unknown request METHOD: ${config.method}`)
    }
  }
  return config
}

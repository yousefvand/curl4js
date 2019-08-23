module.exports = flag => config => {
  if (flag === '-L' || flag === '--location') {
    config.maxRedirects = config.maxRedirects || 0xff // Number.MAX_SAFE_INTEGER
    config.maxRedirects = config.maxRedirects >= 0 ? ~~config.maxRedirects : 0xff
  }
  return config
}

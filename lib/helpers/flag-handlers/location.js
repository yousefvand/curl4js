module.exports = flag => config => {
  if (flag === '-L' || flag === '--location') {
    // Follow redirects: config.maxRedirects = 0 ?
  }
  return config
}

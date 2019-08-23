// Credit goes to: https://gist.github.com/dperini/729294
const urlValidatorRegex = new RegExp('^(?:(?:(?:https?|ftp):)?\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z0-9\\u00a1-\\uffff][a-z0-9\\u00a1-\\uffff_-]{0,62})?[a-z0-9\\u00a1-\\uffff]\\.)+(?:[a-z\\u00a1-\\uffff]{2,}\\.?))(?::\\d{2,5})?(?:[/?#]\\S*)?$', 'i')

// curl 7.47.0
const curlFlags = ['--anyauth', '-a', '--append', '--basic', '--cert-status', '--compressed', '--create-dirs', '--crlf', '--digest', '--disable-eprt', '--disable-epsv', '-f', '--fail', '--false-start', '--ftp-create-dirs', '--ftp-pasv', '--ftp-skip-pasv-ip', '--ftp-pret', '--ftp-ssl-ccc', '--ftp-ssl-control', '-G', '--get', '-g', '--globoff', '-I', '--head', '-h', '--help', '-0', '--http1.0', '--http1.1', '--http2', '--ignore-content-length', '-i', '--include', '-k', '--insecure', '-4', '--ipv4', '-6', '--ipv6', '-j', '--junk-session-cookies', '-l', '--list-only', '-L', '--location', '--location-trusted', '-M', '--manual', '--metalink', '--negotiate', '-n', '--netrc', '--netrc-optional', '-:', '--next', '--no-alpn', '-N', '--no-buffer', '--no-keepalive', '--no-npn', '--no-sessionid', '--noproxy', '--ntlm', '--path-as-is', '--post301', '--post302', '--post303', '-#', '--progress-bar', '--proxy-anyauth', '--proxy-basic', '--proxy-digest', '--proxy-negotiate', '--proxy-ntlm', '-p', '--proxytunnel', '--raw', '-J', '--remote-header-name', '-O', '--remote-name', '--remote-name-all', '-R', '--remote-time', '--sasl-ir', '-S', '--show-error', '-s', '--silent', '--socks5-gssapi-nec', '--ssl', '--ssl-reqd', '-2', '--sslv2', '-3', '--sslv3', '--ssl-allow-beast', '--ssl-no-revoke', '--tcp-nodelay', '-1', '--tlsv1', '--tlsv1.0', '--tlsv1.1', '--tlsv1.2', '--trace-time', '--tr-encoding', '-B', '--use-ascii', '-v', '--verbose', '-V', '--version', '--xattr', '-q']
const curlSwitches = ['--cacert', '--capath', '-E', '--cert', '--cert-type', '--ciphers', '-K', '--config', '--connect-timeout', '-C', '--continue-at', '-b', '--cookie', '-c', '--cookie-jar', '--crlfile', '-d', '--data', '--data-raw', '--data-ascii', '--data-binary', '--data-urlencode', '--delegation', '--dns-servers', '--dns-interface', '--dns-ipv4-addr', '--dns-ipv6-addr', '-D', '--dump-header', '--egd-file', '--engine', '--expect100-timeout', '-F', '--form', '--form-string', '--ftp-account', '--ftp-alternative-to-user', '--ftp-method', '-P', '--ftp-port', '--ftp-ssl-ccc-mode', '-H', '--header', '--hostpubmd5', '--interface', '--keepalive-time', '--key', '--key-type', '--krb', '--libcurl', '--limit-rate', '--local-port', '--login-options', '--mail-from', '--mail-rcpt', '--mail-auth', '--max-filesize', '--max-redirs', '-m', '--max-time', '--netrc-file', '--oauth2-bearer', '-o', '--output', '--pass', '--pinnedpubkey', '--proto', '--proto-default', '--proto-redir', '-x', '--proxy', '--proxy-service-name', '--service-name', '-U', '--proxy-user', '--proxy1.0', '--pubkey', '-Q', '--quote', '--random-file', '-r', '--range', '-e', '--referer', '-X', '--request', '--resolve', '--retry', '--retry-delay', '--retry-max-time', '--socks4', '--socks4a', '--socks5', '--socks5-hostname', '--socks5-gssapi-service', '-Y', '--speed-limit', '-y', '--speed-time', '--stderr', '-t', '--telnet-option', '--tftp-blksize', '-z', '--time-cond', '--trace', '--trace-ascii', '-T', '--upload-file', '--url', '-u', '--user', '--tlsuser', '--tlspassword', '--tlsauthtype', '--unix-socket', '-A', '--user-agent', '-w', '--write-out']

const isOdd = num => num % 2 !== 0
const noEmpty = s => s !== '' && s !== '\n'
const trimEmptyLine = s => s.split('\n').join(' ')
const isObject = o => !!o && o.constructor === Object
// TODO: Replace with native |> operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Pipeline_operator
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)
const pipeAsync = (...fns) => x => fns.reduce((v, f) => v.then(f), Promise.resolve(x))
const randomInt = (min, max) => min + ~~(Math.random() * (max - min))
const isUrl = s => urlValidatorRegex.test(s) || /https?:\/\/localhost.*/.test(s)
// const trimQuote = text => (text.charAt(0) === '\'' || text.charAt(0) === '"') ? text.slice(1)
// const trimLeftQuotes = s => s.replace(/^('")+/, '')
const trimSymmetricQuote = text => trimSymmetric(trimSymmetric(text.trim(), '\''), '"').trim()
const noLeadingCurl = (value, index) => index > 0 || value.trim().toLowerCase() !== 'curl'
const charCount = (text, char) => text.split('').reduce((p, c) => c === char ? ++p : p, 0)
const randomString = (len = 32) => [...Array(len)].map(() => Math.random().toString(36)[2]).join('')
const merge = (p, c) => Object.keys(p).forEach(k => isObject(p[k]) ? merge(p[k], c[k]) : c[k] = p[k]) // eslint-disable-line
const trimSymmetric = (text, char) => (text.charAt(0) === char) && (text.charAt(text.length - 1) === char) ? text.slice(1, -1) : text
const parseCookie = str => str.split(';').filter(x => x.trim() !== '').reduce((a, c) => { const kv = c.split('='); a[kv[0].trim()] = decodeURIComponent(kv[1]).trim(); return a }, {})
const parseData = str => str.split('&').filter(x => x.trim() !== '').reduce((a, c) => { const kv = c.split('='); a[kv[0].trim()] = decodeURIComponent(kv[1]).trim(); return a }, {})

/**
 * `curl` command should have even number of single and double quotes
 *
 * @param {String} cmd `curl` command
 */
function validate (cmd) {
  if (isOdd(charCount(cmd, '\''))) {
    throw Error(`Non-matching number of single-quotes (') found: ${cmd}`)
  }
  if (isOdd(charCount(cmd, '"'))) {
    throw Error(`Non-matching number of double-quotes (") found: ${cmd}`)
  }
  if (cmd.indexOf('`') > -1) {
    throw Error('Command substitution is not allowed. Backtick (`) found: ' + cmd)
  }
}

/**
 * Parse `curl` command into an array
 *
 * @param {String} cmd `curl` command
 * @returns {Array} Array of `curl` parameters
 */
function rawParse (cmd) { // TODO: regex
  validate(cmd)
  cmd = trimEmptyLine(trimSymmetricQuote(cmd.trim()))
  const result = []
  let param = ''
  let singleQuote = false
  let doubleQuote = false

  for (let i = 0; i < cmd.length; i++) {
    if (cmd.charAt(i) === '\'') {
      singleQuote = !singleQuote
    }
    if (cmd.charAt(i) === '"') {
      doubleQuote = !doubleQuote
    }
    if (!singleQuote && !doubleQuote && cmd.charAt(i) === ' ') {
      result.push(trimSymmetricQuote(param.trim()))
      param = ''
    } else {
      param += cmd.charAt(i)
    }
  }
  result.push(param.trim())
  return result.filter(noEmpty).filter(noLeadingCurl).map(trimSymmetricQuote)
}

module.exports = {
  curlFlags,
  curlSwitches,
  isOdd,
  noEmpty,
  trimEmptyLine,
  isObject,
  pipe,
  pipeAsync,
  randomInt,
  isUrl,
  trimSymmetricQuote,
  noLeadingCurl,
  charCount,
  randomString,
  merge,
  trimSymmetric,
  parseCookie,
  parseData,
  validate,
  rawParse
}

const axios = require('axios')
const helpers = require('./helpers')

/**
 * Run CURL commands
 *
 * @class Curl4js
 */
class Curl4js {
  /**
   * Creates an instance of Curl4js.
   * @param {String} cmd CURL command
   * @param {Object} [config={}] request config (overrides CURL parameters in case of conflict)
   * @memberof curl4js
   */
  constructor (cmd, config = {}) {
    // config.data = config.data || {}
    // config.headers = config.headers || {}
    this._cmd = cmd
    this._config = config
    this._process = helpers.process(cmd)
  }

  /**
   * request config
   * @readonly
   * @memberof curl4js
   */
  get cmd () {
    return this._cmd
  }

  /**
   * Get request config
   * @readonly
   * @memberof curl4js
   */
  get config () {
    return this._config
  }

  /**
   * Send actual request to server.
   * @returns {Promise} Response from server.
   * @memberof curl4js
   */
  async send () {
    return axios(this._process(this._config))
  }

  /**
   * Simulate processing CURL command with provided `config` and returns final `config`.
   */
  simulate () {
    return this._process(this._config)
  }
}

module.exports = Curl4js
// module.exports = cmd => config => axios(helpers.process(cmd)(config))

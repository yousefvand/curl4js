const axios = require('axios')
const helpers = require('./helpers')

module.exports = cmd => config => axios(helpers.process(cmd)(config))

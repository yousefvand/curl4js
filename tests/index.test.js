const Curl4js = require('../lib/index')
const express = require('express')
const app = express()
const port = 36789
let server = null

/* eslint-env jest */
jest.setTimeout(30000)

describe('curl', () => {
  beforeAll(() => {
    server = app.listen(port)
  })

  test('Class', () => {
    const curl = new Curl4js('curl http://example.com', { a: 1 })
    expect(curl.cmd).toBe('curl http://example.com')
    expect(curl.config).toHaveProperty('a', 1)
  })
  test('Simulate', () => {
    const config = { a: 1 }
    const curl = new Curl4js('curl http://example.com', config)
    const result = curl.simulate()
    expect(result).toHaveProperty('a', 1)
    expect(result).toHaveProperty('maxRedirects', 0)
    expect(result).toHaveProperty('baseURL', 'http://example.com')
  })
  test('simple', async () => {
    app.get('/simple', (req, res) => {
      expect(req.hostname).toBe('localhost')
      expect(req.path).toBe('/simple')
      res.send('pass')
    })
    const curl = new Curl4js(`curl http://localhost:${port}/simple`)
    const response = await curl.send()
    expect(response.data).toBe('pass')
  })
  test('header', async () => {
    app.get('/header', (req, res) => {
      expect(req.path).toBe('/header')
      expect(req.headers).toHaveProperty('x', '123')
      res.send('pass')
    })
    const curl = new Curl4js(`curl --header "X: 123" http://localhost:${port}/header`)
    const response = await curl.send()
    expect(response.data).toBe('pass')
  })
  test('user-agent', async () => {
    app.get('/user-agent', (req, res) => {
      expect(req.path).toBe('/user-agent')
      expect(req.headers).toHaveProperty('user-agent', 'test')
      res.send('pass')
    })
    const curl = new Curl4js(`curl -A "test" http://localhost:${port}/user-agent`)
    const response = await curl.send()
    expect(response.data).toBe('pass')
  })
  test('headers', async () => {
    app.get('/headers', (req, res) => {
      expect(req.path).toBe('/headers')
      expect(req.headers).toHaveProperty('x', '1')
      expect(req.headers).toHaveProperty('y', '2')
      res.send('pass')
    })
    const curl = new Curl4js(`curl -H "X:1" -H 'Y:2' http://localhost:${port}/headers`)
    const response = await curl.send()
    expect(response.data).toBe('pass')
  })
  test('other1', () => {
    const curl = new Curl4js(`curl -X POST --insecure --header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: Basic Y21lc3ZtOnZQfCsrNXBNQmxibTkl" -d "{
      "filter": "",
      "kind": "cluster",
      "sort_order": "ASCENDING",
      "offset": 0,
      "length": 10,
      "sort_attribute": ""
      }" "http://example.com"`)
    // const response = await curl.send()
    // const config = curl.simulate()
    // console.log(config)
  })

  afterAll(() => server.close())
})

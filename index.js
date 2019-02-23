var pathname = require('pathname-match')
var urlencode = require('urlencode')
var wayfarer = require('wayfarer')
var assert = require('assert')

module.exports = class ServerRouter {
  constructor (opts) {
    opts = opts || {}
    assert.equal(typeof opts, 'object', 'micro-server-router: opts should be type object')
    this._router = wayfarer(opts.default ? 'GET' + opts.default : null)
  }

  route (method, route, handler) {
    assert.ok(typeof method === 'string' || Array.isArray(method), 'micro-server-router.route: method should be type string or array')
    assert.equal(typeof route, 'string', 'micro-server-router.route: route should be type string')
    assert.equal(typeof handler, 'function', 'micro-server-router.route: handler should be type function')

    if (Array.isArray(method)) {
      var methodRoute = null
      for (var i = 0; i < method.length; i++) {
        methodRoute = method[i].toUpperCase() + '/' + route.replace(/^[#/]/, '')
        this._router.on(methodRoute, (params, req, res) => handler(req, res, params))
      }
    } else {
      route = method.toUpperCase() + '/' + route.replace(/^[#/]/, '')
      this._router.on(route, (params, req, res) => handler(req, res, params))
    }
  }

  match (req, res) {
    var uri = urlencode.decode(pathname(req.url)) || '/'
    uri = req.method + uri
    return this._router(uri, req, res)
  }

  start () {
    return (req, res) => this.match(req, res)
  }
}

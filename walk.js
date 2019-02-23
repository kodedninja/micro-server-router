var walk = require('wayfarer/walk')
var assert = require('assert')

module.exports = walkServerRouter

function walkServerRouter (router, cb) {
  assert.equal(typeof router, 'function', 'micro-server-router/walk: router should be a function')
  assert.equal(typeof cb, 'function', 'micro-server-router/walk: cb should be a function')

  router = router._router
  return walk(router, cb)
}

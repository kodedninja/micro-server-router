# micro-server-router

Performant [radix-trie](https://en.wikipedia.org/wiki/Radix_tree) router for
Zeit's [Micro](https://github.com/zeit/micro).

Fork of [yoshuawuyts](https://github.com/yoshuawuyts/)' [server-router](https://github.com/yoshuawuyts/server-router/), modified for compatibility with Micro.

## Usage
```js
const MicroServerRouter = require('micro-server-router')

const router = new MicroServerRouter()

router.route('POST', '/hello', () => 'world')
router.route('GET', '*', () => 'nothing')

module.exports = router.start()

```

## API
### router = new MicroSeverRouter(opts)
Create a new router with opts.

### router.route(method|routes, route, function(req, res, params))
Register a new route with an HTTP method name and a routename. Can register
multiple handlers by passing an array of method names. `params` contains
matched partials from the route.

### router.match(req, res)
Match a route on a router.

### handler = router.start()
Return a function that can be passed directly to Micro.

## Installation
```sh
$ npm install micro-server-router
```

## See Also
- [server-router](https://github.com/yoshuawuyts/server-router) - original version
- [wayfarer](https://github.com/yoshuawuyts/wayfarer) - vanilla radix-trie
  router
- [nanorouter](https://github.com/yoshuawuyts/nanorouter) - client-side
  radix-trie router

## License
[MIT](https://tldrlegal.com/license/mit-license)

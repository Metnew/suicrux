var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('./db/db.json')
var middlewares = jsonServer.defaults()
server.use(middlewares)
server.use('fake_api_that_you_may_use_one_day/v1', router)

server.post('/api/v1/auth', function (req, res) {
  res.json({token: 'nothing'})
})

server.listen(4000, function () {
  console.log('JSON Server is running')
})

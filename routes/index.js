const router = require('express').Router()

const view_routes = require('./view_routes')
const data_routes = require('./data_routes')

router.use('/', [view_routes, data_routes])

module.exports = router
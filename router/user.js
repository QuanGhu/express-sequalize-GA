const express = require('express')
const router = express.Router()
const controller = require('../controller/user')

router.post('/register', controller.create)

module.exports = router
const express = require('express')
const router = express.Router()
const controller = require('../controller/user')

router.get('/list', controller.list)
router.post('/register', controller.create)
router.post('/login', controller.login)
router.put('/update', controller.update)
router.delete('/rempve', controller.destroy)

module.exports = router
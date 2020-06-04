const Model = require('../models'),
    response  = require('../helpers/response'),
    User = Model.User,
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    saltRounds = 10

module.exports = {
    create(req, res) {
        User.create(req.body)
        .then((data) => {
            return res.status(201).json( response.success('User successfully created', data) )
        })
        .catch((err) => {
            return res.status(500).json( response.error(err))
        })
    }
}
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
    },
    login: function(req, res, next) {
        User.findOne({
            where : {
                email : req.body.email
            }
        })
        .then((data) => {
            if(bcrypt.compareSync(req.body.password, data.password)) {
                const token = jwt.sign({id: data.id}, req.app.get('secretKey'), { expiresIn: '4h'});
                return res.status(200)
                .json( response.success('User successfully logined', 
                    { 
                        name : data.name,
                        email : data.email,
                        token : token,
                        
                    }
                ))
            } else {
                return res.status(422).json( response.error('"Invalid email/password!!!') )
            }
            
        })
        .catch((err) => {
            return res.status(422).json( response.error(err) )
        })
    },
    list (req, res) {
        User.findAll()
        .then((data) => {
            return res.status(200).json( response.success('User successfully received', data) )
        })
        .catch((err) => {
            return res.status(500).json( response.error(err))
        })
    },
    destroy (req, res) {
        User.destroy({
            where: { id: req.body.id }
        })
        .then(data => {
            if(data == 1) {
                return res.status(200).json( response.success(`User with id ${req.body.id} deleted successfully`, true) )
            } else {
                return res.status(404).json( response.error(`User with id ${req.body.id} not found`, false) )
            }
        })
        .catch(err => {
            return res.status(500).json( response.error(err))
        });
    },
    update (req, res) {
        User.update({ name: req.body.name }, {
            where: { id: req.body.id }
        })
        .then(data => {
            if(data == 1) {
                return res.status(200).json( response.success(`User with id ${req.body.id} updated successfully`, true) )
            } else {
                return res.status(404).json( response.error(`User with id ${req.body.id} not found`, false) )
            }
        })
        .catch(err => {
            return res.status(500).json( response.error(err))
        });
    },
}
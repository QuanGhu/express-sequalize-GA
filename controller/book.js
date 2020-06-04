const Model = require('../models'),
    response  = require('../helpers/response'),
    Book = Model.Book

module.exports = {
    list (req,res) {
        Book.findAll({
            include: 'category'
        })
        .then((data) => {
            return res.status(201).json( response.success('Book successfully received', data) )
        })
        .catch((err) => {
            return res.status(500).json( response.error(err))
        })
    },
    find (req, res) {
        Book.findOne({
            where : {
                id : req.body.id
            },
            include: 'category'
        })
        .then((data) => {
            return res.status(200).json( response.success('Book successfully received', data) )
        })
        .catch((err) => {
            return res.status(500).json( response.error(err))
        })
    },
    create(req, res) {
        Book.create(req.body)
        .then((data) => {
            return res.status(201).json( response.success('Book successfully created', data) )
        })
        .catch((err) => {
            return res.status(500).json( response.error(err))
        })
    },
    update (req, res) {
        Book.update(req.body, {
            where: { id: req.body.id }
        })
        .then(data => {
            if(data == 1) {
                return res.status(200).json( response.success(`Book with id ${req.body.id} updated successfully`, true) )
            } else {
                return res.status(404).json( response.error(`Book with id ${req.body.id} not found`, false) )
            }
        })
        .catch(err => {
            return res.status(500).json( response.error(err))
        });
    },
    destroy (req, res) {
        Book.destroy({
            where: { id: req.body.id }
        })
        .then(data => {
            if(data == 1) {
                return res.status(200).json( response.success(`Book with id ${req.body.id} deleted successfully`, true) )
            } else {
                return res.status(404).json( response.error(`Book with id ${req.body.id} not found`, false) )
            }
        })
        .catch(err => {
            return res.status(500).json( response.error(err))
        });
    }
}
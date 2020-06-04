const Model = require('../models'),
    response  = require('../helpers/response'),
    Category = Model.Category

module.exports = {
    list (req,res) {
        Category.findAll()
        .then((data) => {
            return res.status(201).json( response.success('Category successfully received', data) )
        })
        .catch((err) => {
            return res.status(500).json( response.error(err))
        })
    },
    find (req, res) {
        Category.findOne({
            where : {
                id : req.body.id
            }
        })
        .then((data) => {
            return res.status(200).json( response.success('Category successfully received', data) )
        })
        .catch((err) => {
            return res.status(500).json( response.error(err))
        })
    },
    create(req, res) {
        Category.create(req.body)
        .then((data) => {
            return res.status(201).json( response.success('Category successfully created', data) )
        })
        .catch((err) => {
            return res.status(500).json( response.error(err))
        })
    },
    update (req, res) {
        Category.update(req.body, {
            where: { id: req.body.id }
        })
        .then(data => {
            if(data == 1) {
                return res.status(200).json( response.success(`Category with id ${req.body.id} updated successfully`, true) )
            } else {
                return res.status(404).json( response.error(`Category with id ${req.body.id} not found`, false) )
            }
        })
        .catch(err => {
            return res.status(500).json( response.error(err))
        });
    },
    destroy (req, res) {
        Category.destroy({
            where: { id: req.body.id }
        })
        .then(data => {
            if(data == 1) {
                return res.status(200).json( response.success(`Category with id ${req.body.id} deleted successfully`, true) )
            } else {
                return res.status(404).json( response.error(`Category with id ${req.body.id} not found`, false) )
            }
        })
        .catch(err => {
            return res.status(500).json( response.error(err))
        });
    }
}
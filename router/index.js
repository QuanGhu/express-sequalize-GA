const router     = require('express').Router();
const categoryRouter = require('./category');
const bookRouter = require('./book');

router.use('/category', categoryRouter)
router.use('/book', bookRouter)

module.exports = router;
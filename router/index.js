const router     = require('express').Router();
const categoryRouter = require('./category');
const bookRouter = require('./book');
const userRouter = require('./user');

router.use('/category', categoryRouter)
router.use('/book', bookRouter)
router.use('/user', userRouter)

module.exports = router;
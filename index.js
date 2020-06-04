// declare env file to variable config
require('dotenv').config()

const express = require('express'),
    app = express(),
    model = require('./models'),
    router = require('./router'),
    jwt = require('jsonwebtoken')

model.sequelize.sync().then(() => {
    app.set('secretKey', process.env.SECRET_KEY || 'nodeRestApi')
    // app.use(cors(corsOptions))
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json());
    app.use('/api', router)
    app.get('/' , (req, res) => {
        res.status(200).send(" This is an empty place")
    })
    app.get('*', (req, res) => {
        res.status(404).send("opps... are u lost in the dark?")
    })
    app.listen(process.env.APP_PORT || 3000, () => {
        console.log(`Server is listening in port ${process.env.APP_PORT || 3000}`)
    })
})
.catch((err) => {
    console.log('something error with database')
})




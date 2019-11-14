const morgan = require('morgan')
const layout = require('./views/layout')
const express = require('express')
const app = express()

app.use(morgan('dev'))
// app.use('/main')

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false}))
app.get('/', (req, res, next) =>{
    res.send(layout(''))
    // res.redirect('/main')
})
const port = 3000
app.listen(port, () => {
    console.log(`Local host ${port} is connecting!`)
})
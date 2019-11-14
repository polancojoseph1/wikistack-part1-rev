const express = require('express')
const routerWiki = express.Router()
const wikipage = require('../views/wikipage')
const addpage = require('../views/addPage')
module.exports = routerWiki

routerWiki.get('/', async (req, res, next) => {
    try {
        res.redirect('../')
    }
    catch(err) {
        res.status(404)
    }
})

routerWiki.post('/', async (req, res, next) => {
    res.json(req.body)
})

routerWiki.get('/add', async (req, res, next) => {
    res.send(addpage())  
})

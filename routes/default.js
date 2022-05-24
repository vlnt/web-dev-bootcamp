const express = require('express')

const router = express.Router()

router.all('/*', function(req, res, next){
    res.header('Engine', 'SenoBo')
    next()
})

router.get('/', function(rqe, res){
    // const indexHtml = path.join(__dirname, 'views', 'index.html')
    // res.sendFile(indexHtml)
    res.render('index')
})

router.get('/about', function(rqe, res){
    res.render('about')
})


module.exports = router
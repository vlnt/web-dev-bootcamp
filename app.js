const express = require("express")
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const defaultRoutes = require('./routes/default')
const restaurantRoutes = require('./routes/restaurants')
const app = express()


app.set('x-powered-by', false)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))

app.use('/', defaultRoutes)
app.use('/', restaurantRoutes)


  app.use(function(req, res){
      res.status(404).render('404')
  })

  app.use(function(error, req, res, next){
      res.status(500).render('500')
      console.log(error)
  })
  

app.listen(4003, ()=>{
    console.log('listening on port 4003')
})
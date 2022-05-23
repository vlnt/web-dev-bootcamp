const express = require("express")
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')



const app = express()


app.set('x-powered-by', false)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))

app.all('/*', function(req, res, next){
    res.header('Engine', 'SenoBo')
    next()
})

app.get('/', function(rqe, res){
    // const indexHtml = path.join(__dirname, 'views', 'index.html')
    // res.sendFile(indexHtml)
    res.render('index')
})

app.get('/about', function(rqe, res){
    res.render('about')
})

app.get('/confirm', function(req, res){
    res.render('confirm')
  })

app.get('/recommend', function(req, res){
    res.render('recommend')
})

app.post('/recommend', function(req, res){
       const restaurant = req.body
       restaurant.id = uuid.v4()
       const filePath = path.join(__dirname, 'data', 'restaurants.json')
       const fileData = fs.readFileSync(filePath)
       const storedRestaurants = JSON.parse(fileData)
       storedRestaurants.push(restaurant)
       fs.writeFileSync(filePath, JSON.stringify(storedRestaurants))

       res.redirect('/confirm')
  })
  
  app.get('/restaurants', function(req, res){
    const filePath = path.join(__dirname, 'data', 'restaurants.json')
    const fileData = fs.readFileSync(filePath)
    const storedRestaurants = JSON.parse(fileData)
    res.render('restaurants', { numberOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants })
  })

  app.get('/restaurants/:id', function(req, res){
      const restaurantId = req.params.id
      res.render('restaurant-detail', {rid: restaurantId})
  })
  

app.listen(4003, ()=>{
    console.log('listening on port 4003')
})
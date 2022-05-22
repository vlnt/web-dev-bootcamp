const express = require("express")
const fs = require('fs')
const path = require('path')

function logger_v(req, res, next){
    res.append('served-by', 'SenoBo-node16')
    console.log(req.method, req.url)
    next()
}

const app = express()
app.use(express.static('./playground/build'))
app.use('/responsive', express.static('./webfood'))
app.use('/eatwell', express.static('./eatwell'))
app.use(express.urlencoded({extended:false}))
app.use(logger_v)


app.get('/currenttime', function(req, res){
    res.send(`<h2>Hello from SenoBo </h2>Current time is: ${new Date().toISOString()}</div>`)
})
app.get('/name', function(req, res){
    res.send(`<h2>Hello from Express! </h2> <div>Happy coding!</div>
              <form action = '/store-user' method = 'POST'><label>Your name</label><input type='text'  name = 'username'/><button>Submit</button></form>`)
})

app.get('/users', function(req,res){
    const filePath = path.join(__dirname, 'data', 'users.json')
    const fileData = fs.readFileSync(filePath)
    const existingUsers = JSON.parse(fileData)
    let responseData = '<ul>'
    for(const user of existingUsers){
        responseData += `<li>${user}</li>`
    }
    responseData += '</ul>'
    res.send(responseData)
})

app.post('/store-user', function(req, res){
    const userName = req.body.username
    //console.log(userName)
    const filePath = path.join(__dirname, 'data', 'users.json')
    const fileData = fs.readFileSync(filePath)
    const existingUsers = JSON.parse(fileData)
    existingUsers.push(userName)
    fs.writeFileSync(filePath, JSON.stringify(existingUsers))
    res.send('<h2>Username stored!</h2>')
})

app.listen(4003, ()=>{
    console.log('listening on port 4003')
})
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const Redis = require('redis')

const redisClient = Redis.createClient()
redisClient.connect()

const DEFAULT_EXPIRATION = 1200

const app = express()
app.use(cors())

app.get("/photos", async (req, res) => {
    const albumId = req.query.albumId
        console.log('getting photos')
        const photos = await redisClient.get(`photos?albumId=${albumId}`)
        if(photos != null){
            res.json(JSON.parse(photos))
        } else {
            const {data} = await axios.get("https://jsonplaceholder.typicode.com/photos", {params:{albumId}})
                           redisClient.setEx(`photos?albumId=${albumId}`, DEFAULT_EXPIRATION, JSON.stringify(data) )
                           res.json(data)
                        }
        }
)      
        

app.get("/photos/:id", async (req, res) => {
    const {data} = await axios.get(
        `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
    )
    res.json(data)
})

app.listen(4005, () => {
    console.log('ready to accept connections on port 4005')
})

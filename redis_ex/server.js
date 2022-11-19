const express = require('express')
const axios = require('axios')
const cors = require('cors')
const Redis = require('redis')

const redisClient = Redis.createClient({
    url: 'redis://localhost:6379'
})
redisClient.connect()

const DEFAULT_EXPIRATION = 3600

const app = express()
app.use(cors())

app.get("/photos", async (req, res) => {
    const albumId = req.query.albumId
    const {data} = await axios.get(
        "https://jsonplaceholder.typicode.com/photos",
        {params: {albumId}}
    )
    //redisClient.connect()
    redisClient.setEx('photos', DEFAULT_EXPIRATION, JSON.stringify(data) )
    res.json(data)
})

app.get("/photos/:id", async (req, res) => {
    const {data} = await axios.get(
        `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
    )
    res.json(data)
})

app.listen(4005, () => {
    console.log('ready to accept connections on port 4005')
})

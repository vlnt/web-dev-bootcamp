const express = require('express')
const axios = require('axios')
const cors = require('cors')
const Redis = require('redis')

const redisClient = Redis.createClient()
redisClient.connect()

const DEFAULT_EXPIRATION = 3600

const app = express()
app.use(cors())

app.get("/photos", async (req, res) => {
   // try{
        console.log('getting photos')
        const photos = await redisClient.get("photos")
        if(photos != null){
            res.json(photos)
        } else {
            const {data} = await axios.get("https://jsonplaceholder.typicode.com/photos")
                           redisClient.setEx('photos', DEFAULT_EXPIRATION, JSON.stringify(data) )
                           res.json(data)
                        }
        }
)      
        
    //     redisClient.get("photos", async (error, photos) => {
    //         if(error) console.log(error)
    //         if (photos != null){
    //              res.json(JSON.parse(photos))
    //         } else {
    //             const {data} = await axios.get(
    //                 "https://jsonplaceholder.typicode.com/photos"
    //             )
    //             redisClient.setEx('photos', DEFAULT_EXPIRATION, JSON.stringify(data) )
    //         }
    //         res.json(data)
    //     })
    // }catch(error){
    //     res.status(500).send({error:error.message})
    // }
    
//})

app.get("/photos/:id", async (req, res) => {
    const {data} = await axios.get(
        `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
    )
    res.json(data)
})

app.listen(4005, () => {
    console.log('ready to accept connections on port 4005')
})

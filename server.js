const http = require("http")
const os = require("os")

function handleRequest(req, res){
    if(req.url === "/time"){
        res.statusCode = 200
        res.setHeader('server', 'SenoBo_node16')
        res.setHeader('Content-Type', 'text/html')
        res.end(`<h2>Hello from ${res.getHeader('server')} </h2>Current time is: ${new Date().toISOString()}</div>`)
    }
    res.statusCode = 200
    res.setHeader('server', 'SenoBo_node16')
    res.setHeader('Content-Type', 'text/html')
    res.end(`<h2>Hello from ${res.getHeader('server')} </h2> <div>Happy coding!</div>`)
}

const server = http.createServer(handleRequest)

server.listen(port = 4004, () => {
    console.log(`server is listening on port ${port}`)
    //console.log(os.tempDir)
})
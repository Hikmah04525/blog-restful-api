const http = require("http");
const app = require("./app");
const {port} =  require ("./config/keys");

// create server
const server = http.createServer(app);

// listen to server
server.listen(port, () =>{console.log(`server is running on port ${port}`)})
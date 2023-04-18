const express = require("express"); //Express 
const path = require("path"); //To Perform manipulations on folders & files
const http = require("http");
const cors = require("cors");
const { routesInit } = require("./routes/config_routes"); // import routesInit() 
require("./db/mongoConnect"); // Links the mongo to app
require('dotenv').config()

const app = express(); // app of express        
app.use(cors())

app.use(express.json()); // app of jsons
// app.use(express.static(path.join(__dirname, "public")));
// the public directory is always accessible 
app.use(express.static(path.join(__dirname,"public")));

routesInit(app);


const server = http.createServer(app);
let port = process.env.PORT || 3020;
server.listen(port); 
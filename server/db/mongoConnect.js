
const mongoose = require('mongoose'); //connect to mongoose module
const { config } = require('../config/secret');
require('dotenv').config()

main().catch(err => console.log(err)); //Error Message if not working the connect

async function main() { //connect Data Base from Mongo Atlas by user & password 
    await mongoose.connect(`mongodb+srv://${config.userDB}:${config.userPass}@cluster0.w3qrn28.mongodb.net/cooking_blogs`); //(feb22 == name DataBase)
    console.log(`Mongo Atlas connect... on port ${process.env.PORT}`) //print--> Mongo is Working
}
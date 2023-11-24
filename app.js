const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path:'./.env'})
const web = require('./routes/web')
const db = require('./db/connectdb')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const cors = require('cors')


app.use(cors()) // for api communication

app.use(cookieParser())//for getting token in auth

//temp file uploader
app.use(fileupload({useTempFiles: true}));

app.use(express.json()) //for data get from api




//db check
db()


//load route
app.use('/api',web) //loacalhost:4000/api




//server create 
app.listen(process.env.PORT,()=>{
    console.log(`server running on localhost ${process.env.PORT}`)
})
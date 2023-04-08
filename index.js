const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/UserRoutes')
const postRouter = require('./routes/PostRoutes')

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/auth", userRouter)
app.use("/posts", postRouter)

async function connect() {
    try {
    await mongoose.connect(process.env.MONGO_STR, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("DATABASE connection successful")
    })
        } catch (error) {
            console.log("FAILED to connect to database")
        }
    }    
connect()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}....`)
})
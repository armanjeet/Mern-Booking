const express = require('express')
const dotenv = require('dotenv')
const connectDb = require('./db/Db.js')
const authRoute = require('./routes/authRoute.js')
const hotelsRoute = require('./routes/hotelsRoute.js')
const roomsRoute = require('./routes/roomsRoute.js')
const usersRoute = require('./routes/usersRoute.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
dotenv.config()
//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: "http://localhost:3000" }))


app.use('/api/auth', authRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "something went wrong"
    return res.status(errorStatus).json({
        sucess: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})
app.listen(process.env.PORT, () => {
    connectDb()
    console.log('connected to backend')
})


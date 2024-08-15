import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import bookingRoute from './routes/booking.js'



dotenv.config()
const app = express()

app.get('/', (req, res) => {
    res.send('Api is Working')
})
const corsOptions ={
    origin:true,
    credentials:true
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

mongoose.set("strictQuery", false)
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGOBD_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB is Connect")
    } catch (error) {
        console.log("MongoDB is Connect Failed")

    }
}




const port = process.env.PORT || 8000
app.listen(port, () => {
    connect()
    console.log(`Server is Listening ${port}`)
})

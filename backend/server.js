import express from "express"
import 'dotenv/config'
import connectDB from "./database/db.js"
import userRoute from "./routes/userRoute.js"
import cors from "cors"

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true
}))

app.use('/user', userRoute)

// Connect to DB at module level so it runs on Vercel serverless too
connectDB()

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`server is listening at port ${PORT}`)
    })
}

export default app
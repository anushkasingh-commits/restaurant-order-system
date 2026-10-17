require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB = require('./config/db')
const app = express()
const PORT = 5000

connectDB()

app.use(express.json())
app.use(cors())

app.get("/api/health", (req, res) => {
    res.status(200).json({status:"ok"});
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
})
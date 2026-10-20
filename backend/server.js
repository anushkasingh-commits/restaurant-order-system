require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const menuRoutes = require('./routes/menuRoutes')
const tableRoutes = require("./routes/tableRoutes");
const orderRoutes = require('./routes/orderRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const {notFound, errorHandler} = require('./middleware/errorHandler')
const app = express()

connectDB()

app.use(express.json())
app.use(cors())

app.get("/api/health", (req, res) => {
    res.status(200).json({status:"ok"});
})

app.use('/api/auth', authRoutes)
app.use('/api/menu', menuRoutes)
app.use("/api/tables", tableRoutes);
app.use("/api/orders", orderRoutes)
app.use('/api/dashboard', dashboardRoutes)

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
})
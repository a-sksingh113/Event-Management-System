require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dbConnection');
const checkForAuthenticationCookie = require("./middleware/authMiddleware")
const cookieParser = require("cookie-parser")

const userRoute = require("./routes/userRoute")

const app = express();

PORT = process.env.PORT || 8001;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));


app.use('/api/user', userRoute );

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT} `);
})
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dbConnection');
const checkForAuthenticationCookie = require("./middleware/authMiddleware")
const cookieParser = require("cookie-parser")

const eventRoute = require("./routes/eventRoute")
const userRoute = require("./routes/userRoute")
const programRoute = require("./routes/programRoute")
const programRegistrationRoute = require("./routes/programRegistrationRoute")


const app = express();
PORT = process.env.PORT || 8001;
connectDB();

app.use(express.json());
app.use(cookieParser());


app.use('/api/user', userRoute );
app.use('/api/event',eventRoute,programRoute,programRegistrationRoute);




app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT} `);
})
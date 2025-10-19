require("dotenv").config({ path: process.env.NODE_ENV === "production" ? ".env.production" : ".env" })
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const chalk = require("chalk")
// const users = require("./routes/users");
// const User = require("./models/User");
const bcrypt = require("bcryptjs");
const rateLimit = require("express-rate-limit");




const app = express();
const PORT = process.env.PORT || 8008
app.use(express.json());
app.use(cors())
app.use((req, res, next) => {
    next()
})

mongoose.connect(process.env.DB).then(() => {
    console.log(chalk.blue("connected to mongoDB"))
}).catch(() => {
    console.log(chalk.red("could'nt connected to mongoDB"))
})

app.listen(PORT, () => {
    console.log(chalk.greenBright(`Server runing on port ${PORT}`));
})




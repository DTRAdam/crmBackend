require("dotenv").config({
    path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const chalk = require("chalk");
// const User = require("./models/User");

const rateLimit = require("express-rate-limit");
const users = require("./routes/users");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use((req, res, next) => {
    next();
});

mongoose
    .connect(process.env.DB)
    .then(() => {
        console.log(chalk.blue("connected to mongoDB"));
    })
    .catch(() => {
        console.log(chalk.red("could'nt connected to mongoDB"));
    });

app.use("/api/users", users);

app.listen(PORT, () => {
    console.log(chalk.greenBright("Server runing on port"), PORT);
});

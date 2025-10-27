require("dotenv").config({
	path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const chalk = require("chalk");
// const User = require("./models/User");

// routes imports
const users = require("./routes/users");
const products = require("./routes/products");

const app = express();

const PORT = process.env.PORT || 8000;

// express rate limit for limit requests
const {rateLimit} = require("express-rate-limit");
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
});

app.use(express.json());
app.use(limiter);
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

// routes
app.use("/api/users", users);
app.use("/api/products", products);

// express listener
app.listen(PORT, () => {
	console.log(chalk.greenBright("Server runing on port"), PORT);
});

const express = require("express");
const Users = require("../models/Users");
const bcryptJs = require("bcryptjs");
const registerSchema = require("../Schema/registerSchema")
const router = express.Router();


router.post("/register", async (req, res) => {
	try {
		// check schema errors
		const { error } = registerSchema.validate(req.body);

		if (error) return res.status(400).send(error.details[0].message);

		// check user exists
		let user = await Users.findOne({ email: req.body.email });
		if (user)

			return res
				.status(400)
				.send("A user with this email already exists, Please Log in instead");

		// hash password
		const hashedPassword = bcryptJs.hashSync(req.body.password, 10)

		// create new user
		const newUsers = new Users({ ...req.body, password: hashedPassword });
		// save user
		await newUsers.save();

		res.status(201).send("user is created");

		// create token

		// send result
	} catch (error) {
		res.status(500).send(error.message);
		console.log(req.body.password);
	}
});

router.get("", (req, res) => { });

module.exports = router;

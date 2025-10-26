const express = require("express");
const Users = require("../models/Users");
const bcryptJs = require("bcryptjs");
const registerSchema = require("../Schema/registerSchema")
const router = express.Router();
const jwt = require("jsonwebtoken")
const _ = require("lodash")


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
		const newUser = new Users({ ...req.body, password: hashedPassword });
		// save user
		await newUser.save();
		// create token
		const data = _.pick(newUser, ["_id", "role", "avatar", "isActive"]);

		data.profile = newUser.profile;

		const token = jwt.sign(data, process.env.SECRET_JWT);

		res.status(201).send(token);
		// send result 
	} catch (error) {
		res.status(500).send(error.message);
		console.log(req.body.password);
	}
});

router.get("", (req, res) => { });

module.exports = router;

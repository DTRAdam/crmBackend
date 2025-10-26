const express = require("express");
const joi = require("joi");
const Users = require("../models/Users");

const router = express.Router();

const registerSchema = joi.object({
	email: joi.string().required(),
	password: joi.string().min(8).required(),
	// .regex(
	// 	/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/,
	// 	"the password must be 8 characters length 2 letters in Upper Case 1 Special Character (!@#$&*) 2 numerals (0-9) 3 letters in Lower Case",
	// ),
	profile: joi.object({
		firstName: joi.string().required(),
		lastName: joi.string().required(),
		avatar: joi.object({
      url:joi.string(),
      alt:joi.string()
    }).allow(""),
		phone: joi.string().pattern(/^0\d{1,2}-?\d{7}$/),
		posision: joi.string(),
		address: joi.object({
			city: joi.string(),
			street: joi.string(),
			houseNo: joi.string(),
			zipCode: joi.string().required(),
		}),
	}),
	role: joi.string().default("customer"),
	isActive: joi.boolean().required().default(true),
	lastLogin: joi.date(),
});

router.post("/register", async (req, res) => {
	try {
		// check schema errors
    const {error} = registerSchema.validate(req.body);

		if (error) return res.status(400).send(error.details[0].message);

		// check user exists
		let user = await Users.findOne({email: req.body.email});
		if (user)
    
			return res
				.status(400)
				.send("A user with this email already exists, Please Log in instead");

		// create new user
		const newUsers = new Users(req.body);
		// save user
		await newUsers.save();

		res.status(201).send("user is created");

		// create token

		// send result
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.get("", (req, res) => {});

module.exports = router;

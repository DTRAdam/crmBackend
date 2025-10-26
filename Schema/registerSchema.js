const joi = require("joi");
const registerSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().min(8).required().pattern(
        /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/,
        "the password must be 8 characters length 2 letters in Upper Case 1 Special Character (!@#$&*) 2 numerals (0-9) 3 letters in Lower Case",
    ),
    profile: joi.object({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        avatar: joi.object({
            url: joi.string(),
            alt: joi.string()
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

module.exports = registerSchema
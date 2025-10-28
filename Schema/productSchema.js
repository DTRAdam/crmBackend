const joi = require("joi");

const productSchema = joi.object({
	product_name: joi.string().required().min(2),
	category: joi.string().required().min(1),
	price: joi.number().required().min(1),
	quantity_in_stock: joi.number().required(),
	description: joi.string().max(500),
	manufacturer: joi.string().required(),
	image: joi.object({
		url: joi.string().required(),
		alt: joi.string().required(),
	}),
	sales: joi.object({
		isSale: joi.boolean().required(),
		discount: joi.number().min(0).max(100).when("isSale", {
			is: true,
			then: joi.required(),
			otherwise: joi.forbidden(),
		}),
	}),
});

const updateProductNameSchema = joi.object({
	product_name: joi.string().required().min(2),
});

module.exports = {productSchema, updateProductNameSchema};

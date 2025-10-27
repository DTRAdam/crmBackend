const express = require("express");
const router = express.Router();
const {productSchema, updateProductNameSchema} = require("../Schema/productSchema");
const Products = require("../models/Produts");

// add product to store
router.post("/", async (req, res) => {
	try {
		// check schema
		const {error} = productSchema.validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		// check if the product is exists on the database
		const product = await Products.findOne({product_name: req.body.product_name});
		if (product) return res.status(400).send("This product already exists");
		// create a new product
		const newProduct = new Products(req.body);
		// save the product
		await newProduct.save();
		// return is success
		res.status(201).send("product added successfully");
	} catch (error) {
		res.status(500).send(error.message);
		// "internal server error";
	}
});

// get all products
router.get("/", async (req, res) => {
	try {
		// check if exists
		const products = await Products.find();

		// check if exists
		if (!products) return res.status(404).send("No products has been found.");

		res.status(200).send(products);
	} catch (error) {
		res.status(500).send(error.message);
		// "internal server error";
	}
});

// get product by id
router.get("/:id", async (req, res) => {
	const {id} = req.params;
	try {
		// check if exists
		const product = await Products.findById(id);
		if (!product) return res.status(404).send("No products has been found");

		res.status(200).send(product);
	} catch (error) {
		res.status(500).send(error.message);
		// "internal server error";
	}
});

// get product by category
router.get("/category/:category", async (req, res) => {
	const {category} = req.params;
	try {
		// check if exists
		const product = await Products.findOne({category: category});
		if (!product) return res.status(404).send("No products has been found");

		res.status(200).send(product);
	} catch (error) {
		res.status(500).send(error.message);
		// "internal server error";
	}
});

// delete product by id
router.delete("/:id", async (req, res) => {
	const {id} = req.params;
	try {
		// check if exists
		const product = await Products.findByIdAndDelete(id, {new: true});
		if (!product) return res.status(404).send("No products has been found");

		res.status(200).send("product has been deleted successfully");
	} catch (error) {
		res.status(500).send(error.message);
		// "internal server error";
	}
});

router.put("/:id", async (req, res) => {
	try {
	} catch (error) {}
});

router.patch("/:id", async (req, res) => {
	try {
		const {id} = req.params;

		const {error} = updateProductNameSchema.validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const product = await Products.findOneAndUpdate(
			{_id: id},
			{product_name: req.body.product_name},
			{new: true},
		);
		if (!product) return res.status(400).send("product not found");
		res.status(200).send(product);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = router;

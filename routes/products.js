const express = require("express");
const router = express.Router();
const {productSchema, updateProductNameSchema} = require("../Schema/productSchema");
const Products = require("../models/Products");
const auth = require("../middlewares/auth");
const verifyRole = require("../middlewares/verifyRole");
const Review = require("../models/Review");

//_____ Create and Get _____
// Create a new product
router.post("/", async (req, res) => {
	try {
		// validation schema
		const {error} = productSchema.validate(req.body);

		// Check shcema error
		if (error) return res.status(400).send(error.details[0].message);

		// Check if the product is exists on the database
		const product = await Products.findOne({product_name: req.body.product_name});
		if (product) return res.status(400).send("This product already exists");

		// Create a new product
		const newProduct = new Products(req.body);

		// Save the product
		await newProduct.save();

		// Return successfully product created
		res.status(201).send("product added successfully");
	} catch (error) {
		res.status(500).send("internal server error");
	}
});

// Fetch all products
router.get("/", async (req, res) => {
	try {
		// Try to find the products
		const products = await Products.find();

		// check if the proucts is exists
		if (!products) return res.status(404).send("No products has been found.");

		// Return the products
		res.status(200).send(products);
	} catch (error) {
		res.status(500).send("internal server error");
	}
});

// Fetch products by category
router.get("/category/:category", async (req, res) => {
	const {category} = req.params;
	try {
		// check if exists
		const products = await Products.find({category: category});
		if (!products.length) return res.status(404).send("No products has been found");

		res.status(200).send(products);
	} catch (error) {
		res.status(500).send("internal server error");
	}
});

// Fetch product by id
router.get("/:id", async (req, res) => {
	const {id} = req.params;
	try {
		// Try to  find the product
		const product = await Products.findById(id).populate({
			path: "reviews",
			populate: {path: "user", select: "profile.firstName profile.lastName email"},
		});

		// check if the product is exists
		if (!product) return res.status(404).send("No products has been found");

		// return the product
		res.status(200).send(product);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

//_____ Updates _____

// delete product by id
router.delete("/:id", auth, verifyRole(["Admin"]), async (req, res) => {
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

// update produc by id
router.put("/:id", auth, verifyRole(["Admin"]), async (req, res) => {
	try {
		const {id} = req.params;
		const product = await Products.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!product) return res.status(404).send("Product not found");
		res.status(200).send(product);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// update spicific produc name by id
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

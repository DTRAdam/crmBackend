const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
    {
        product_name: { type: String, unique: true, required: true, trim: true },
        category: { type: String, required: true },
        price: {
            type: Number,
            required: true,
            min: [1, "Price must be a positive number"],
        },
        quantity_in_stock: {
            type: Number,
            required: true,
            min: 0,
        },
        description: {
            type: String,
            maxlength: [500, "Description cannot exceed 500 characters"],
        },

        manufacturer: {
            type: String,
            required: true,
        },
        image: {
            url: { type: String, required: true },
            alt: { type: String, required: true }
        },
        sales: {
            isSale: { type: Boolean, required: true, default: false },
            discount: { type: Number },
        },
    },
    {
        timestamps: true,
    },
);

const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
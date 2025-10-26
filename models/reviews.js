const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating cannot exceed 5"],
        },
        comment: {
            type: String,
            maxlength: [500, "Comment cannot exceed 500 characters"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// Optional: prevent duplicate reviews by the same user for the same product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        firstName: String,
        lastName: String,
        avatar: String,
        phone: String,
        department: String,
        position: String
    },
    role: {
        type: ObjectId,
        ref: 'Role',
        required: true
    },
    permissions: [String], // Manage users permissions
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Users", UserSchema)

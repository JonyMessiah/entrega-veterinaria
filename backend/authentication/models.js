const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },

    email: {
        type: String,
        required: true,
        unique: true
    },   
    identification: {
        type: String,
        required: true,
        unique: true
    }, 
     password: {
        type: String,
        required: true,
        unique: false
    }, 
    birthday: {
        type: String,
        required: true,
        unique: false
    }, 
    address: {
        type: String,
        required: true,
        unique: false
    },
    is_admin: {
        type: Boolean,
        default: false,
    }
})

const UserModel = mongoose.model("User", userSchema, "users");

module.exports = {UserModel}
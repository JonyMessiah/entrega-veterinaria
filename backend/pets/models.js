const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        unique: false
    },
    allergies: {
        type: String,
        required: true,
        unique: false


    },
    notes: {
        type: String,
        required: true,
        unique: false


    },
    birthday: {
    type: String,
    required: true,
    unique: false

    },
    type: {
        type: String,
        required: true,
        unique: false
    
        },
    address: {
        type: String,
        required: true,
        unique: false
    },
    user_id: {
        type: String,
        required: true,
    }
})

const PetModel = mongoose.model("Pet", petSchema, "pets");

module.exports = {PetModel}
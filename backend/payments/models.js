const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    cardName: {
        type: String,
        required: true,
        unique: false
    },

    cardNumber: {
        type: String,
        required: true,
        unique: true
    },   
    securityNumber: {
        type: String,
        required: true,
        unique: true
    }, 
     expirationNumber: {
        type: String,
        required: true,
        unique: false
    }
})

const PaymentModel = mongoose.model("Payment", paymentSchema, "payments");

module.exports = {PaymentModel}
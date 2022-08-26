const { default: mongoose } = require("mongoose");
const { UserModel } = require("../authentication/models");
const { PaymentModel } = require("./models");


exports.paymentAdd = async (req, res) => {
    const {
        cardName, 
        cardNumber,
        securityNumber,
        expirationNumber,
    } = req.body;

    if (cardName && cardNumber && securityNumber && expirationNumber) {
        const payment = new PaymentModel();
        payment.cardName = cardName;
        payment.cardNumber = cardNumber;
        payment.securityNumber = securityNumber;
        payment.expirationNumber = expirationNumber;
        await payment.save();

        res.json({success: true, data: payment})
    } else {
        res.json({success: false, error: 'Rellene todos los campos'});
    }
} 

exports.paymentsList = async (req, res) => {
    const user_identification = req.query?.identification;
    let filter = {};
    console.log(user_identification);
    console.log(req.user);
    if (req.user.is_admin && user_identification) {
        const user = await UserModel.findOne({identification: user_identification})
        if (user) {
            filter = {user_id: user._id}
        } else {
            res.json({success: false, error: 'No encontramos el usuario'});
            return;
        }
    } else {
       filter = {user_id: req.user._id};
    }

    const payments = await PaymentModel.find(filter);
    return res.json({success: true, data: payments});
}
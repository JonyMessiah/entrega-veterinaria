const { default: mongoose } = require("mongoose");
const { PetModel } = require("./models");
const { UserModel } = require("../authentication/models");


exports.petAdd = async (req, res) => {
    const {
        name, 
        notes,
        allergies,
        address,
        birthday,
        type,
    } = req.body;

    if (name && notes && allergies && address && birthday && type) {
        const pet = new PetModel();
        pet.name = name;
        pet.notes = notes;
        pet.allergies = allergies;
        pet.address = address;
        pet.user_id = req.user._id;
        pet.birthday = birthday;
        pet.type = type;

        await pet.save();

        res.json({success: true, data: pet})
    } else {
        res.json({success: false, error: 'Rellene todos los campos'});
    }
} 

exports.petsList = async (req, res) => {
    const user_identification = req.query?.identification;
    let filter = {};
    console.log(user_identification);
    console.log(req.user);
    if (req.user.is_admin && user_identification) {
        const user = await UserModel.findOne({identification: user_identification})
        console.log(user);
        if (user) {
            filter = {user_id: user._id}
        } else {
            res.json({success: false, error: 'No encontramos el usuario'});
            return;
        }
    } else {
       filter = {user_id: req.user._id};
    }

    const pets = await PetModel.find(filter);
    return res.json({success: true, data: pets});
}
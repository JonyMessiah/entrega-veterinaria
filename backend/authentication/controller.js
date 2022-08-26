const bcrypt = require("bcrypt");
const { authenticateJWTSign } = require("../_common/middleware/authentication");

const { UserModel } = require("./models");


exports.authLogin = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const user = await UserModel.findOne({
        email
    });

    if (user) {
        const validPassword = await bcrypt.compare(password, user.password,);        
        if (validPassword) {
            res.json({
                success: true,
                data: {
                    _id: user._id,
                    is_admin: user.is_admin,
                    token: authenticateJWTSign({
                        _id: user._id,
                        is_admin: user.is_admin,    
                    }),                    
                }
            });
        } else {
            res.json({success: false, error: "No pudimos authenticar tus datos"});    
        }
    } else { 
        res.json({success: false, error: "No pudimos authenticar tus datos"});
    }
}

exports.me = async(req, res) => {
    const userExists = await UserModel.findOne({
        _id: req.user._id
    });

    if (userExists) {
        userExists.password = '';
        return res.json({success: true, data: userExists});
    } else {
        return res.json({success: false});
    }
}

exports.userGet = async(req, res) => {
    const user_identification = req.query?.identification;

    if (req.user.is_admin && user_identification) {
        const user = await UserModel.findOne({identification: user_identification})
        if (user) {
            res.json({success: true, data: user});
            return;
        }
    }

    res.json({success: false, error: 'No encontramos el usuario'});
            return;
}


exports.userRegister = async (req, res) => {        
    const {
        txtnombre: name,
        txtcorreo: email,
        txtcontra: password,
        txtcedula: identification,
        txtfecha: birthday,
        txtdireccion: address,
    } = req.body;

    if (name && email && password && identification && birthday && address) {
        const userExists = await UserModel.findOne({
            $or: [{email}, {identification}]
        });

        if (userExists) {
            // User already exists, throw an error
            res.json({success: false, error: 'Usuario ya existe'});
        } else {
            const salt = await bcrypt.genSalt(10);
            // User created succesfully 
            const user = new UserModel();
            user.name = name;
            user.email = email;
            user.birthday = birthday;
            user.identification = identification;
            user.password = await bcrypt.hash(password, salt);
            user.address = address;

            await user.save();

            // Return success true, data empty
            res.json({success: true, error: ""});
        }
    } else {
        res.json({success: false, error: 'Rellene todos los campos'});
    }    
}

exports.adminRegister = async (req, res) => {        
    const {
        txtnombre: name,
        txtcorreo: email,
        txtcontra: password,
        txtcedula: identification,
        txtfecha: birthday,
        txtdireccion: address,
    } = req.body;

    if (name && email && password && identification && birthday && address) {
        const userExists = await UserModel.findOne({
            $or: [{email}, {identification}]
        });

        if (userExists) {
            // User already exists, throw an error
            res.json({success: false, error: 'Usuario ya existe'});
        } else {
            const salt = await bcrypt.genSalt(10);
            // User created succesfully 
            const user = new UserModel();
            user.name = name;
            user.email = email;
            user.birthday = birthday;
            user.identification = identification;
            user.password = await bcrypt.hash(password, salt);
            user.address = address;
            user.is_admin = true;

            await user.save();

            // Return success true, data empty
            res.json({success: true, error: ""});
        }
    } else {
        res.json({success: false, error: 'Rellene todos los campos'});
    }    
}


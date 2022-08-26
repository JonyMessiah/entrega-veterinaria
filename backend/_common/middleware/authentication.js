const jwt = require('jsonwebtoken');
const jwtSecret = "mOD8K4TzPeD0Br00ljh1RbWGC3pEgOY4XtWtJIu016ZKMtHAKB1EvuAelkLc";

exports.middlewareAuthentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // Bearer token
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.json({success: false, error: "Necesitas estar logueado"});

    jwt.verify(token, jwtSecret, (err, user) => {
        console.log(err)
    
        if (err) return res.json({success: false, error: "Tu token no es valido"})
    
        req.user = user
    
        next()
      })
}

exports.authenticateJWTSign = (data) => {
    return jwt.sign(data, jwtSecret, { expiresIn: '86400s' });
}
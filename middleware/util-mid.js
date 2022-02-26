const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

// Middleware
exports.verifyToken = (req, res, next) => {
    const {headload, signature} = req.cookies;
    jwt.verify(`${headload}.${signature}`, process.env.SECRET, (err, decoded) => {

        if(err) {
            return res.status(401).json({ errorMessage: "Unauthorized" })
        }

        console.log("Que es el decoded", decoded);
        User.findById(decoded.userId)
            .then(user => {
                req.currentUser = user;
                next()
            })
            .catch(error => {
                res.status(401).json({ errorMessage: error })
            })
    })
}

// Checar roles
exports.checkRole = (rolesArr) => {
    return (req, res, next) => {
        const {role} = req.currentUser;

        if(rolesArr.includes(role)) {
            return next();
        } else {
            return res.status(403).json({ errorMessage: "Naranjas, No tienes permiso para realizar esta accion." })
        }
    }
}

// Utils create JWT
exports.createJWT = (user) => {
    return jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.SECRET,
      { expiresIn: "24h" }
    ).split('.')
}

// Utils limpiar respuesta de mongo
exports.clearRes = (data) => {
    const {password, __v, updatedAt, ...cleanedData} = data;
    return cleanedData;
}
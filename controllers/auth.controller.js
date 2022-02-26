const User = require('../models/User.model');
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const {createJWT, clearRes} = require('../middleware/util-mid');

exports.signupProcess = (req, res, next) => {
    // { email, password, confirmPassword, ...rest} --> possible data from req.body
    const { email, password, confirmPassword, ...rest } = req.body;

    if(!email) {
        return res.status(400).json({ errorMessage: "Oye, por favor manda un correo." })
    }

    if(password.length < 8) {
        return res
          .status(400)
          .json({ errorMessage: "Oye, tu contraseña debe tener mas de 8 carateres." });
    }

    if(password != confirmPassword) {
        return res
          .status(400)
          .json({ errorMessage: "Oye, la contraseña no coincide." });
    }

    User.findOne({ email })
        .then(found => {
            if(found) {
                return res.status(400).json({ errorMessage: "Oye, este correo ya está en uso, pon otro." })
            }

            return bcrypt
              .genSalt(saltRounds)
              .then((salt) => bcrypt.hash(password, salt))
              .then((hashedPassword) => {
                return User.create({
                  email,
                  password: hashedPassword,
                });
              })
              .then((user) => {
                // JSON WEB TOKEN D:
                const [header, payload, signature] = createJWT(user);

                res.cookie("headload", `${header}.${payload}`, {
                  maxAge: 1000 * 60 * 24,
                  httpOnly: true,
                  sameSite: true,
                });

                res.cookie("signature", signature, {
                  httpOnly: true,
                  sameSite: true,
                });
                const newUser = clearRes(user.toObject())
                res.status(201).json({ newUser });
              })
              .catch((error) => {
                if (error instanceof mongoose.Error.ValidationError) {
                  return res.status(400).json({ errorMessage: error.message });
                }
                if (error.code === 11000) {
                  return res.status(400).json({
                    errorMessage:
                      "Username need to be unique. The username you chose is already in use.",
                  });
                }
                return res.status(500).json({ errorMessage: error.message });
              });
        });
};

exports.loginProcess = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if(!user) {
            res.status(400).json({ errorMessage: "Oye, este correo no está registrado"})
        }

        const match = await bcrypt.compareSync(password, user.password);
        if(match) {
            const [header, payload, signature] = createJWT(user);

            res.cookie("headload", `${header}.${payload}`, {
              maxAge: 1000 * 60 * 24,
              httpOnly: true,
              sameSite: true,
            });

            res.cookie("signature", signature, {
              httpOnly: true,
              sameSite: true,
            });
            const newUser = clearRes(user.toObject());
            res.status(200).json({ newUser });
        } else {
            res.status(400).json({ errorMessage: "Oye, tu email o contraseña son incorrectos" })
        }
    } catch(err) {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage:
              "Mensaje de error",
          });
        }
        return res.status(500).json({ errorMessage: error.message });
    }
}

exports.logoutProcess = (req, res, next) => {
    res.clearCookie('headload');
    res.clearCookie('signature');
    res.status(200).json({ result: "Saliste todo chido"})
}

exports.getUserLogged = async (req, res, next) => {
    try {
        const { _id } = req.currentUser;
        const user = await User.findById(_id);
        const newUser = clearRes(user);
        res.status(200).json({ user: newUser });
    } catch(error) {
        res.status(400).json({ errorMessage: error });
    }
}


const Product = require('../models/Product.model');
// Upload todos los mid que necesiteamos en esta ruta

exports.createProcess = (req, res, next) => {
    const product = {...req.body};

    Product.create(product)
        .then((result) => res.status(200).json({ result }))
        .catch((err) => res.status(400).json({ errorMessage: err }));
}

exports.enlistProcess = async (req, res, next) => {
    try {
        const result = await Product.find();
        res.status(200).json({result})
    } catch(err) {
        res.status(400).json({errorMessage: err})
    }
}

exports.detailProcess = async (req, res, next) => {
    try {
        const { id } =req.params;
        const result = await Product.findById(id);
        res.status(200).json({result})
    } catch(err) {
        res.status(400).json({errorMessage: err})
    }
}
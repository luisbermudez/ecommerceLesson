const Cart = require('../models/Cart.model');

exports.findCart = async (req, res, next) => {
    try {
                // llamar al _id ahora como _client
        const { _id: _client } = req.user; //currentUser
                                        // { _client: 1243wd142243 }
        const result = await Cart.findOne({_client})
        res.status(200).json({ result })
    } catch(err) {
        res.status(400).json({errorMessage: err})
    }
};

exports.createCart = async (req, res, next) => {
    try {
        const { _id: _client } = req.user;
        const changes = {...req.body};
        const items = Card.find({ _client }).count();
        const action = items > 0 ? Cart.findOneAndUpdate : Cart.create;
        const args = items > 0 ? [{_client}, changes, { new: true }] : [changes];
        const result = await action(...args);
        res.status(200).json({ result });

        // Cart.findOneAndUpdate({_client: "perro12434"}, {total: 4, images: https...}, {new:true})
        // Cart.create({total:0, perro: nova,...})
    } catch(err) {
        res.status(400).json({ errorMessage: err });
    }
}

exports.deleteCart = async (req, res, next) => {
    try {
        const { _id: _client } = req.user;
        await Cart.findOneAndDelete({ _client });
        res.status(200).json({ result: "Carrito borrado" })
    } catch(err) {
        res.status(400).json({ errorMessage: err });
    }
}
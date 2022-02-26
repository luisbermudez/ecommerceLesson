const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
    {
        total: {
            type: Number,
            required: true
        },
        _client: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        items: {
            type: [{
                product: {type: Schema.Types.ObjectId, ref: "Product"},
                quantity: Number
            }],
            min: [1, "La orden debe contener por lo menos 1 producto"]
        },
        status: {
            type: String,
            enum: ["Pendiente", "Enviado", "Entregado"],
            default: "Pendiente"
        }
    }, {timestamps: true});

module.exports = model("Oder", orderSchema);
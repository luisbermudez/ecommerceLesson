const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, "El producto debe tener titulo"]
    },
    price: {
        type: Number,
        required: [true, "El producto debe tener un precio"],
        min: [10, "El precio minimo es de 10"]
    },
    description: {
        type: String,
        required: [true, "El producto debe tener un titulo"]
    },
    images: {
        type: [String],
        min: [1, "El producto debe terner minimo una imagen"]
    },
    stock: {
        type: Number,
        min: [0, "El producto debe tener minimo"]
    }
},{timestamps: true})

module.exports = model("Product", productSchema);
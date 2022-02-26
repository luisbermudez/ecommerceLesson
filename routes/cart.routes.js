const router = require("express").Router();
const {
  findCart,
  createCart,
  deleteCart
} = require("../controllers/cart.controller");

// Traer carrito previo en caso de que se desconecte el usuario
router.get("/", findCart);

// Crear el carrito
router.post("/create", createCart);

// Borrar
router.delete("/delete", deleteCart);

// patch (editar), delete, put

module.exports = router;
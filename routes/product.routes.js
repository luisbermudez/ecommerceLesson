const router = require("express").Router();
const { 
    createProcess,
    enlistProcess,
    detailProcess 
} = require('../controllers/product.controller');
const { checkRole, verifyToken } = require("../middleware/util-mid");

// get <--- es para traer info
// post <--- es para mandar

// router.post('/create', verifyToken, checkRole("STAFF", "ADMIN"), createProcess)
router.post('/create', createProcess);

// Ruta para traer todos los productos
router.get('/', enlistProcess);

// Ruta para el detalle de un solo producto
router.get('/detail/:id', detailProcess)

module.exports= router;
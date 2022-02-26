const router = require('express').Router();
const {
    createOrderProcess,
    getOrderByIdProcess,
    getOrdersProcess
} = require("../controllers/order.controller");

router.get('/', getOrdersProcess);

router.get('/:id', getOrderByIdProcess);

router.post('/create', createOrderProcess);

module.exports = router;
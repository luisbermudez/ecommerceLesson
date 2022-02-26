const router = require("express").Router();
const authRoutes = require("./auth");
const orderRoutes = require('./order.routes');
const productRoutes = require('./product.routes');
const cartRoutes = require('./cart.routes');
// Cloudinary
const uploadCloud = require('../helpers/cloudinary');
const {uploadProcess} = require('../controllers/upload.controller');
router.post("/upload", uploadCloud.array('docs', 5), uploadProcess);

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});



router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);

module.exports = router;

const router = require("express").Router();
const { signupProcess, loginProcess, logoutProcess, getUserLogged } = require('../controllers/auth.controller');
// This is the isLoggedIn middleware
const { verifyToken } = require('../middleware/util-mid');

router.post("/signup", signupProcess);

router.post("/login", loginProcess);

router.post("/logout", logoutProcess);

router.get("/getUser", verifyToken, getUserLogged);

module.exports = router;
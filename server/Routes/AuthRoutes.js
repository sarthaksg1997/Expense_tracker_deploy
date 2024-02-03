const { register, login } = require("../Controllers/AuthControllers.js");
const { checkUser } = require("../Middlewares/AuthMiddleware.js");

const router = require("express").Router();

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);

module.exports = router;

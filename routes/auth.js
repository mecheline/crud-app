const express = require("express");
const {} = require("../controller/blog-controller");
const { Signup, Login } = require("../controller/auth-controller");
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);

module.exports = router;

const express = require("express");
const { registerUser, loginUser } = require("../controllers/userControllers");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser); //route instead of post, get, etc to chain multiply requests
module.exports = router;

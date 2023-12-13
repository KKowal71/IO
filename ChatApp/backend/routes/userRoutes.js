const express = require("express");
const {
  registerUser,
  loginUser,
  getLoggedUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getLoggedUser").post(getLoggedUser);
module.exports = router;

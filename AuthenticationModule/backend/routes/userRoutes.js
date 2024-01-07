const express = require("express");
const {
  registerUser,
  loginUser,
  getLoggedUser,
  getGreeting,
  updateUserData,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getLoggedUser").get(getLoggedUser);
router.route("/handShake").get(getGreeting);
router.route("/updateUser/:id").put(updateUserData);
module.exports = router;

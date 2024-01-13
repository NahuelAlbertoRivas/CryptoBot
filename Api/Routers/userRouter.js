// construcción de enpoints para ' signUp ', ' login ' y ' buyMembership '

const express = require("express");
const authController = require("../Controllers/authController");

const router = express.Router();

router.post("/signUp", authController.signUp);
router.post("/login", authController.login);
router.post("/buyMembership", authController.buyMembership);

module.exports = router;
const express = require("express");
const router = express.Router();
const forgotPasswordController = require("../controllers/forgotPasswordController");

router.post("/", forgotPasswordController.handleNewPassword);

module.exports = router;

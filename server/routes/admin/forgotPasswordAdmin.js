const express = require("express");
const router = express.Router();
const forgotPasswordAdminController = require("../../controllers/admin/forgotPasswordAdminController");

router.post("/", forgotPasswordAdminController.handleForgotPasswordAdmin);

module.exports = router;

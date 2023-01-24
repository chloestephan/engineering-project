const express = require("express");
const router = express.Router();
const loginAdminController = require("../../controllers/admin/loginAdminController.js");

router.post("/", loginAdminController.handleLoginAdmin);

module.exports = router;

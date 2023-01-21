const express = require("express");
const router = express.Router();
const registerAdminController = require("../../controllers/admin/registerAdminController");

router.post("/", registerAdminController.handleRegisterAdmin);

module.exports = router;

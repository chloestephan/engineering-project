const express = require("express");
const router = express.Router();
const sendLink = require("../../controllers/customer/sendLinkController");

router.post("/", sendLink.handleSendLink);

module.exports = router;

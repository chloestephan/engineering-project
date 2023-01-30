const express = require("express");
const router = express.Router();
const checkCustomerLink = require("../../controllers/customer/checkCustomerLinkController.js");

router.post("/", checkCustomerLink.handleCheckCustomerLink);

module.exports = router;

const express = require("express");
const router = express.Router();
const loginCustomerController = require("../../controllers/customer/loginCustomerController.js");

router.post("/", loginCustomerController.handleLoginCustomer);

module.exports = router;

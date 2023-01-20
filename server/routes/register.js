const express = require("express");
const router = express.Router();
const registerCustomerController = require("../controllers/registerCustomerController");

router.post("/", registerCustomerController.handleNewCustomer);

module.exports = router;

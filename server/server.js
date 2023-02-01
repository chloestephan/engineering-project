const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const app = express();
const port = 5000;
const cors = require("cors");
const db = require("./config/dbConn");
require("dotenv").config();

const client = db.connectDB();

app.use(cors());
app.use(express.json());

app.use("/register-customer", require("./routes/customer/registerCustomer"));
app.use("/login-customer", require("./routes/customer/loginCustomer"));
app.use("/forgot-password-customer", require("./routes/customer/forgotPasswordCustomer"));

app.use("/register-admin", require("./routes/admin/registerAdmin"));
app.use("/login-admin", require("./routes/admin/loginAdmin"));
app.use("/forgot-password-admin", require("./routes/admin/forgotPasswordAdmin"));

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log("Server running on port 5000"));
}

module.exports = { app };

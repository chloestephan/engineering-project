const bcrypt = require("bcrypt");
const db = require("../../config/dbConn");
const { isCustomerRegisteredWith } = require("../../utils/customersUtils");

const client = db.getClient();

const handleRegisterCustomer = async (req, res) => {
  const { username, email, company } = req.body;

  if (!username || !email || !company) {
    res.status(401).send("Missing information");
    return;
  }

  const isCustomerRegistered =
    (await isCustomerRegisteredWith(email, "email")) || (await isCustomerRegisteredWith(company, "company"));
  if (isCustomerRegistered) {
    res.status(409).send("User already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const query = {
    text: "INSERT INTO customers (username, email, password, company) VALUES ($1, $2, $3, $4)",
    values: [username, email, hashedPassword, company],
  };
  await client.query(query);
  res.status(200).send("User registered");
};

module.exports = { handleRegisterCustomer };

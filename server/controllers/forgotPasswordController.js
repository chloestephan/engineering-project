const { isCustomerRegisteredWith, generatePassword } = require("../utils/customersUtils");
const { sendEmail } = require("../utils/nodemailerUtils");
const bcrypt = require("bcrypt");
const db = require("../config/dbConn");
const client = db.getClient();

const handleNewPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(401).send("Missing information");
    return;
  }

  if (!await isCustomerRegisteredWith(email, "email")) {
    res.status(401).send("Wrong information");
    return;
  }

  const newPassword = generatePassword();
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const query = {
    text: "UPDATE customers SET password = $1 WHERE email = $2",
    values: [hashedPassword, email],
  };
  await client.query(query);

  const body =
    "Hello Mrs./Ms.,\n\n" +
    `Following your request for a forgotten password, we have generated this new password for your account: ${newPassword}\n\n` +
    "Sincerely, the entire engineering project team.";

  sendEmail(email, "New password generated", body);

  res.status(200).send({ message: "Password updated" });
};

module.exports = { handleNewPassword };

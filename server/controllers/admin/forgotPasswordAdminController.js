const { getAdminByEmail } = require("../../utils/adminsUtils");
const { sendEmail, generatePassword } = require("../../utils/sendEmailUtils");
const bcrypt = require("bcrypt");
const db = require("../../config/dbConn");
const client = db.getClient();

const handleForgotPasswordAdmin = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(401).send("Missing information");
    return;
  }

  const resultRequest = await getAdminByEmail(email);
  if (resultRequest.rows.length === 0) {
    res.status(401).send("Wrong information");
    return;
  }

  const newPassword = generatePassword();
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const query = {
    text: "UPDATE admins SET password = $1 WHERE email = $2",
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

module.exports = { handleForgotPasswordAdmin };

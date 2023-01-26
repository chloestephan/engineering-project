const db = require("../config/dbConn");
const bcrypt = require("bcrypt");
const client = db.getClient();

async function getAdminByEmail(email) {
  const query = {
    text: "SELECT * FROM admins WHERE email = $1",
    values: [email],
  };
  const result = await client.query(query);
  if (result.rowCount === 0) return undefined;
  return result.rows[0];
}

async function createAdmin(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = {
    text: "INSERT INTO admins (username, email, password) VALUES ($1, $2, $3)",
    values: [username, email, hashedPassword],
  };
  await client.query(query);
}

async function updateAdminpassword(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = {
    text: "UPDATE admins SET password = $1 WHERE email = $2",
    values: [hashedPassword, email],
  };
  await client.query(query);
}

module.exports = {
  getAdminByEmail,
  createAdmin,
  updateAdminpassword,
};

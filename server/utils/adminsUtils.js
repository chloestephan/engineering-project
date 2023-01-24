const db = require("../config/dbConn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

module.exports = {
  getAdminByEmail,
};

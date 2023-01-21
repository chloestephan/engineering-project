const db = require("../config/dbConn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = db.getClient();

async function getAdminByEmail(email) {
  const query = {
    text: "SELECT * FROM admins WHERE email = $1",
    values: [email],
  };
  return await client.query(query);
}

async function isPasswordCorrect(password, hash) {
  return await bcrypt.compare(password, hash);
}

function generateToken(user, tokenType) {
  return jwt.sign(
    {
      email: user.email,
      username: user.username,
    },
    tokenType === "access" ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: tokenType === "access" ? "1h" : "24h",
    }
  );
}

module.exports = {
  getAdminByEmail,
  isPasswordCorrect,
  generateToken,
};

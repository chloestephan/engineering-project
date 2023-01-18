const db = require("../config/dbConn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = db.getClient();

async function getCustomerByEmail(email) {
  const query = {
    text: "SELECT * FROM customers WHERE email = $1",
    values: [email],
  };
  return await client.query(query);
}

async function getCustomerByCompany(company) {
  const query = {
    text: "SELECT * FROM customers WHERE company = $1",
    values: [company],
  };
  return await client.query(query);
}

async function isCustomerRegisteredWith(infomation, type) {
  const row =
    type === "email" ? await getCustomerByEmail(infomation) : await getCustomerByCompany(infomation);
  return row.rowCount > 0;
}

async function isPasswordCorrect(password, hash) {
  return await bcrypt.compare(password, hash);
}

function generateToken(user, tokenType) {
  return jwt.sign(
    {
      email: user.email,
      username: user.username,
      company: user.company,
    },
    tokenType === "access" ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: tokenType === "access" ? "1h" : "24h",
    }
  );
}

module.exports = {
  isCustomerRegisteredWith,
  getCustomerByEmail,
  getCustomerByCompany,
  isPasswordCorrect,
  generateToken,
};

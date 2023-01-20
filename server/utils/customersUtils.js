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

function generatePassword() {
  let password = "";
  const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  const length = 15 + Math.floor(Math.random() * 10);
  for (i = 1; i <= length; i++) {
    const char = Math.floor(Math.random() * str.length + 1);
    password += str.charAt(char);
  }
  return password;
}

module.exports = {
  isCustomerRegisteredWith,
  getCustomerByEmail,
  getCustomerByCompany,
  isPasswordCorrect,
  generateToken,
  generatePassword,
};

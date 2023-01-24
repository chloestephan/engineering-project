const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

function generatePassword() {
  if (process.env.NODE_ENV === "test") {
    return process.env.USER_TEST_PASSWORD;
  }

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
  isPasswordCorrect,
  generateToken,
  generatePassword,
};

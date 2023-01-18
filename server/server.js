const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const app = express();
const port = 5000;
const cors = require("cors");
const { Client } = require("pg");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config()

const client = new Client({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
});

app.use(cors());

// UTILS

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
  const row = type === "email" ? await getCustomerByEmail(infomation) : await getCustomerByCompany(infomation);
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

// Register a user
app.post("/register", jsonParser, async (req, res) => {
  const { username, email, password, company } = req.body;

  if (!username || !email || !password || !company) {
    res.status(400).send("Missing information");
    return;
  }

  const isCustomerRegistered = await isCustomerRegisteredWith(email, "email") || await isCustomerRegisteredWith(company, "company");
  if (isCustomerRegistered) {
    res.status(409).send("User already exists");
    return;
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = {
    text: "INSERT INTO customers (username, email, password, company) VALUES ($1, $2, $3, $4)",
    values: [username, email, hashedPassword, company],
  }
  await client.query(query);
  res.status(200).send("User registered");
});

// Login a user
app.post("/login", jsonParser, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Missing information");
    return;
  }

  if (!await isCustomerRegisteredWith(email, "email")) {
    res.status(400).send("Wrong information");
    return;
  }
  
  const resultRequest = await getCustomerByEmail(email);
  const user = resultRequest.rows[0];
  if(!await isPasswordCorrect(password, user.password)) {
    res.status(400).send("Wrong information");
    return;
  }
  
  const accessToken = generateToken(user, "access")
  const refreshToken = generateToken(user, "refresh")

  // TODO Store refresh token in database
  
  res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, sameSite: "none" });
  // TODO Add a role to the user (Admin, User, etc.)
  res.status(200).send({ message: "User logged in", accessToken: accessToken });
});

app.listen(port, () => console.log("Server running on port 5000"));

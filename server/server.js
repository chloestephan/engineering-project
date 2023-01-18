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

// Register a user
app.post("/register", jsonParser, (req, res) => {
  // TODO Check if email already exists
  // If exists
  // res.status(409).send('User already exists');
  // TODO Check if company already exists ?
  // If exists
  // res.status(409).send('Company already exists');
  // TODO Hash password
  // TODO Store user in database
  // If success
  res.status(200).send("User registered");
});

// Login a user
app.post("/login", jsonParser, (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Missing information");
  }

  // TODO Check if user exists with email
  // If not exists or wrong password
  // res.status(404).send('Wrong information');
  // If exists check bcrypt password
  // If wrong password
  // res.status(404).send('Wrong information');
  // If success
  const accessToken = jwt.sign(
    {
      email: email,
      // TODO add more information from database (company, username, etc.)
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
  const refreshToken = jwt.sign(
    {
      email: email,
      // TODO add more information from database (company, username, etc.)
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "24h",
    }
  );
  // TODO Store refresh token in database
  
  res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, sameSite: "none" });
  // TODO Add a role to the user (Admin, User, etc.)
  res.status(200).send({ message: "User logged in", accessToken: accessToken });
});

app.listen(port, () => console.log("Server running on port 5000"));

const express = require('express');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const app = express();
const port = 5000;
const cors = require('cors');
const {Client} = require("pg");

const client = new Client({
  password : "root",
  user : "root",
  host : "postgres"
});

app.use(cors());

app.post('/register', jsonParser,(req, res) => {
  // TODO Check if email already exists
  // If exists
  // res.status(409).send('User already exists');
  // TODO Check if company already exists ?
  // If exists
  // res.status(409).send('Company already exists');
  // TODO Hash password
  // TODO Store user in database
  // If success
  res.status(200).send('User registered');
});

app.listen(port, () => console.log('Server running on port 5000'));

/* Added code to link backend to docker container

(async () => {
  await client.connect();

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();*/
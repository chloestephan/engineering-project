const { Client } = require("pg");

let client;

const connectDB = () => {
  client = new Client({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  });

  client.connect((err) => {
    if (err) {
      console.error("connection error", err.stack);
    } else {
      console.log("connected");
    }
  });

  return client;
};

const getClient = () => client;

module.exports = {
  connectDB,
  getClient,
};

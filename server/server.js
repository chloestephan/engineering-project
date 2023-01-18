const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const app = express();
const port = 5000;
const cors = require("cors");
const db = require("./config/dbConn");
require("dotenv").config();

const client = db.connectDB();

app.use(cors());
app.use(express.json());

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));

app.listen(port, () => console.log("Server running on port 5000"));

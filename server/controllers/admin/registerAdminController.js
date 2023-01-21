const bcrypt = require("bcrypt");
const db = require("../../config/dbConn");
const { getAdminByEmail } = require("../../utils/adminsUtils");

const client = db.getClient();

const handleRegisterAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(401).send("Informations manquantes");
    return;
  }

  const resultRequest = await getAdminByEmail(email);
  if (resultRequest.rows.length > 0) {
    res.status(401).send("Utilisateur déjà enregistré");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const query = {
    text: "INSERT INTO admins (username, email, password) VALUES ($1, $2, $3)",
    values: [username, email, hashedPassword],
  };
  await client.query(query);
  res.status(200).send("Utilisateur enregistré");
};

module.exports = { handleRegisterAdmin };

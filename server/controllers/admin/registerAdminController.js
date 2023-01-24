const bcrypt = require("bcrypt");
const db = require("../../config/dbConn");
const { getAdminByEmail } = require("../../utils/adminsUtils");

const client = db.getClient();

const handleRegisterAdmin = async (req, res) => {
  const { username, password } = req.body;
  const email = req.body.email.toLowerCase();

  if (!username || !email || !password) {
    res.status(401).send("Informations manquantes");
    return;
  }

  const admin = await getAdminByEmail(email);
  console.log(admin)
  if (admin) {
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

const { getAdminByEmail, createAdmin } = require("../../utils/adminsUtils");

const handleRegisterAdmin = async (req, res) => {
  const { username, password } = req.body;
  const email = req.body.email.toLowerCase();

  if (!username || !email || !password) {
    res.status(401).send({ message: "Informations manquantes" });
    return;
  }

  const admin = await getAdminByEmail(email);
  if (admin) {
    res.status(401).send({ message: "Utilisateur déjà enregistré" });
    return;
  }

  await createAdmin(username, email, password);
  
  res.status(200).send({ message: "Utilisateur enregistré" });
};

module.exports = { handleRegisterAdmin };

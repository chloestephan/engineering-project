const bcrypt = require("bcrypt");
const db = require("../../config/dbConn");
const {
  isCustomerRegisteredWith,
  generatePassword,
  generateLinkToForm,
} = require("../../utils/customersUtils");
const { sendEmail } = require("../../utils/sendEmailUtils");

const client = db.getClient();

const handleRegisterCustomer = async (req, res) => {
  const { username, email, company } = req.body;

  if (!username || !email || !company) {
    res.status(401).send("Informations manquantes");
    return;
  }

  const isCustomerRegistered =
    (await isCustomerRegisteredWith(email, "email")) || (await isCustomerRegisteredWith(company, "company"));
  if (isCustomerRegistered) {
    res.status(409).send("Utilisateur déjà enregistré");
    return;
  }

  const password = generatePassword();

  const hashedPassword = await bcrypt.hash(password, 10);
  const query = {
    text: "INSERT INTO customers (username, email, password, company) VALUES ($1, $2, $3, $4)",
    values: [username, email, hashedPassword, company],
  };

  const linkToForm = generateLinkToForm();

  const title = "Bienvenue sur notre plateforme";
  const body =
    `Bonjour Mme/M ${username},\n\n` +
    `Bienvenue sur notre plateforme. Veuillez cliquer sur le lien suivant pour accéder à votre formulaire : ${linkToForm}\n\n` +
    `Votre mot de passe est: ${password}\n\n` +
    `Sincèrement, toute l'équipe de l'engineering project.`;

  sendEmail(email, title, body);

  await client.query(query);
  res.status(200).send("Utilisateur enregistré");
};

module.exports = { handleRegisterCustomer };

const { getAdminByEmail } = require("../../utils/adminsUtils");
const { isPasswordCorrect, generateToken } = require("../../utils/usersUtils");

const handleLoginAdmin = async (req, res) => {
  const { password } = req.body;
  let email = req.body.email;

  if (!email || !password) {
    res.status(401).send({ message: "Informations manquantes" });
    return;
  }
  email = email.toLowerCase();

  const admin = await getAdminByEmail(email);
  if (!admin) {
    res.status(401).send({ message: "Informations incorrectes" });
    return;
  }

  if (!(await isPasswordCorrect(password, admin.password))) {
    res.status(401).send({ message: "Informations incorrectes" });
    return;
  }

  const accessToken = generateToken(admin, "access");
  const refreshToken = generateToken(admin, "refresh");

  // TODO Store refresh token in database

  res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, sameSite: "none" });
  // TODO Add a role to the user (Admin, User, etc.)
  res.status(200).send({ message: "Utilisateur connecté", accessToken: accessToken });
};

module.exports = { handleLoginAdmin };

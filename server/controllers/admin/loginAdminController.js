const { getAdminByEmail, isPasswordCorrect, generateToken } = require("../../utils/adminsUtils");

const handleLoginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).send("Informations manquantes");
    return;
  }

  const resultRequest = await getAdminByEmail(email);
  if (resultRequest.rows.length === 0) {
    res.status(401).send("Informations incorrectes");
    return;
  }

  const user = resultRequest.rows[0];
  if (!(await isPasswordCorrect(password, user.password))) {
    res.status(401).send("Informations incorrectes");
    return;
  }

  const accessToken = generateToken(user, "access");
  const refreshToken = generateToken(user, "refresh");

  // TODO Store refresh token in database

  res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, sameSite: "none" });
  // TODO Add a role to the user (Admin, User, etc.)
  res.status(200).send({ message: "Utilisateur connecté", accessToken: accessToken });
};

module.exports = { handleLoginAdmin };

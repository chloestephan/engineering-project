const db = require("../config/dbConn");
const { v4: uuidv4 } = require("uuid");
const client = db.getClient();

async function getCustomerByEmail(email) {
  const query = {
    text: "SELECT * FROM customers WHERE email = $1",
    values: [email],
  };
  const result = await client.query(query);
  if (result.rowCount === 0) return undefined;
  return result.rows[0];
}

async function getCustomerByCompany(company) {
  const query = {
    text: "SELECT * FROM customers WHERE company = $1",
    values: [company],
  };
  const result = await client.query(query);
  if (result.rowCount === 0) return undefined;
  return result.rows[0];
}

async function isCustomerRegisteredWith(infomation, type) {
  const customer =
    type === "email" ? await getCustomerByEmail(infomation) : await getCustomerByCompany(infomation);
  return customer ? true : false;
}

function generateLinkToForm() {
  return process.env.BASE_URL + "/fill-form/" + uuidv4();
}

module.exports = {
  isCustomerRegisteredWith,
  getCustomerByEmail,
  getCustomerByCompany,
  generateLinkToForm,
};

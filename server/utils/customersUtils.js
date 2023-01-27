const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const db = require("../config/dbConn");
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
  if (process.env.NODE_ENV === "test") {
    return process.env.CUSTOMER_TEST_LINK_FORM;
  }
  return process.env.BASE_URL + "/login-customer/" + uuidv4();
}

async function createCustomer(username, company, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = {
    text: "INSERT INTO customers (username, email, password, company) VALUES ($1, $2, $3, $4)",
    values: [username, email, hashedPassword, company],
  };
  await client.query(query);
}

async function createLinkToForm(linkToForm, email) {
  const customer = await getCustomerByEmail(email);
  query = {
    text: "INSERT INTO linksform (url, customerId) VALUES ($1, $2)",
    values: [linkToForm, customer.id],
  };
  await client.query(query);
}

async function updateCustomerPassword(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = {
    text: "UPDATE customers SET password = $1 WHERE email = $2",
    values: [hashedPassword, email],
  };
  await client.query(query);
}

async function isCustomerLinkToUrl(linkToForm, customerId) {
  const query = {
    text: "SELECT * FROM linksform WHERE url = $1 AND customerId = $2",
    values: [linkToForm, customerId],
  };
  const result = await client.query(query);
  return result.rowCount === 0 ? false : true;
}

module.exports = {
  isCustomerRegisteredWith,
  getCustomerByEmail,
  getCustomerByCompany,
  generateLinkToForm,
  createCustomer,
  createLinkToForm,
  updateCustomerPassword,
  isCustomerLinkToUrl,
};

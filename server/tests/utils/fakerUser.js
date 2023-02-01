const { faker } = require("@faker-js/faker");
require("dotenv").config();

function createRandomCustomer() {
  return {
    username: faker.name.firstName(),
    email: faker.internet.email("Jeanne", "Doe", "example.fakerjs.dev", { allowSpecialCharacters: true }),
    company: faker.company.name(),
    password: process.env.USER_TEST_PASSWORD,
    loginLink: process.env.CUSTOMER_TEST_LINK_FORM,
  };
}

function createCustomersWithSame(type) {
  const customer = createRandomCustomer();
  const customerWithSame = createRandomCustomer();
  customerWithSame[type] = customer[type];
  return [customer, customerWithSame];
}

function createRandomAdmin() {
  return {
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: process.env.USER_TEST_PASSWORD,
  };
}

module.exports = {
  createRandomCustomer,
  createCustomersWithSame,
  createRandomAdmin,
};

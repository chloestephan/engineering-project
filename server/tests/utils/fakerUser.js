const { faker } = require("@faker-js/faker");

function createRandomCustomer() {
  return {
    username: faker.name.firstName(),
    email: faker.internet.email(),
    company: faker.company.name(),
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
    password: faker.internet.password(),
  };
}

module.exports = {
  createRandomCustomer,
  createCustomersWithSame,
  createRandomAdmin,
};

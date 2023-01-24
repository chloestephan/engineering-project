const superTest = require("supertest");
const { app, server } = require("../server");
const { isCustomerRegisteredWith, getCustomerByEmail } = require("../utils/customersUtils");
const request = superTest(app);
const { cleanUpDatabase } = require("./utils/database");
const { createRandomCustomer, createCustomersWithSame } = require("./utils/fakerUser");
require("dotenv").config();

describe("Customer Registration", () => {
  afterEach(async () => {
    await cleanUpDatabase();
  });

  afterAll(async () => {
    await server.close();
  });

  it("should register a new customer", async () => {
    const customer = createRandomCustomer();
    await request
      .post("/register-customer")
      .send(customer)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toEqual("Utilisateur enregistré");
      });
    expect(isCustomerRegisteredWith(customer, "email")).toBeTruthy();
    expect(isCustomerRegisteredWith(customer, "company")).toBeTruthy();
  });

  it("should not register a new customer with an existing email", async () => {
    const customers = createCustomersWithSame("email");
    await request.post("/register-customer").send(customers[0]);
    await request
      .post("/register-customer")
      .send(customers[1])
      .expect(409)
      .then((response) => {
        expect(response.body.message).toEqual("Utilisateur déjà enregistré");
      });
  });

  it("should not register a new customer with an existing company", async () => {
    const customers = createCustomersWithSame("company");
    await request.post("/register-customer").send(customers[0]);
    await request
      .post("/register-customer")
      .send(customers[1])
      .expect(409)
      .then((response) => {
        expect(response.body.message).toEqual("Utilisateur déjà enregistré");
      });
  });

  it("should not register a new customer with missing informations", async () => {
    const customer = createRandomCustomer();
    await request
      .post("/register-customer")
      .send({ ...customer, username: undefined })
      .expect(401)
      .then((response) => {
        expect(response.body.message).toEqual("Informations manquantes");
      });
    await request
      .post("/register-customer")
      .send({ ...customer, email: undefined })
      .expect(401)
      .then((response) => {
        expect(response.body.message).toEqual("Informations manquantes");
      });
    await request
      .post("/register-customer")
      .send({ ...customer, company: undefined })
      .expect(401)
      .then((response) => {
        expect(response.body.message).toEqual("Informations manquantes");
      });
  });

  it("should register email in lower case", async () => {
    const customer = createRandomCustomer();
    await request.post("/register-customer").send({ ...customer, email: customer.email.toUpperCase() });
    expect(isCustomerRegisteredWith(customer.email.toLowerCase(), "email")).toBeTruthy();
  });
});

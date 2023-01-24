const superTest = require("supertest");
const { app } = require("../server");
const { isCustomerRegisteredWith } = require("../utils/customersUtils");
const request = superTest(app);
const { createRandomCustomer, createCustomersWithSame } = require("./utils/fakerUser");
require("dotenv").config();

describe("Customer Registration", () => {
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

describe("Customer Login", () => {
  it("should login a customer", async () => {
    const customer = createRandomCustomer();
    await request.post("/register-customer").send(customer);
    await request
      .post("/login-customer")
      .send({ email: customer.email, password: process.env.TEST_PASSWORD })
      .expect(200)
      .then((response) => {
        expect(response.body.message).toEqual("Utilisateur connecté");
      });
  });

  it("should not login a customer with missing informations", async () => {
    const customer = createRandomCustomer();
    await request
      .post("/login-customer")
      .send({ ...customer, email: undefined })
      .expect(401)
      .then((response) => {
        expect(response.body.message).toEqual("Informations manquantes");
      });
    await request
      .post("/login-customer")
      .send({ ...customer, password: undefined })
      .expect(401)
      .then((response) => {
        expect(response.body.message).toEqual("Informations manquantes");
      });
  });

  it("should not login a customer with wrong informations", async () => {
    const customer = createRandomCustomer();
    await request
      .post("/login-customer")
      .send({ ...customer, email: "wrongEmail" })
      .expect(401)
      .then((response) => {
        expect(response.body.message).toEqual("Informations incorrectes");
      });
    await request
      .post("/login-customer")
      .send({ ...customer, password: "wrongPassword" })
      .expect(401)
      .then((response) => {
        expect(response.body.message).toEqual("Informations incorrectes");
      });
  });
});

describe("Customer Forgot Password", () => {
  it("should send a reset password email", async () => {
    const customer = createRandomCustomer();
    await request.post("/register-customer").send(customer);
    await request
      .post("/forgot-password-customer")
      .send({ email: customer.email })
      .expect(200)
      .then((response) => {
        expect(response.body.message).toEqual("Mot de passe mis à jour");
      });
  });

  it("should allow to connect with the new password", async () => {
    const customer = createRandomCustomer();
    await request.post("/register-customer").send(customer);
    await request.post("/forgot-password-customer").send({ email: customer.email });
    await request
      .post("/login-customer")
      .send({ email: customer.email, password: process.env.TEST_PASSWORD })
      .expect(200)
      .then((response) => {
        expect(response.body.message).toEqual("Utilisateur connecté");
      });
  });

  it("should not send a reset password email with missing informations", async () => {
    const customer = createRandomCustomer();
    await request
      .post("/forgot-password-customer")
      .send({ ...customer, email: undefined })
      .expect(401)
      .then((response) => {
        expect(response.body.message).toEqual("Informations manquantes");
      });
  });

  it("should not send a reset password email with wrong informations", async () => {
    const customer = createRandomCustomer();
    await request
      .post("/forgot-password-customer")
      .send({ ...customer, email: "wrongEmail" })
      .expect(401)
      .then((response) => {
        expect(response.body.message).toEqual("Informations incorrectes");
      });
  });
});

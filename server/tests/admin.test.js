const superTest = require("supertest");
const { app } = require("../server");
const request = superTest(app);
const { getAdminByEmail } = require("../utils/adminsUtils");
const { createRandomAdmin } = require("./utils/fakerUser");
require("dotenv").config();

describe("Admin Registration", () => {
  it("should register a new admin", async () => {
    const admin = createRandomAdmin();
    await request
      .post("/register-admin")
      .send(admin)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toEqual("Utilisateur enregistré");
      });
    expect(getAdminByEmail(admin.email)).toBeTruthy();
  });

  it("should not register a new admin with an existing email", async () => {
    const admin = createRandomAdmin();
    await request.post("/register-admin").send(admin);
    await request
      .post("/register-admin")
      .send(admin)
      .expect(409)
      .then((response) => {
        expect(response.body.message).toEqual("Utilisateur déjà enregistré");
      });
  });

  it("should not register a new admin with missing informations", async () => {
    const admin = createRandomAdmin();
    await request.post("/register-admin").send({ ...admin, email: undefined }).expect(401).then((response) => {
      expect(response.body.message).toEqual("Informations manquantes");
    });
    await request.post("/register-admin").send({ ...admin, username: undefined }).expect(401).then((response) => {
      expect(response.body.message).toEqual("Informations manquantes");
    });
    await request.post("/register-admin").send({ ...admin, password: undefined }).expect(401).then((response) => {
      expect(response.body.message).toEqual("Informations manquantes");
    });
  });

  it("should register email in lowercase", async () => {
    const admin = createRandomAdmin();
    await request.post("/register-admin").send({ ...admin, email: admin.email.toUpperCase() });
    expect(getAdminByEmail(admin.email.toLowerCase())).toBeTruthy();
  });
});

describe("Admin Login", () => {
  it("should login a admin", async () => {
    const admin = createRandomAdmin();
    await request.post("/register-admin").send(admin);
    await request
      .post("/login-admin")
      .send(admin)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toEqual("Utilisateur connecté");
      });
  });

  it("should not login a admin with missing informations", async () => {
    const admin = createRandomAdmin();
    await request
      .post("/login-admin")
      .send({ ...admin, email: undefined })
      .expect(401)
      .then((response) => {
        expect(response.body.message).toEqual("Informations manquantes");
      });
    await request
      .post("/login-admin")
      .send({ ...admin, password: undefined })
      .expect(401)
      .then((response) => {
        expect(response.body.message).toEqual("Informations manquantes");
      });
  });

  it("should not login a admin with wrong informations", async () => {
    const admin = createRandomAdmin();
    await request
      .post("/login-admin")
      .send({ ...admin, email: "wrongEmail" })
      .expect(401)
      .then((response) => {
        expect(response.body.message).toEqual("Informations incorrectes");
      });
    await request
      .post("/login-admin")
      .send({ ...admin, password: "wrongPassword" })
      .expect(401)
      .then((response) => {
        expect(response.body.message).toEqual("Informations incorrectes");
      });
  });
});

describe("Admin Forgot Password", () => {
  it("should send a reset password email", async () => {
    const admin = createRandomAdmin();
    await request.post("/register-admin").send(admin);
    await request
      .post("/forgot-password-admin")
      .send(admin)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toEqual("Mot de passe mis à jour");
      });
  });

  it("should allow to connect with the new password", async () => {
    const admin = createRandomAdmin();
    await request.post("/register-admin").send(admin);
    await request.post("/forgot-password-admin").send({ email: admin.email });
    await request
      .post("/login-admin")
      .send(admin)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toEqual("Utilisateur connecté");
      });
  });

  it("should not send a reset password email with missing informations", async () => {
    const admin = createRandomAdmin();
    await request
      .post("/forgot-password-admin")
      .send({ ...admin, email: undefined })
      .expect(401)
      .then((response) => {
        expect(response.body.message).toEqual("Informations manquantes");
      });
  });

  it("should not send a reset password email with wrong informations", async () => {
    const admin = createRandomAdmin();
    await request
      .post("/forgot-password-admin")
      .send({ ...admin, email: "wrongEmail" })
      .expect(401)
      .then((response) => {
        expect(response.body.message).toEqual("Informations incorrectes");
      });
  });
});
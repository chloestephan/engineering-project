const client = require("../../config/dbConn").getClient();

function cleanUpDatabase() {
  let request =
    "DELETE FROM linksform WHERE 1=1; DELETE FROM customers WHERE 1=1; DELETE FROM admins WHERE 1=1;";
  client.query(request);
}

module.exports = { cleanUpDatabase };

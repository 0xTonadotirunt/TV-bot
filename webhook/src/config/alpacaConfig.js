const Alpaca = require("@alpacahq/alpaca-trade-api");

/* The code is creating a new instance of the Alpaca class from the "@alpacahq/alpaca-trade-api"
package. The constructor of the Alpaca class takes an object as an argument with three properties:
keyId, secretKey, and paper. */
const alpaca = new Alpaca({
  keyId: process.env.ALPACA_KEY_ID,
  secretKey: process.env.ALPACA_SECRET_KEY,
  paper: process.env.PAPER,
});

module.exports = { alpaca };

const { alpaca } = require("../config/alpacaConfig.js");

/**
 * The function `checkIfOrderExists` checks if a position exists using the Alpaca API.
 * @returns The function `checkIfOrderExists` returns the positions if they exist, otherwise it returns
 * `false`.
 */
const checkIfOrderExists = async () => {
  if (alpaca !== null) {
    try {
      const pos = await alpaca.getPositions();

      if (pos !== null) {
        return pos;
      }

      return false;
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = { checkIfOrderExists };

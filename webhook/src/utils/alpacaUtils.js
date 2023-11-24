const { alpaca } = require("../config/alpacaConfig.js");

/**
 * The function `createShortOrder` is an asynchronous function in JavaScript that creates a short order
 * for a given symbol and quantity using the Alpaca API.
 * @param symbol - The symbol parameter represents the stock symbol or ticker symbol of the security
 * you want to trade. For example, "AAPL" for Apple Inc. or "GOOGL" for Alphabet Inc.
 * @param qty - The `qty` parameter represents the quantity of the order to be placed. It can be a
 * specific number representing the quantity of shares to sell, or it can be the string "all" to close
 * the entire position for the given symbol.
 * @returns the order object that is created by the Alpaca API.
 */
async function createShortOrder(symbol, qty) {
  if (alpaca !== null) {
    try {
      if (qty === "all") {
        pos = await alpaca.closePosition(symbol);
        console.log(
          `Exit Long : Successfully submitted closing position for ${symbol} qty: ${pos.qty}`
        );
        return;
      }
      await alpaca
        .createOrder({
          symbol: symbol,
          qty: qty,
          side: "sell",
          type: "market",
          time_in_force: "day",
        })
        .then((order) => {
          console.log(order);
          return order;
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }
}

/**
 * The function `createLongOrder` is an asynchronous function that creates a market order to buy a
 * specified quantity of a given symbol, or closes the position if the quantity is set to "all".
 * @param symbol - The symbol parameter represents the trading symbol of the security or stock that you
 * want to place an order for. For example, "AAPL" represents Apple Inc.
 * @param qty - The `qty` parameter represents the quantity or number of shares you want to buy or
 * sell. It can be a specific number or the string "all" to indicate that you want to close your entire
 * position for the given symbol.
 * @returns the order object that is created by the Alpaca API.
 */
async function createLongOrder(symbol, qty) {
  // if (qty == 0) {
  //   qty = Math.floor(amt / (await alpaca.getLatestQuote(symbol)).askprice);

  // }

  if (alpaca !== null) {
    try {
      if (qty === "all") {
        pos = await alpaca.closePosition(symbol);
        console.log(
          `Exit Short : Successfully submitted closing position for ${symbol} qty: ${pos.qty}`
        );
        return;
      }
      await alpaca
        .createOrder({
          symbol: symbol,
          qty: qty,
          side: "buy",
          type: "market",
          time_in_force: "day",
        })
        .then((order) => {
          console.log(order);

          return order;
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }
}

/**
 * The function `accountExistInAlpaca` checks if an account exists in the Alpaca environment and
 * returns a response with a code and message indicating the result.
 * @param account_key - The `account_key` parameter is a string that represents the account number or
 * key that you want to check if it exists in the Alpaca environment.
 * @returns The function `accountExistInAlpaca` returns a promise that resolves to an object with
 * properties `code` and `message`. The `code` property represents the status code of the response, and
 * the `message` property provides additional information about the response.
 */
async function accountExistInAlpaca(account_key) {
  let response;
  try {
    const account = await alpaca.getAccount();

    if (account.account_number.toLowerCase() === account_key.toLowerCase()) {
      response = {
        code: 200,
        message: "Account is valid",
      };
      return response;
    }

    response = {
      code: 404,
      message: "Account not set up in alpaca environment",
    };

    return response;
  } catch (err) {
    console.log(err);
    response = {
      code: 500,
      message: err,
    };
    return response;
  }
}

module.exports = { createShortOrder, createLongOrder, accountExistInAlpaca };

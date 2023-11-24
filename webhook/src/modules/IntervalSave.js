const { alpaca } = require("../config/alpacaConfig");
const { updatedb } = require("../services/updatedb");

/**
 * The function `getAccount` retrieves the account information from the Alpaca API.
 * @returns The `getAccount` function is returning the `account` object.
 */
async function getAccount() {
  const account = await alpaca.getAccount();

  return account;
}

/**
 * The function `getInformation` retrieves account information and returns it in a payload object.
 * @returns a payload object that contains the details of the account, such as cash, portfolio value,
 * equity, currency, balance date, user configuration, and buying power. It also includes the account
 * key.
 */
async function getInformation() {
  const account = await getAccount();
  const cash = account.cash;
  const portfolio_value = account.portfolio_value;
  const equity = account.equity;
  const account_number = account.account_number;
  const currency = account.currency;
  const balance_date = account.balance_asof;
  const user_config = account.admin_configurations;
  const buying_power = account.buying_power;

  const payload = {
    details: {
      cash: cash,
      portfolio_value: portfolio_value,
      equity: equity,

      currency: currency,
      balance_date: balance_date,
      user_config: user_config,
      buying_power: buying_power,
    },

    accountkey: account_number,
  };

  console.log("getting information ...");

  return payload;
}

/**
 * The function `Positions` logs a message and then retrieves positions using the `alpaca` object,
 * returning an array of positions.
 * @returns The function `Positions()` is returning an array of positions.
 */
async function Positions() {
  console.log("getting positions ...");
  const positions = await alpaca.getPositions();

  return positions;
  //   returns array
}

/**
 * The function `PortfolioHistory` retrieves the portfolio history for a given period and whether to
 * include extended hours data.
 * @param [period=all] - The "period" parameter specifies the time period for which you want to
 * retrieve the portfolio history. It can have the following values:
 * @param [extended_hours=true] - The `extended_hours` parameter is a boolean value that determines
 * whether to include extended hours data in the portfolio history. If set to `true`, extended hours
 * data will be included. If set to `false`, only regular trading hours data will be included.
 * @returns the portfolio history, which is an object containing information about the portfolio's
 * performance over a specified period of time.
 */
async function PortfolioHistory(period = "all", extended_hours = true) {
  console.log("getting history ...");
  const history = await alpaca.getPortfolioHistory({
    // period: "all",
    // extended_hours: true,

    period: period,
    extended_hours: extended_hours,
  });

  return history;
  //   returns object
}

/**
 * The `agg` function aggregates information, positions, and portfolio history for a given period and
 * with extended hours trading.
 * @param [period=all] - The "period" parameter is used to specify the time period for which you want
 * to retrieve portfolio history. It has a default value of "all", which means it will retrieve the
 * entire history. However, you can also specify other values such as "1d" for the last day, "1
 * @param [extended_hours=true] - The `extended_hours` parameter is a boolean value that determines
 * whether to include extended hours data in the aggregation. If `extended_hours` is set to `true`, the
 * aggregation will include data from extended trading hours. If `extended_hours` is set to `false`,
 * the aggregation will only include data
 * @returns The function `agg` is returning an object with the following properties:
 */
async function agg(period = "all", extended_hours = true) {
  //   await getInformation(account);
  const information = await getInformation();
  const positions = await Positions();
  const history = await PortfolioHistory(period, extended_hours);

  console.log("aggregating ...");

  return {
    info: information.details,
    positions: positions,
    history: history,
    accountkey: information.accountkey,
  };
}

/**
 * The function `IntervalSave` is an asynchronous function that saves data to a database based on
 * certain conditions and returns a response object.
 * @param accountKey - The `accountKey` parameter is a string that represents the account key for a
 * user's Alpaca account. It is used to verify if the provided account key matches the account number
 * retrieved from the Alpaca API.
 * @returns an object with the following properties:
 */
async function IntervalSave(accountKey) {
  const alpacaAccountNumber = await getAccount();
  console.log("running");
  console.log("ALPACA ACCOUNT NUMBER: " + alpacaAccountNumber.account_number);
  console.log("DATABASE ACCOUNT KEY: " + accountKey);
  if (accountKey) {
    if (
      accountKey.toLowerCase() !==
      alpacaAccountNumber.account_number.toLowerCase()
    ) {
      return {
        code: 400,
        message: "Account key does not match",
      };
    }
  }

  try {
    const alpacapayload = await agg();

    console.log("saving on " + Date.now());

    const response = await updatedb(alpacapayload);

    return {
      code: response.status,
      message: response.statusText,
      data: response.data,
    };
  } catch (error) {
    console.log(error);

    return {
      code: 500,
      message: "Internal server error",
      data: error,
    };
  }
}

module.exports = { IntervalSave };

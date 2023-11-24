require("dotenv").config();
const axios = require("axios");

const version = process.env.VERSION;

const MONGO_URL = process.env.MONGO_ENDPOINT_URL | "http://localhost:3000";
const WEBHOOK_URL = process.env.WEBHOOK_ENDPOINT_URL | "http://localhost:3001";

/**
 * The function `getAccounts` is an asynchronous function that retrieves account data from a MongoDB
 * database using an authentication token.
 * @param auth - The `auth` parameter is a string that represents the authentication token or key used
 * to access the accounts.
 * @returns The function `getAccounts` is returning the data from the response of the API call made
 * using axios.
 */
const getAccounts = async (auth) => {
  try {
    const response = await axios.get(`${MONGO_URL}/${version}/account/${auth}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * The function `createAccounts` is an asynchronous function that sends a POST request to a MongoDB
 * server to create a new account with the provided account key, authentication, and account name.
 * @param account_key - The `account_key` parameter is a unique identifier for the account being
 * created. It could be a string or a number, depending on how you want to define it.
 * @param auth - The `auth` parameter is used for authentication purposes. It could be a token or any
 * other form of authentication that is required to create an account.
 * @param account_name - The `account_name` parameter is the name of the account that you want to
 * create.
 * @returns the data from the response of the POST request made to the specified URL.
 */
const createAccounts = async (account_key, auth, account_name) => {
  try {
    const response = await axios.post(`${MONGO_URL}/${version}/account`, {
      accountkey: account_key,
      auth: auth,
      accountname: account_name,
    });

    console.log("CREATED ACCOUNT: ", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }

};

/**
 * The function `accountExistInAlpaca` checks if an account exists in Alpaca using an account key.
 * @param account_key - The `account_key` parameter is a unique identifier for an account in the Alpaca
 * system. It is used to check if the account exists in the Alpaca system.
 * @returns The function `accountExistInAlpaca` is returning the data received from the API response.
 */
const accountExistInAlpaca = async (account_key) => {
  try {
    const response = await axios.get(
      `${WEBHOOK_URL}/${version}/alpacaExist/${account_key}`
    );

    console.log("RESPONSE: ", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * The function `accountExistInMongo` checks if an account exists in a MongoDB database.
 * @param account_key - The `account_key` parameter is a unique identifier for an account in the
 * MongoDB database.
 * @returns The function `accountExistInMongo` returns a boolean value. It returns `true` if the
 * response code from the API call is 200, indicating that the account exists in MongoDB. It returns
 * `false` if the response code is 404, indicating that the account does not exist in MongoDB. If there
 * is any other response code or an error occurs during the API call, it also returns
 */
const accountExistInMongo = async (account_key) => {
  const response = await axios.get(
    `${MONGO_URL}/${version}/mongoExist/${account_key}`
  );

  if (response.data.code === 200) {
    return true;
  }

  if (response.data.code === 404) {
    return false;
  }

  return false;
  console.log(response, "ERROR CALLING MONGO");
};

module.exports = {
  getAccounts,
  createAccounts,
  accountExistInAlpaca,
  accountExistInMongo,
};

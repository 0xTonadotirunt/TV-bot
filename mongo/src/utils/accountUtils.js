const { Account } = require("../models/Account");

//
/**
 * The function `checkAccountExist` is an asynchronous function that checks if an account with a given
 * account key exists in the database and returns a response object with the appropriate code, data,
 * and message.
 * @param accountkey - The accountkey parameter is a unique identifier for an account. It is used to
 * search for an account in the database.
 * @returns The function `checkAccountExist` returns an object with properties `code`, `data`, and
 * `message`. The specific values of these properties depend on the logic of the function. If an
 * account is found, the returned object will have a `code` of 200, the `data` property will contain
 * the account information, and the `message` will be "Account found". If no account
 */
const checkAccountExist = async (accountkey) => {
  let account_query;
  try {
    account_query = await Account.findOne({
      accountkey: accountkey.toUpperCase(),
    });
    console.log("finding account...");
    if (account_query) {
      return { code: 200, data: account_query, message: "Account found" };
    }

    return { code: 404, message: "Account not found" };
  } catch (error) {
    console.log(error);
    return { code: 500, message: error };
  }
};

/**
 * The function `getAccounts` is an asynchronous function that retrieves accounts based on the provided
 * authentication parameter.
 * @param auth - The `auth` parameter is a value used to authenticate and authorize the user. It is
 * likely a token or a unique identifier that is passed to the function to identify the user and
 * retrieve their associated accounts.
 * @returns The function `getAccounts` returns an object with properties `code`, `data`, and `message`.
 * The value of the `code` property can be either 404, 200, or 500 depending on the outcome of the
 * function. The `data` property contains an array of accounts if they are found, and the `message`
 * property provides a description of the outcome.
 */
const getAccounts = async (auth) => {
  let account_query;

  try {
    // account_query = await checkAccountExist(auth);

    const accounts = await Account.find({ auth: auth });
    console.log("finding accounts...");

    if (!accounts || accounts.length === 0) {
      return { code: 404, message: "Accounts not found" };
    }

    return { code: 200, data: accounts, message: "Accounts found" };

    // get all accounts with same auth
  } catch (error) {
    console.log(error);
    return { code: 500, message: error };
  }
};

/**
 * The `createAccount` function creates a new account with the provided account key, account name, and
 * authentication information, and returns a response object indicating the success or failure of the
 * operation.
 * @param accountkey - The accountkey parameter is a unique identifier for the account. It is typically
 * a string value.
 * @param accountname - The `accountname` parameter is a string that represents the name of the account
 * being created.
 * @param auth - The `auth` parameter is used to authenticate the account. It could be a token,
 * password, or any other form of authentication mechanism required to create the account.
 * @returns The function `createAccount` returns an object with properties `code`, `message`, and
 * `data`. The `code` property represents the status code of the operation, the `message` property
 * contains a message describing the result of the operation, and the `data` property contains the
 * created account object if the operation was successful.
 */
const createAccount = async (accountkey, accountname, auth) => {
  let account_query;

  try {
    console.log("checking if account exists...");
    account_query = await checkAccountExist(accountkey);

    if (account_query.code === 200) {
      return { code: 400, message: "Account already exists" };
    }

    const account = new Account({
      accountkey: accountkey.toUpperCase(),
      accountname: accountname,
      auth: auth,
    });

    console.log("creating account...");

    await account.save();
    console.log(`Account created for ${accountname}`);
    return { code: 200, message: "Account created", data: account };
  } catch (error) {
    console.log(error);
    return { code: 500, message: error };
  }
};

/**
 * The function `updateAccount` updates an existing account with new data, or creates a new account if
 * it doesn't exist.
 * @param data - The `data` parameter is an object that contains the updated information for the
 * account. It could have properties such as `info`, `positions`, and `history`, which represent
 * different aspects of the account's data.
 * @param accountkey - The `accountkey` parameter is a unique identifier for the account. It is used to
 * check if the account already exists and to update the account if it does.
 * @returns The function `updateAccount` returns an object with the following properties:
 */
const updateAccount = async (data, accountkey) => {
  try {
    // if account exists, update account
    const exist = await checkAccountExist(accountkey);

    console.log("ACCOUNT EXIST: ", exist);

    if (exist.code !== 200) {
      return {
        code: 500,
        message: "something went wrong, please recreate account in telegram",
        data: exist,
      };
    }

    // update account
    const saved = exist.data;

    console.log("CURRENT ACCOUNT DATA: ", saved);
    console.log("DATA RECEIVED: ", data);

    saved.set("info", data.info);
    await saved.save();

    console.log("Account updated");

    return {
      code: 200,
      message: "Account successfully updated",
      data: data.info,
    };
  } catch (error) {
    console.log(error);
    return { code: 500, message: error };
  }
};

module.exports = {
  getAccounts,
  createAccount,
  checkAccountExist,
  updateAccount,
};

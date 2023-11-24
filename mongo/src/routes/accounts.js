const express = require("express");
const router = express.Router();
const {
  createAccount,
  getAccounts,
  updateAccount,
} = require("../utils/accountUtils");


// create an account into mongoDB
router.post("/account", async (req, res) => {
  // account is either "alpaca1" or "alpaca2"
  try {
    const data = req.body;

    // create account
    const accountCreated = await createAccount(
      data.accountkey,
      data.accountname,
      data.auth
    );

    console.log("ACCOUNT CREATED: ", accountCreated);
    const response = {
      code: accountCreated.code,
      data: accountCreated.data,
      message: accountCreated.message,
    };

    if (accountCreated.code === 200) {
      return res.status(accountCreated.code).send(response);
    }

    return res.status(accountCreated.code).send({
      code: accountCreated.code,
      message: accountCreated.message,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ code: 500, message: err });
  }
});

// update account with history from alpaca
router.patch("/account/:key", async (req, res) => {
  console.log("ATTEMPTING PATCH: " + req.params.key);
  try {
    const account_key = req.params.key;
    const data = req.body;

    console.log("PATCHING: " + account_key);

    // update acc
    const accountUpdated = await updateAccount(data, account_key.toUpperCase());

    return res.status(accountUpdated.code).send({
      code: accountUpdated.code,
      message: accountUpdated.message,
      data: accountUpdated.data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ code: 500, message: err });
  }
});

// get account by auth
router.get("/account/:auth", async (req, res) => {
  let response = {};
  const auth = req.params.auth;
  try {
    const accounts = await getAccounts(auth);
    if (accounts.code !== 200) {
      response = {
        code: accounts.code,
        message: accounts.message,
      };
    }

    response = {
      code: accounts.code,
      data: accounts.data,
      message: accounts.message,
    };

    return res.status(accounts.code).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ code: 500, message: err });
  }
});

module.exports = router;

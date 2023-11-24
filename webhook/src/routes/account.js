const { IntervalSave } = require("../modules/IntervalSave");

const express = require("express");
const router = express.Router();

/* This code snippet is defining a route handler for a GET request to
"/updateAccountDetails/:accountkey". */
router.get("/updateAccountDetails/:accountkey", async (req, res) => {
  const accountkey = req.params.accountkey;
  console.log("accountkey: ", accountkey);
  const accountDetails = await IntervalSave(accountkey);
  const response = {
    code: accountDetails.code,
    message: accountDetails.message,
  };

  return res.status(accountDetails.code).send(response);
});

module.exports = router;

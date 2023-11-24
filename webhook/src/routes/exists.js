const express = require("express");
const router = express.Router();
const { accountExistInAlpaca } = require("../utils/alpacaUtils.js");

/* This code is defining a GET route handler for the "/alpacaExist/:accountkey" endpoint. */
router.get("/alpacaExist/:accountkey", async (req, res) => {
  const accountkey = req.params.accountkey.toLowerCase();
  const alpacaExist = await accountExistInAlpaca(accountkey);
  const response = {
    code: alpacaExist.code,
    message: alpacaExist.message,
  };

  return res.status(alpacaExist.code).send(response);
});

module.exports = router;

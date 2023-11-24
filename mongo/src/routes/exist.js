const express = require("express");
const router = express.Router();
const { checkAccountExist } = require("../utils/accountUtils.js");

// get all accounts from mongoDB
router.get("/mongoExist/:accountkey", async (req, res) => {
  const accountkey = req.params.accountkey.toLowerCase();
  const mongoExist = await checkAccountExist(accountkey);
  const response = {
    code: mongoExist.code,
    message: mongoExist.message,
  };

  if (mongoExist.code === 200) {
    res.status(mongoExist.code).send(response);
    return;
  }

  if (mongoExist.code === 404) {
    res.status(200).send(response);
    return;
  }

  res.status(mongoExist.code).send(response);
});

module.exports = router;

const express = require("express");
const router = express.Router();

const { createUser, getUser } = require("../utils/userUtils");

// create a telegram user into mongoDB
router.post("/user", async (req, res) => {
  const chatid = req.body.chatid;
  const username = req.body.username;
  const auth = req.body.auth;

  try {
    const user = await createUser(chatid, username, auth);

    const response = { code: user.code, message: user.message };
    return res.status(user.code).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ code: 500, message: err });
  }
});

// get telegram_user by chatid and username
router.get("/user/:chatid/:username", async (req, res) => {
  let response = {};
  const chatid = req.params.chatid;
  const username = req.params.username;

  try {
    const user = await getUser(chatid, username);

    if (user.code !== 200) {
      response = {
        code: user.code,
        message: user.message,
      };

      return res.status(user.code).send(response);
    }

    response = {
      code: user.code,
      message: user.message,
      data: user.data,
    };

    return res.status(user.code).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ code: 500, message: err });
  }
});

module.exports = router;

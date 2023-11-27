/* This code is setting up a server using the Express framework in JavaScript. */
const express = require("express");
const bodyParser = require("body-parser");

// routers
const webHook = require("./routes/webhook.js");
const exists = require("./routes/exists.js");
const account = require("./routes/account.js");

const { IntervalSave } = require("./modules/IntervalSave.js");
require("dotenv").config();
const app = express();
const PORT = process.env.WEBHOOK_PORT; // change this to your desired port number

// parse application/json requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/* The code `app.use("/v1", webHook); app.use("/v1", exists); app.use("/v1", account);` is setting up
routes for different endpoints in the server. */
app.use("/v1", webHook);
app.use("/v1", exists);
app.use("/v1", account);
// webhook listener endpoint

// start server
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
});

// save to db

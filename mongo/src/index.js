const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const accounts = require("./routes/accounts");
const user = require("./routes/user");
const exist = require("./routes/exist");

require("dotenv").config();

const PORT = process.env.MONGO_PORT; // change this to your desired port number

// handle mongo
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

// parse application/json requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* These lines of code are setting up routes for different endpoints in the application. */
app.use("/v1", accounts);
app.use("/v1", user);
app.use("/v1", exist);
// webhook listener endpoint

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

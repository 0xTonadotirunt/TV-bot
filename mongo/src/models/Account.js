const mongoose = require("mongoose");
const { Schema } = mongoose;

/* The code is defining a Mongoose schema for an "Account" model. The schema specifies the structure
and data types of the fields in the "Account" model. */
const accountSchema = new mongoose.Schema({
  accountkey: String,
  accountname: { type: String, default: "Account" },
  auth: { type: String, default: "auth" },
  info: {
    type: Map,
    of: {
      type: Schema.Types.Mixed,
    },
  },
});

const Account = mongoose.model("Account", accountSchema);
module.exports = { Account };

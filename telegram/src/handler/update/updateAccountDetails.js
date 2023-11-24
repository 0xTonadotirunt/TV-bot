const axios = require("axios");

const URL = process.env.WEBHOOK_ENDPOINT_URL | "http://localhost:3001";
const updateAccountDetails = async (account) => {
  // send to webhook endpoint get account details
  console.log(account, "this is account");

  response = await axios.get(
    `${URL}/${process.env.VERSION}/updateAccountDetails/${account.accountkey}`
  );

  console.log("UPDATE DATA RESPONSE: ", response.data);

  return response.data;
};

module.exports = { updateAccountDetails };

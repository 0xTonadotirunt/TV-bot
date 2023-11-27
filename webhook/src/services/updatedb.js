const axios = require("axios");
const MONGO_URI = process.env.MONGO_ENDPOINT_URL;

/**
 * The `updatedb` function updates a document in a MongoDB database with the provided payload.
 * @param payload - The payload is an object that contains the following properties:
 * @returns The function `updatedb` is returning a response object. The response object contains
 * properties such as `data`, `status`, `statusText`, `headers`, and `config`.
 */
const updatedb = async (payload) => {
  const param = payload.accountkey;
  const url = `${MONGO_URI}/${process.env.VERSION}/account/${param}`;

  const response = await axios.patch(url, {
    info: {
      info: payload.info,
      positions: payload.positions,
      history: payload.history,
    },
  });

  return response; // {data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
};

module.exports = { updatedb };

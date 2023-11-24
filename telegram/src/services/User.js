require("dotenv").config();
const axios = require("axios");

const url = process.env.MONGO_ENDPOINT_URL;
const version = process.env.VERSION;

/**
 * The `getUser` function is an asynchronous function that makes a GET request to a specific URL with a
 * chatid and username, and returns the response data.
 * @param chatid - The `chatid` parameter is the unique identifier for a chat or conversation. It is
 * used to identify a specific chat or conversation in the system.
 * @param username - The `username` parameter is a string that represents the username of the user you
 * want to retrieve from the server.
 * @returns The function `getUser` is returning the data received from the API call made using axios.
 */
const getUser = async (chatid, username) => {
  try {
    const response = await axios.get(
      `${url}/${version}/user/${chatid}/${username}`
    );

    console.log(response.data, "response");

    return response.data;
  } catch (err) {
    console.log(err, "error");
  }
};

/**
 * The function `createUser` is an asynchronous function that sends a POST request to a specified URL
 * with the provided chatid, username, and auth parameters, and returns the response data.
 * @param chatid - The `chatid` parameter is the unique identifier for the chat or conversation. It is
 * used to associate the user with a specific chat or conversation.
 * @param username - The `username` parameter is the username of the user you want to create.
 * @param auth - The `auth` parameter is used to authenticate the user. It could be a token, password,
 * or any other form of authentication mechanism required by the server to create a user.
 * @returns The function `createUser` is returning the `data` property of the `response` object.
 */
const createUser = async (chatid, username, auth) => {
  try {
    const response = await axios.post(`${url}/${version}/user`, {
      chatid: chatid,
      username: username,
      auth: auth,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUser, createUser };

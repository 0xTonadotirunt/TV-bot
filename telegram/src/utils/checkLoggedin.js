const { getUser } = require("../services/User");
const { getAccounts } = require("../services/Account");

/**
 * The function `checkLoggedin` checks if a user is logged in and returns their authentication status
 * and associated accounts.
 * @param chatId - The `chatId` parameter is used to identify the chat or conversation where the user
 * is logged in. It could be a unique identifier for a chat room, a user's messaging session, or any
 * other form of communication channel.
 * @param username - The `username` parameter is the username of the user who is trying to log in.
 * @returns The function `checkLoggedin` returns an object with the following properties:
 */
const checkLoggedin = async (chatId, username) => {
  try {
    const user = await getUser(chatId, username);

    if (user.code !== 200) {
      return { authenticated: false, message: user.message };
    }

    const auth = user.data.auth;

    // get all accounts with same auth
    const accounts_response = await getAccounts(auth);

    const accounts = accounts_response.data;

    return { authenticated: true, auth: auth, accounts: accounts };
  } catch (err) {
    console.log(err);
    return { authenticated: false, auth: null, message: err };
  }
};

module.exports = { checkLoggedin };
/**
 * The function `createUser` is an asynchronous function that sends a POST request to a specified URL
 * with the provided chatid, username, and auth parameters, and returns the response data.
 * @param chatid - The `chatid` parameter is the unique identifier for the chat or conversation. It is
 * used to associate the user with a specific chat or conversation.
 * @param username - The `username` parameter is the username of the user you want to create.
 * @param auth - The `auth` parameter is used to authenticate the user. It could be a token, password,
 * or any other form of authentication required by the server to create a user.
 * @returns The function `createUser` is returning the `data` property of the `response` object.
 */

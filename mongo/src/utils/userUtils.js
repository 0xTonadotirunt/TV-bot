const { User } = require("../models/User");

/**
 * The function `getUser` is an asynchronous function that retrieves a user from a database based on
 * their chatid and username, and returns a response object with a code, message, and data if the user
 * is found, or an error message if the user does not exist or an error occurs.
 * @param chatid - The `chatid` parameter is used to identify the chat or conversation that the user
 * belongs to. It is typically a unique identifier for a specific chat or conversation.
 * @param username - The `username` parameter is the username of the user you want to find in the
 * database.
 * @returns The function `getUser` returns an object with properties `code`, `message`, and `data`. The
 * specific values of these properties depend on the execution of the function.
 */
const getUser = async (chatid, username) => {
  try {
    const user = await User.findOne({ chatid: chatid, username: username });

    if (user) {
      return { code: 200, message: "User found", data: user };
    } else {
      return { code: 400, message: "User does not exist" };
    }
  } catch {
    return { code: 500, message: error };
  }
};

/**
 * The `createUser` function creates a new user with the provided chatid, username, and auth, and
 * returns a response object with a success code and message if successful, or an error code and
 * message if there was an error.
 * @param chatid - The chatid parameter is the unique identifier for the chat or conversation in which
 * the user is being created. It could be a string or a number, depending on how you are implementing
 * it in your application.
 * @param username - The username parameter is the username of the user you want to create. It is a
 * string value.
 * @param auth - The `auth` parameter is used to store the authentication information for the user. It
 * could be a password, a token, or any other form of authentication data that is required for the user
 * to access certain resources or perform certain actions.
 * @returns The function `createUser` returns an object with two properties: `code` and `message`. The
 * `code` property represents the status code of the operation, and the `message` property provides a
 * descriptive message about the result of the operation.
 */
const createUser = async (chatid, username, auth) => {
  try {
    const userExist = await getUser(chatid, username);
    if (userExist.code !== 400) {
      console.log("User already exists");
      return { code: userExist.code, message: userExist.message };
    }

    const user = new User({
      chatid: chatid,
      username: username,
      auth: auth,
    });

    await user.save();
    console.log("User created");
    return { code: 200, message: "User created" };
  } catch (err) {
    return { code: 500, message: err };
  }
};

module.exports = { createUser, getUser };

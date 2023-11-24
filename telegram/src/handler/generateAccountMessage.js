/* The code is a module that exports several functions related to sending messages and managing
accounts in a chat bot. */

const { setState, getState } = require("../manager/state.js");

/**
 * The function generates a message with inline keyboard buttons for selecting an account.
 * @param bot - The `bot` parameter is the instance of the bot that is used to send messages and
 * interact with the user. It is typically an object that is provided by a bot framework or library.
 * @param chatId - The `chatId` parameter is the unique identifier for the chat or conversation where
 * the message will be sent. It is used to specify the recipient of the message.
 * @param accounts - An array of objects containing account information. Each object should have
 * properties "accountname" and "accountkey".
 */
const generateAccountMessage = (bot, chatId, accounts) => {
  let account_button = [];

  for (let i = 0; i < accounts.length; i++) {
    const { accountname, accountkey } = accounts[i];
    account_button.push({ text: accountname, callback_data: accountkey });
  }

  const options = {
    reply_markup: {
      inline_keyboard: [account_button],
    },
  };
  bot.sendMessage(chatId, "Please choose an account", options);
};

/**
 * The function sends a message to a chat with a request for the user to enter their Alpaca account
 * key.
 * @param bot - The `bot` parameter is an object that represents the Telegram bot. It is used to send
 * messages to the user.
 * @param chatId - The `chatId` parameter is the unique identifier for the chat or conversation where
 * the message will be sent. It is used to specify the recipient of the message.
 */
const sendCreateAccountMessage = (bot, chatId) => {
  bot.sendMessage(
    chatId,
    "Please enter your alpaca account key \n\n(SPECIAL NOTE: your alpaca account key has to be setup with environment variables for the details to be updated)"
  );
  setState(chatId, "create_account");
};

/**
 * The function sends a message to a chat using a bot and sets the authentication key for the chat.
 * @param bot - The `bot` parameter is an object that represents the Telegram bot. It is used to send
 * messages and perform other actions related to the bot.
 * @param chatId - The chatId parameter is the unique identifier for the chat or conversation where the
 * message is being sent. It is used to specify the recipient of the message.
 * @param message - The `message` parameter is the authentication key that the user entered.
 */
const sendCreateAuthKeyMessage = (bot, chatId, message) => {
  setState(chatId, { accountKey: message }, "auth");
  bot.sendMessage(chatId, "Please enter your authentication key");
  setState(chatId, "create_auth");
};

/**
 * The function sends a confirmation message with options to confirm or cancel an authentication key.
 * @param bot - The "bot" parameter is an instance of the Telegram Bot API. It is used to send messages
 * and perform other actions on behalf of the bot.
 * @param chatId - The `chatId` parameter is the unique identifier for the chat or conversation where
 * the message will be sent. It is used to specify the recipient of the message.
 * @param message - The `message` parameter in the `sendCreateAuthConfirmation` function is the
 * authentication key that needs to be confirmed by the user.
 */
const sendCreateAuthConfirmation = (bot, chatId, message) => {
  const accountKey = getState(chatId, "auth").accountKey;
  setState(chatId, { accountKey: accountKey, authKey: message }, "auth");

  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Confirm", callback_data: message },
          { text: "Cancel", callback_data: "cancel" },
        ],
      ],
    },
  };
  bot.sendMessage(
    chatId,
    "Confirm your authentication key: " + message,
    options
  );
  setState(chatId, "confirm_auth");
};

/**
 * The function sends a message to a chat asking the user to name their account.
 * @param bot - The "bot" parameter is the instance of the bot that is used to send messages and
 * interact with the chat platform.
 * @param chatId - The `chatId` parameter is the unique identifier for the chat or conversation between
 * the bot and the user. It is used to specify the recipient of the message.
 */
const sendNameYourAccountMessage = (bot, chatId) => {
  bot.sendMessage(chatId, "Name your account");
  setState(chatId, "name_account");
};

/**
 * The function sends a confirmation message to a chat using a Telegram bot, displaying the account
 * name and providing options to confirm or cancel.
 * @param bot - The "bot" parameter is an instance of the Telegram Bot API. It is used to send messages
 * and interact with the Telegram bot.
 * @param chatId - The `chatId` parameter is the unique identifier for the chat or conversation where
 * the message will be sent. It is used to specify the recipient of the message.
 * @param message - The `message` parameter is the account name that needs to be confirmed by the user.
 */
const sendConfirmNameAccountMessage = (bot, chatId, message) => {
  const account = getState(chatId, "auth");
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Confirm", callback_data: message },
          { text: "Cancel", callback_data: "cancel" },
        ],
      ],
    },
  };
  bot.sendMessage(chatId, "Confirm your account name: " + message, options);

  setState(
    chatId,
    {
      accountKey: account.accountKey,
      authKey: account.authKey,
      accountName: message,
    },
    "auth"
  );

  setState(chatId, "confirm_name_account");
};

/**
 * The function sends a message to a chat using a bot, informing that an account has been created
 * successfully.
 * @param bot - The `bot` parameter is an object that represents the bot or chatbot that will be used
 * to send the message. It likely has methods or functions for sending messages to a specific chat or
 * user.
 * @param chatId - The `chatId` parameter is the unique identifier for the chat or conversation where
 * the message will be sent. It is used to specify the recipient of the message.
 * @param accountKey - The `accountKey` parameter is an object that contains the key for the newly
 * created account.
 */
const sendAccountCreatedMessage = async (bot, chatId, accountKey) => {
  await bot.sendMessage(
    chatId,
    `Account: ${accountKey.accountkey} created successfully`
  );
};

module.exports = {
  generateAccountMessage,
  sendCreateAccountMessage,
  sendCreateAuthKeyMessage,
  sendCreateAuthConfirmation,
  sendNameYourAccountMessage,
  sendConfirmNameAccountMessage,
  sendAccountCreatedMessage,
};

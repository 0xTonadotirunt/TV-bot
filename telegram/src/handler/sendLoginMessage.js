const { getState, setState } = require("../manager/state");

/**
 * The function sends a login message to a chat using a Telegram bot, providing options to create a new
 * account.
 * @param bot - The `bot` parameter is an object that represents the Telegram bot. It is used to send
 * messages and perform other actions on behalf of the bot.
 * @param chatId - The `chatId` parameter is the unique identifier for the chat or conversation between
 * the user and the bot. It is used to specify the recipient of the message or action.
 */
const sendLoginMessage = (bot, chatId) => {
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Create Account",
            callback_data: "create_account",
          },
        ],
      ],
    },
  };
  bot.sendMessage(
    chatId,
    "Welcome to the TV-bot!\n\nPlease enter your authentication key to start or create a new account.",
    options
  );

  setState(chatId, "login");
};

module.exports = { sendLoginMessage };

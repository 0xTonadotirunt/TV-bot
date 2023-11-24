/**
 * The function `sendMessage` sends a message to a chat using a bot.
 * @param bot - The `bot` parameter is the instance of the Telegram Bot API that you are using to send
 * messages. It is responsible for interacting with the Telegram servers and sending messages to the
 * specified chat.
 * @param chatId - The chatId parameter is the unique identifier for the chat or conversation where the
 * message will be sent. It is typically a number or string that identifies a specific chat or user.
 * @param message - The `message` parameter is the text message that you want to send to the chat. It
 * can be a string containing any text you want to send.
 * @param [options] - The `options` parameter is an optional object that can contain additional
 * configuration options for the message. These options can include things like the message format,
 * reply markup, or any other specific settings that you want to apply to the message.
 */
const sendMessage = (bot, chatId, message, options = {}) => {
  bot.sendMessage(chatId, message, options);
};

module.exports = { sendMessage };

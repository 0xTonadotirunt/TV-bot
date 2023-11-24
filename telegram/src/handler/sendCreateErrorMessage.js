const sendCreateErrorMessage = (bot, chatId, message) => {
  bot.sendMessage(chatId, message);
};

module.exports = { sendCreateErrorMessage };

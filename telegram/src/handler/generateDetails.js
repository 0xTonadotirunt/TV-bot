const { profitOrLoss, convertTimestamp } = require("../utils/Helper.js");

/**
 * The function `generateInfo` takes an object `info` as input and returns a formatted message
 * containing various financial information.
 * @param info - The `info` parameter is an object that contains the following properties:
 * @returns The function `generateInfo` returns a message string that includes the values of `cash`,
 * `portfolio_value`, `equity`, `currency`, `balance_date`, and `buying_power`.
 */
const generateInfo = (info) => {
  const cash = info.cash;
  const portfolio_value = info.portfolio_value;
  const equity = info.equity;
  const currency = info.currency;
  const balance_date = info.balance_date;
  const buying_power = info.buying_power;

  const message = `As of ${balance_date}, you have:\n\nCash: $${cash}\nPortfolio Value: $${portfolio_value}\nEquity: $${equity}\nCurrency: ${currency}\nBuying Power: ${buying_power}`;

  return message;
};

/**
 * The function `generatePositions` takes an array of positions and generates a message displaying the
 * symbol, quantity, direction, unrealized PnL, and percentage PnL for each position.
 * @param positions - An array of objects representing different positions. Each position object has
 * the following properties:
 * @returns The function `generatePositions` returns a message string that contains information about
 * the positions. If the `positions` array is empty, the message will be "You have no positions".
 * Otherwise, the message will include details about each position, such as the symbol, quantity,
 * direction, unrealized PnL, and percentage PnL.
 */
const generatePositions = (positions) => {
  let message = "";

  if (positions.length === 0) {
    message = "You have no positions";
    return message;
  }

  for (let i = 0; i < positions.length; i++) {
    message += `Positions : ${positions[i].symbol}\nQuantity : ${positions[i].qty}\nDirection: ${positions[i].side}\nUnrealized PnL: $${positions[i].unrealized_pl} \nPercentage PnL: ${positions[i].unrealized_plpc}%`;
  }

  return message;
};

/**
 * The function `generateHistory` takes in a history object, a bot object, and a chatId, and generates
 * a message containing the timestamp, equity, profit/loss, and profit/loss percentage for each entry
 * in the history object, sending the message every 10 entries.
 * @param history - The `history` parameter is an object that contains the trading history data. It
 * should have the following properties:
 * @param bot - The `bot` parameter is an object that represents the chat bot. It is used to send
 * messages to the chat.
 * @param chatId - The `chatId` parameter is the unique identifier for the chat or conversation where
 * the message will be sent. It is typically used in messaging platforms or chat applications to
 * specify the recipient of the message.
 * @returns The function `generateHistory` returns a message string.
 */
const generateHistory = async (history, bot, chatId) => {
  let message = "";
  const timestamp = history.timestamp;
  const equity = history.equity;
  const profit_loss = history.profit_loss;
  const profit_loss_pct = history.profit_loss_pct;
  if (history.length === 0) {
    message = "You have no history";
    return message;
  }

  for (let i = 0; i < timestamp.length; i++) {
    message += `Datetime: ${convertTimestamp(timestamp[i])}\nEquity: ${
      equity[i]
    }\nP/L: ${profit_loss[i]} ${profitOrLoss(profit_loss[i])}\nP/L%: ${
      profit_loss_pct[i]
    }\n\n`;

    if (i % 10 == 0) {
      // send message
      await bot.sendMessage(chatId, message);
      message = "";
    }

    // send the remainder of the message
  }
  await bot.sendMessage(chatId, message);
};

module.exports = { generateInfo, generatePositions, generateHistory };

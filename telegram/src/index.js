const { checkLoggedin } = require("./utils/checkLoggedin.js");
const { getState, setState } = require("./manager/state.js");
const { sendLoginMessage } = require("./handler/sendLoginMessage.js");
const {
  sendCreateErrorMessage,
} = require("./handler/sendCreateErrorMessage.js");
const {
  generateAccountMessage,
  sendCreateAccountMessage,
  sendCreateAuthKeyMessage,
  sendCreateAuthConfirmation,
  sendNameYourAccountMessage,
  sendConfirmNameAccountMessage,
  sendAccountCreatedMessage,
} = require("./handler/generateAccountMessage.js");
const { getUser, createUser } = require("./services/User.js");
const {
  getAccounts,
  accountExistInAlpaca,
  accountExistInMongo,
  createAccounts,
} = require("./services/Account.js");
const {
  generatePositions,
  generateHistory,
  generateInfo,
} = require("./handler/generateDetails");

const { createStates } = require("./constants/createStates.js");
const {
  sendUpdatingDetailsMessage,
} = require("./handler/update/sendUpdatingDetailsMessage.js");
require("dotenv").config({ path: "./.env" });
// telegram bot
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TELE_KEY;

const bot = new TelegramBot(token, {
  polling: true,
});

/* The code `bot.on("polling_error", (msg) => console.log(msg));` is an event listener that listens for
any errors that occur during the polling process of the Telegram bot. If an error occurs, it will
log the error message to the console. */
bot.on("polling_error", (msg) => console.log(msg));
bot.on("message", (msg) => {
  console.log(getState(msg.chat.id));
  debugger; //line added```
});

/* The `bot.setMyCommands()` function is used to set the list of commands that the Telegram bot can
understand and respond to. In this case, the bot is being configured to recognize three commands: */
bot.setMyCommands([
  { command: "/start", description: "Start the bot" },
  { command: "/account", description: "choose account" },
  { command: "/performance", description: "show performance" },
]);

/* The code `bot.onText(/\/start/, (msg) => { ... })` is an event listener that listens for the
"/start" command from the user. When the user sends the "/start" command, the callback function is
executed. */
bot.onText(/\/start/, (msg) => {
  setState(msg.chat.id, "start");
  const chatId = msg.chat.id;
  sendLoginMessage(bot, chatId);
});

/* The code `bot.onText(/\/account/, async (msg) => { ... })` is an event listener that listens for the
"/account" command from the user. When the user sends the "/account" command, the callback function
is executed. */
bot.onText(/\/account/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;
  const access = await checkLoggedin(chatId, username);
  if (!access.authenticated) {
    sendLoginMessage(bot, chatId);
    return;
  }

  const accounts = access.accounts;

  generateAccountMessage(bot, chatId, accounts);
});

/* The above code is an event listener for incoming messages. It checks the state of the user and
performs different actions based on the state and the content of the message. */
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  state = getState(chatId);
  console.log(`User ${msg.from.username} is on: ${getState(chatId)}`);

  if (msg.text === "/start") {
    return;
  }

  // if (state === "start") {
  // check if auth key is valid
  // const authKey = msg.text;
  switch (state) {
    case "login":
      const access = await checkLoggedin(chatId, msg.from.username);
      if (access.authenticated) {
        bot.sendMessage(chatId, `Welcome ${msg.from.username}`);
        setState(chatId, "authenticated");
        return;
      }

      const authKey = msg.text;

      const exist = await getAccounts(authKey);

      if (!exist) {
        bot.sendMessage(chatId, `Invalid key, please try again`);
        return;
      }

      if (exist.data.length === 0) {
        bot.sendMessage(chatId, `Invalid key, please try again`);
        return;
      }
      if (exist.code !== 200) {
        bot.sendMessage(chatId, `ERROR,  ${exist.message}`);
        return;
      }

      setState(chatId, "account");

      // set state
      // check if user exist
      const userexist = await getUser(chatId, msg.from.username);
      if (!userexist) {
        // create user
        const user = await createUser(chatId, msg.from.username, authKey);
        bot.sendMessage(chatId, `user saved for ${msg.from.username}`);
      } else if (userexist.code === 200) {
        bot.sendMessage(chatId, `Welcome ${msg.from.username}`);
      } else {
        bot.sendMessage(chatId, `Error: ${userexist.message}`);
      }

      break;
    case "create_account":
      // check if key exists in alpaca && if account already exists in DB

      if (!(await accountExistInAlpaca(msg.text.toLowerCase()))) {
        // send create account error message
        console.log(
          "CREATION ACCOUNT FAILED : account does not exist in alpaca, or setup in environment variables"
        );
        sendCreateErrorMessage(
          bot,
          chatId,
          "Account does not match account in environment variable, please set up your environment variables"
        );
        return;
      }

      if (await accountExistInMongo(msg.text.toLowerCase())) {
        // send account already exists error message
        console.log("CREATION ACCOUNT FAILED : account already created");
        sendCreateErrorMessage(bot, chatId, "Account already created");
        return;
      }

      // create account
      sendCreateAuthKeyMessage(bot, chatId, msg.text.toLowerCase());

      break;
    case "create_auth":
      // send confirmation message
      sendCreateAuthConfirmation(bot, chatId, msg.text.toLowerCase());
      break;

    case "confirm_auth":
      break;

    case "name_account":
      // send name confirmation message
      sendConfirmNameAccountMessage(bot, chatId, msg.text.toLowerCase());
      break;
  }

  if (!createStates.includes(state)) {
    access = await checkLoggedin(chatId, msg.from.username);
    if (!access.authenticated) {
      sendLoginMessage(bot, chatId);
      return;
    }

    const account_key_arr = access.accounts.map(
      (account) => account.accountkey
    );
    for (account_key of account_key_arr) {
      if (state === account_key) {
        // filter to get the account
        const account = access.accounts.filter(
          (account) => account.accountkey === account_key
        )[0];

        switch (msg.text) {
          case "info":
            bot.sendMessage(chatId, `${generateInfo(account.info.info)}`);

            break;
          case "positions":
            await bot.sendMessage(
              chatId,
              `${generatePositions(account.info.positions)}`
            );
            break;
          case "history":
            await generateHistory(account.info.history, bot, chatId);
            break;

          case "update":
            await sendUpdatingDetailsMessage(bot, chatId, account);
            break;
        }
      }
    }
  }
  // }
});

/* The code block is an event listener for callback queries. When a user interacts with a button or
inline keyboard, a callback query is generated. This event listener handles the callback query and
performs different actions based on the data associated with the query. */
bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const username = query.message.chat.username;

  const state = getState(chatId);

  console.log(`User ${username} is on: ${getState(chatId)}`);

  // if user is registering, with callback query, call create user function
  if (query.data === "create_account") {
    // send create account message
    sendCreateAccountMessage(bot, chatId);
    setState(chatId, "create_account");
    // change state to create_account
    return;
  }

  /* This code block is checking if the current state of the user is "confirm_auth". If it is, it
  checks if the callback query data is "cancel". If it is, it sends a message to create the
  authentication key again by calling the `sendCreateAuthKeyMessage` function and returns. */
  if (state === "confirm_auth") {
    if (query.data === "cancel") {
      sendCreateAuthKeyMessage(bot, chatId);

      return;
    }

    // name your account
    sendNameYourAccountMessage(bot, chatId);
    return;
  }

  /* This code block is handling the callback query when the user is in the state of
"confirm_name_account". */
  if (state === "confirm_name_account") {
    const account = getState(chatId, "auth");
    if (query.data === "cancel") {
      sendNameYourAccountMessage(bot, chatId);
      return;
    }

    // create account

    const accountCreated = await createAccounts(
      account.accountKey,
      account.authKey,
      account.accountName
    );

    if (accountCreated.code !== 200) {
      bot.sendMessage(chatId, `ERROR,  ${accountCreated.message}`);
      return;
    }

    await sendAccountCreatedMessage(bot, chatId, accountCreated.data);
    await sendUpdatingDetailsMessage(bot, chatId, accountCreated.data);
    await sendLoginMessage(bot, chatId);

    return;
  }

  /* This code block is checking if the current state of the user is not in the list of create states. If
it is not in the create states, it means that the user is not in the process of creating an account. */
  if (!createStates.includes(state)) {
    const access = await checkLoggedin(chatId, username);
    if (!access.authenticated) {
      sendLoginMessage(bot, chatId);
      return;
    }

    const accounts = access.accounts;

    for (let i = 0; i < accounts.length; i++) {
      const { accountname, accountkey } = accounts[i];
      if (accountkey === query.data) {
        bot.sendMessage(chatId, `You have chosen ${accountname}`, {
          reply_markup: {
            keyboard: [
              [{ text: "info" }, { text: "positions" }],
              [{ text: "history" }, { text: "update" }],
            ],
          },
        });
        // set state
        setState(chatId, query.data);
      }
    }
  }
});

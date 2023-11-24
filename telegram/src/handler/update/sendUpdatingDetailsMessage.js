const { updateAccountDetails } = require("./updateAccountDetails");

const sendUpdatingDetailsMessage = async (bot, chatId, account) => {
  await bot.sendMessage(
    chatId,
    `Updating ${account.accountname} account details...`
  );

  const updateDetails = await updateAccountDetails(account);

  if (updateDetails.code === 200) {
    await bot.sendMessage(
      chatId,
      `Successfully Updated ${account.accountname} account details! `
    );

    return;
  }

  await bot.sendMessage(
    chatId,
    `Failed to update ${account.accountname} account details, please try again later.`
  );

  return;
};

module.exports = { sendUpdatingDetailsMessage };

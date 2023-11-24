/**
 * The function `profitOrLoss` returns a different emoji based on whether the input number is negative,
 * zero, or positive.
 * @param number - The `number` parameter represents a numerical value that is being evaluated for
 * profit or loss.
 * @returns The function `profitOrLoss` returns a string emoji based on the value of the `number`
 * parameter. If the `number` is less than 0, it returns a red circle emoji (`🔴`). If the `number` is
 * equal to 0, it returns a white circle emoji (`⚪`). Otherwise, it returns a green circle emoji
 * (`🟢`).
 */
const profitOrLoss = (number) => {
  if (number < 0) {
    return `🔴`;
  } else if (number == 0) {
    return `⚪`;
  }

  return `🟢`;
};

/**
 * The function `convertTimestamp` takes a timestamp in seconds and returns a formatted date and time
 * string.
 * @param timestamp - The `timestamp` parameter is a number representing a Unix timestamp. It is the
 * number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC.
 * @returns The function `convertTimestamp` returns a string in the format "day/month/year time".
 */
const convertTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const time = date.toLocaleTimeString();

  return `${day}/${month}/${year} ${time}`;
};

module.exports = { profitOrLoss, convertTimestamp };

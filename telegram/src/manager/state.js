/**
 * The code defines functions to get and set the state of a user in a chat application.
 * @param chatId - The `chatId` parameter is used to identify the user or chat session for which the
 * state is being stored or retrieved. It could be a unique identifier for a user or a chat room,
 * depending on the context of the application.
 * @param [data=state] - The `data` parameter is an optional parameter that allows you to specify a
 * specific piece of state data to get or set. By default, it is set to "state", which means it will
 * get or set the overall state of the chat. However, you can provide a different value for `data
 * @returns The module exports an object with two functions: `getState` and `setState`.
 */
stateMap = {};

/**
 * The `getState` function retrieves the value of a specific data key from the state map based on the
 * provided chat ID.
 * @param chatId - The chatId parameter is used to identify a specific chat or conversation. It is
 * typically a unique identifier assigned to each chat session.
 * @param [data=state] - The "data" parameter is an optional parameter that specifies the key for the
 * state data that you want to retrieve. If no value is provided for the "data" parameter, it defaults
 * to "state".
 * @returns the value of `stateMap[chatId][data]`.
 */
function getState(chatId, data = "state") {
  if (stateMap[chatId] == undefined) {
    stateMap[chatId] = {};
  }

  return stateMap[chatId][data];
}

/**
 * The function `setState` sets the state of a user in a chat based on the chat ID, user state, and
 * optional data.
 * @param chatId - The chatId parameter is used to identify the specific chat or conversation for which
 * the state is being set. It could be a unique identifier for a user or a chat room.
 * @param user_state - The user_state parameter represents the state or status of the user in a chat.
 * It can be any value or object that represents the current state of the user.
 * @param [data=state] - The "data" parameter is an optional parameter that represents the key under
 * which the user state will be stored in the stateMap object. If the "data" parameter is not provided,
 * the default key "state" will be used.
 */
function setState(chatId, user_state, data = "state") {
  if (stateMap[chatId] == undefined) {
    stateMap[chatId] = {};
  }

  stateMap[chatId][data] = user_state;
}

module.exports = { getState, setState };

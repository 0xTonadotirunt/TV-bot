# Telegram Bot README

## Overview

This Telegram bot provides a convenient interface to interact with Alpaca financial data. Users can authenticate, choose accounts, view account details, and perform various actions related to their Alpaca accounts.

## Environment Variables (Docker)

```
TELE_KEY = <your-telegram-bot-key>
VERSION = v1
MONGO_ENDPOINT_URL = "http://mongo:3000"
WEBHOOK_ENDPOINT_URL = "http://webhook:3001"
```

## Features

- **Authentication:**

  - Users can start the bot and authenticate using an authentication key.
  - The bot checks the validity of the authentication key and provides appropriate feedback.

- **Account Management:**

  - Users can choose from their authenticated accounts.
  - New users can create an account by providing necessary details.
  - The bot ensures the uniqueness of account names and keys.

- **Account Details:**

  - Users can retrieve information about their accounts, including general information, positions, and account history.
  - updates for account details are supported.

- **Commands:**
  - The bot supports commands such as `/start`, `/account`, and `/performance`(WIP).
  - Custom commands are available for specific actions.

## Environment Variables (without docker)

## Demo

- To start the bot, use the `/start` command.
- click on create account
- Authenticate using your alpaca account key (PAXXXXXXXXXX for paper accounts) when prompted, (NOTE: ensure your alpaca key id and secret key is configured under webhook environment variables.)
- Choose accounts using the `/account` command.
- Explore account details using commands like `/info`, `/positions`, `/history`, and `/update`.

## API Reference

- The bot utilizes the [node-telegram-bot-api](https://www.npmjs.com/package/node-telegram-bot-api) library for interacting with the Telegram API.

## Usage

1. Clone the repository.
2. Install dependencies using
   ```
   npm install
   ```
3. Set up the required environment variables by creating a `.env` in the folder's root directory

   ```
   TELE_KEY`: Telegram API token generated from BotFather used for bot authentication.
   VERSION = "v1"
   MONGO_ENDPOINT_URL = "http://localhost:<your-port-number>" (default: 3000)
   WEBHOOK_ENDPOINT_URL = "http://localhost:<your-port-number>" (default: 3001)
   ```

4. Run the bot using `npm start`.

# Demo

## Starting the bot

1. type /start to start the bot
   ![telegramstart](/telegram/src/assets/telegram_start.png?raw=true)

2. follow the instructions to create an account, ensure the

## Account Creation

![telegramcreate](/telegram/src/assets/telegram_create.png?raw=true)

## Account Summary

![telegramsummary](/telegram/src/assets/telegram_summary.png?raw=true)

## Account History

![telegramhistory](/telegram/src/assets/telegram_history.png?raw=true)

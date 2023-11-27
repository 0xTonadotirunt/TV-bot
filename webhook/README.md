# WebHook API

## Overview

This API is a Node.js application that sets up a server using the Express framework. It includes three main routers: `webhook.js`, `exists.js`, and `account.js`. The server listens on a specified port (default is 3001) and handles incoming requests related to webhooks, account existence, and account details updates.

## Environment Variables (Docker)

```
ALPACA_KEY_ID = "PK12345678900762544"
ALPACA_SECRET_KEY = "pWENF123456788senEFsbEFUfseIBE"
PAPER = True
VERSION = "v1"
MONGO_ENDPOINT_URL = "http://mongo:3000"
WEBHOOK_ENDPOINT_URL = "http://webhook:3001"
WEBHOOK_PORT = 3001
```

## Files and Structure

### index.js

This is the main entry point for the application. It sets up an Express server, defines routes for three routers (`webhook.js`, `exists.js`, and `account.js`), and starts the server to listen on the specified port.

### webhook.js

#### `v1/webhook` `POST`

This router handles incoming webhook requests. It includes functionality to process data from the webhook payload, execute trades based on specified conditions, and log relevant trade details. Additionally, it provides a simple endpoint to check if the webhook is working.

The body of this endpoint will be provided by webhooks sent from tradingView

Body (JSON) :
{
"ticker": "AnyStockTicker",
"openPrice": "TradingViewExecutedPrice",
"closePrice": "TradeExecutionPrice",
"interval": "5", // Can be 5, 15, 30, 45 corresponding to minutes
"direction": "sell", // Options: "buy" or "sell"
"action": "entry", // Options: "entry" or "exit"
"indicatorTime": "TradingViewExecutionTime",
"strategyTime": "TradingViewStrategyExecutionTime"
}

to check if the endpoint is working, an example body has been provided.

example body:
{
"ticker" : "NVDA",
"openPrice" : "test",
"closePrice" : "test",
"interval": "5",
"direction" : "sell",
"action" : "entry",
"indicatorTime" : "test",
"strategyTime" : "test"
}

### exists.js

This router deals with checking if an account exists in Alpaca. It exposes an endpoint (`/alpacaExist/:accountkey`) that accepts an account key as a parameter and returns a response indicating whether the account exists or not.

### account.js

This router is responsible for updating account details. It provides an endpoint (`/updateAccountDetails/:accountkey`) that accepts an account key as a parameter and returns updated account details, leveraging the `IntervalSave` module.

## Installation

To run the services in isolation,

1. Navigate to the project directory:

   ```
   cd webhook
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a .env file in the folder root and add the following:

   ```
   ALPACA_KEY_ID = <Alpaca Key Id>
   ALPACA_SECRET_KEY = <Alpaca Secret Key>
   PAPER = True
   VERSION = "v1"
   MONGO_ENDPOINT_URL = "http://localhost:<mongo-endpoint-port>" (default: 3000)
   WEBHOOK_ENDPOINT_URL = "http://localhost:<webhook-endpoint-port>" (default: 3001)
   WEBHOOK_PORT = <webhook-endpoint-port>
   ```

   - replace <webhook-endpoint-port> with an empty port to run the webhook endpoint (default port is 3001)
   - replace <mongo-endpoint-port> with an empty port to run the mongo endpoint (default port is 3000)

## Usage

1. Start the Express.js service by running
   ```
   npm start
   ```
2. Access the different functionalities through the defined endpoints, such as
   1. `/v1/webhook` for webhook processing from TradingView,
   2. `/v1/alpacaExist/:accountkey` for checking account existence in AlpacaAPI, and
   3. `/v1/updateAccountDetails/:accountkey` for updating account details from AlpacaAPI.

(NOTE: Make sure that both `ALPACA_KEY_ID` and `ALPACA_SECRET_KEY` environment variables are configured, and ensure that the `:accountkey` matches the account number in your Alpaca account.)

## Installation

- Express: Web framework for Node.js
- Body-parser: Middleware to handle JSON and URL-encoded form data
- dotenv: Loads environment variables from a `.env` file

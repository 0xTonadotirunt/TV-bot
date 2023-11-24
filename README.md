# TradingView TradingBot

# Overview

The Trading bot is designed to interact with TradingView, a platform for testing trading strategies. It relies on Webhooks, which are essentially automated messages or notifications sent from TradingView, containing your specified trade signals.

Upon receiving these Webhooks, the TradingBot leverages alpacaAPI, an interface that facilitates automated trading functionalities.

To provide users with a means to interact with and monitor the TradingBot's activities, there is a user interface integrated into Telegram, a popular messaging platform. Through a dedicated Telegram Bot, users can access updates, and insights into how their trading strategies are performing. This interface allows users to stay informed about the bot's actions and the overall success of their trading strategies without needing to directly access the trading platforms or perform manual checks.

This project comprises three Node.js applications using the Express framework, MongoDB integration, and Alpaca trading webhook functionality. The telegram interface allows the user to view the P/L of previous trades and also its overall performance.

Here is a simplified diagram :

![diagram](/webhook/trading-view-example/diagram.drawio.png?raw=true)

# Prerequisites

- ensure Docker is installed on your machine.

## Environment Variables (.env)

Create a `.env` file in the root of each folder `/mongo`, `/telegram`, `/webhook` with the following variables:

### `/mongo/.env`

- MONGO_URI: mongodb://mongodb:27017/TVtele
- API_VERSION: v1
- MONGO_ENDPOINT_URL: http://mongo:3000
- MONGO_PORT: 3000

### `/telegram/.env`

```
- TELE_KEY = <your-telegrambot-api-key>
- VERSION = v1
- MONGO_ENDPOINT_URL = "http://mongo:3000"
- WEBHOOK_ENDPOINT_URL = "http://webhook:3001"
```

### `/webhook/.env`

```
- ALPACA_KEY_ID: <your-alpaca-key-id>
- ALPACA_SECRET_KEY: <your-alpaca-secret-key>
- PAPER: True
- VERSION: v1
- MONGO_ENDPOINT_URL: http://mongo:3000
- WEBHOOK_ENDPOINT_URL: http://webhook:3001
- WEBHOOK_PORT: 3001
```

## TradingView Webhooks Setup

1. Access the TradingView platform.

2. Navigate to the strategy you want to set up a webhook for.
3. Ensure that in the pine editor there is a alerts setup for the strategy
   ![tradingviewalertexample](/webhook/trading-view-example/tradingviewalertexample.png)

### Setting up alerts

1. Click on "Alerts" on the top of the screen
2. enter your URL to your deployed webhook service
   ![notificationsetup](/webhook/trading-view-example/ec2urlexample.png?raw=true)

3. Go to the "Settings" tab.
4. Choose the correct condition as indicated in your tradingView strategy script
5. Enter an alert name
6. Under Message, include the following
   {
   "ticker" : "{{ticker}}",
   "openPrice": "{{open}}",
   "closePrice": "{{close}}",
   "interval" : "{{interval}}",
   "direction" : "buy",
   "action" : "entry",
   "indicatorTime" : "{{time}}",
   "strategyTime" : "{{timenow}}"
   }

(NOTE: ensure your alert corresponds to `direction` and `action`
if your alert is starting a long trade `startLongTrade`, your `direction` should be "buy", `action` should be "entry"). An example of a Open Long setup is as shown below:
![tradingviewstartlongtradeexample](/webhook/trading-view-example/tradingviewstartlongtradeexample.png?raw=true)

7. Create a new alert based on your trading strategy. Set the alert message with the necessary details such as ticker, open/close prices, interval, direction, action, indicator time, and strategy time.

8. In the "Webhook URL" field, enter the URL for the corresponding webhook endpoint:

   - default Alpaca Trading Webhook: `http://localhost:3001/v1/webhook`

![tradingviewurlexample](/webhook/trading-view-example/ec2urlexample.png?raw=true)

Note: Ensure that your local environment is accessible to external requests if you are running the services locally. If deploying to a server (e.g. EC2), replace `localhost` in the webhook URLs with the server's IP or domain.

9. Save the alert.

10. When the specified conditions are met, TradingView will send a webhook to the provided URL endpoint.

## Telegram Bot setup

1. Create a bot using BotFather (https://telegram.me/BotFather) to get the telegram token, this token is required in the environment variables

# Installation

1. Clone the Repository:
   ```
   git clone https://github.com/0xTonadotirunt/TV-webhook
   cd TV-webhook
   ```
2. Confirm that Docker daemon engine is running.
3. Make sure to populate all the environmental variables, and refer to the provided .env.example for reference.
4. Utilize Docker to run the application:
   ```
   docker-compose up --build
   ```
   This command will pull necessary images, build the Docker containers, and start the services defined in the `docker-compose.yml` file.

# Cautionary Note:

This trading tool is provided for informational purposes only and should not be considered as financial advice. It is essential to understand that trading in financial markets carries inherent risks, and past performance of any trading system or methodology is not necessarily indicative of future results. This tool should primarily be used to test trading strategies and should not be used for other purposes.

By using this tool, you acknowledge and accept that all trading decisions made based on the information provided by this tool are solely your responsibility. I, as the provider of this tool, cannot and will not be held accountable for any losses, financial or otherwise, incurred as a result of using this tool.

It is highly recommended that before making any financial decisions or executing trades, you conduct thorough research, consider your risk tolerance, and if necessary, consult with a qualified financial advisor. Additionally, ensure that you understand the risks involved in trading and only trade with capital that you can afford to lose.

Remember that the financial markets are volatile and subject to sudden changes, and no trading tool can guarantee profits or prevent losses. Your decision to use this tool implies your understanding and acceptance of the risks involved in trading, and you agree not to hold me liable for any losses incurred during the trading process.

Trade cautiously, be aware of your limitations, and exercise prudent judgment in all your trading activities.

Happy Trading :)

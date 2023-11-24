const express = require("express");
const router = express.Router();
const { checkIfOrderExists } = require("../utils/checkIfOrderExists.js");

const {
  createShortOrder,
  createLongOrder,
} = require("../utils/alpacaUtils.js");

/* The code block `router.post("/webhook", async (req, res) => { ... })` is defining a route handler
for the HTTP POST request to the "/webhook" endpoint. */
router.post("/webhook", async (req, res) => {
  try {
    const data = req.body;
    res.sendStatus(200);
    console.log("Webhook received!", data);

    ticker = data.ticker;
    openPrice = data.openPrice;
    closePrice = data.closePrice;
    interval = data.interval;
    direction = data.direction;
    action = data.action;
    indicatorTime = data.indicatorTime;
    strategyTime = data.strategyTime;
    let order = null;
    let orderexist = null;

    if (direction == "buy") {
      if (action == "entry") {
        console.log("buy entry");
        order = await createLongOrder(ticker, 10);
      }
      if (action == "exit") {
        // check if order exist
        orderexist = await checkIfOrderExists();
        console.log("buy exit", orderexist);

        if (orderexist.length > 0) {
          order = await createShortOrder(ticker, "all");
        }
      }
    }

    if (direction == "sell") {
      if (action == "entry") {
        console.log("sell entry");

        order = await createShortOrder(ticker, 10);
      }
      if (action == "exit") {
        orderexist = await checkIfOrderExists();
        console.log("sell exit", orderexist);
        if (orderexist.length > 0) {
          order = await createLongOrder(ticker, "all");
        }
      }
    }
    if (order) {
      console.log(`
      Trade executed : 
      Account : ${account}
      Ticker : ${ticker}
      Open Price : ${openPrice}
      Close Price : ${closePrice}
      Interval : ${interval}
      Direction : ${direction}
      Action : ${action}
      Indicator Time : ${indicatorTime}
      Strategy Time : ${strategyTime}
      `);
    }
  } catch (err) {
    console.log(err);
  }
});

/* The code `router.get("/webhook", (req, res) => { res.send("Webhook is working!"); });` is defining a
route handler for the HTTP GET request to the "/webhook" endpoint. */
router.get("/webhook", (req, res) => {
  res.send("Webhook is working!");
});

module.exports = router;

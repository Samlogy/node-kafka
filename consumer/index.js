const express = require("express");
const {consumer} = require("./kafka");
const { consumedMessages, metricClient } = require('./metrics'); // Import the counter

const app = express();
const PORT = process.env.PORT || 5000;


// Expose /metrics endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', metricClient.register.contentType);
    res.end(await metricClient.register.metrics());
  });

const consumeMessages = async (topic) => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        console.log(
          `Received from ${topic}, partition ${partition}: ${message.value.toString()}`
        );
        consumedMessages.inc(); // metrics
      } catch (error) {
        console.error("Error processing message", error);
      }
    },
  });

  process.on("SIGINT", async () => {
    console.log("Disconnecting consumer...");
    await consumer.disconnect();
    process.exit(0);
  });
};

app.listen(PORT, async () => {
  console.log(`Consumer => ${PORT}`);
  await consumeMessages("test-topic");
});
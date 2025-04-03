const express = require("express");
const { producer } = require("./kafka");
const { producedMessages, metricClient } = require('./metrics');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Expose /metrics endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', metricClient.register.contentType);
  res.end(await metricClient.register.metrics());
});


const produceMessage = async (topic, message, partition = 0) => {
  try {
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: message, partition }],
      acks: -1,
    });
    producedMessages.inc();// metrics
    console.log(`Message sent: ${message}`);
  } catch (error) {
    console.error("Error producing message", error);
  } finally {
    await producer.disconnect();
  }
};

app.post("/produce", async (req, res) => {
  const { topic, message } = req.body;
  await produceMessage(topic, message);
  res.send({ status: "Message Sent" });
});

app.listen(PORT, () => {
  console.log(`Producer => ${PORT}`);
});

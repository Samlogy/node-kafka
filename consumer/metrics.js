const client = require('prom-client');

// Collect default Node.js metrics (memory, CPU, etc.)
client.collectDefaultMetrics({ timeout: 5000 });

// Optionally, define custom metrics
const producedMessages = new client.Counter({
  name: 'produced_messages_total',
  help: 'Total number of produced messages',
});
const consumedMessages = new client.Counter({
  name: 'consumed_messages_total',
  help: 'Total number of consumed messages',
});

// Export custom metrics for use in your app logic
module.exports = {
  producedMessages,
  consumedMessages,
  metricClient: client
};

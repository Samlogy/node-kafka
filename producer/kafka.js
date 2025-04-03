const { Kafka, logLevel } = require("kafkajs");

const kafka = new Kafka({
  clientId: "producer-app",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
  logLevel: logLevel.ERROR,
  retry: { retries: 5 },
  producer: {
    idempotent: true
  }
});

module.exports.producer = kafka.producer();
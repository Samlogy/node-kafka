const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "consumer-app",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});


module.exports.consumer = kafka.consumer({ groupId: 'test-group' });
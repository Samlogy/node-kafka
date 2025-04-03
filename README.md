**Kafka Node.js:**

```sh
# testing kafka
## pruducer new message => consumed
curl -X POST http://localhost:4000/produce -H "Content-Type: application/json" -d '{"topic": "test-topic", "message": "Hello from API!"}'

# check these metrics
produced_messages_total
consumed_messages_total
```
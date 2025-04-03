# Kafka & Node.js

```sh
# getting started
docker compose up --build

# testing kafka
## pruducer new message => consumed
curl -X POST http://localhost:4000/produce -H "Content-Type: application/json" -d '{"topic": "test-topic", "message": "Hello from API!"}'

# check these metrics => prometheus
produced_messages_total
consumed_messages_total
```

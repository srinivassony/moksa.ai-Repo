const { Kafka } = require('kafkajs');

const kafka = new Kafka({ clientId: 'customer-login', brokers: ['localhost:9092'] });
const consumer = kafka.consumer({ groupId: 'customer-data' });

async function startKafkaConsumer(service) {
    await consumer.connect();
    await consumer.subscribe({ topic: 'customer-tracking', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ message }) => {
            console.log('---- Message Received ----');
            console.log('Raw:', message.value?.toString());
            if (message.value) {
                try {
                    const data = JSON.parse(message.value.toString());
                    console.log('Parsed:', data);
                    service.updateDataStore(data);
                } catch (err) {
                    console.error('Invalid message format:', err);
                }
            }
        },
    });
}

module.exports = { startKafkaConsumer };

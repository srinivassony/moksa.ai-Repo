const express = require('express');
const cors = require('cors');
const { startKafkaConsumer } = require('./kafka/consumer');
const { createCustomerService } = require('./service/customerService');

const app = express();
const PORT = 4000;

const customerService = createCustomerService();

app.use(cors());

app.get('/api/live', (_, res) => {
    res.json(customerService.getLiveData());
});

app.get('/api/history', (_, res) => {
    res.json(customerService.getHistoricalData());
});

startKafkaConsumer(customerService);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

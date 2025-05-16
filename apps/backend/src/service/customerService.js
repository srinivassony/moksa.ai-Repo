function createCustomerService() {
    const liveData = [];
    const history = {}; // keep as object for keyed updates

    function updateDataStore(event) {
        liveData.push(event);
        // if (liveData.length > 100) liveData.shift();

        const hourNumber = parseInt(event.time_stamp.slice(0, 2));
        const hourLabel = formatHour(hourNumber);

        if (!history[hourLabel]) history[hourLabel] = { in: 0, out: 0 };
        history[hourLabel].in += event.customers_in;
        history[hourLabel].out += event.customers_out;
    }

    function getLiveData() {
        return liveData;
    }

    function getHistoricalData() {
        // Convert the history object to a sorted array of { hour: label, in, out }
        const result = [];
        // Optionally: define all 24 hours to show zeroes if missing
        for (let h = 0; h < 24; h++) {
            const label = formatHour(h);
            const data = history[label] || { in: 0, out: 0 };
            result.push({ hour: label, in: data.in, out: data.out });
        }
        return result;
    }

    function formatHour(hour) {
        const period = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
        return `${hour12} ${period}`; // e.g., "2 PM"
    }

    return {
        updateDataStore,
        getLiveData,
        getHistoricalData,
    };
}

module.exports = { createCustomerService };

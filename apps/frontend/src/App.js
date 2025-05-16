
import React, { useState, useEffect } from 'react';

const live_url = 'http://localhost:4000/api/live';

const history_url = 'http://localhost:4000/api/history';

function App() {

    const [liveData, setLiveData] = useState([]);

    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchLiveData = async () => {
            try {
                const response = await fetch(`${live_url}`);
                const data = await response.json();
                console.log(data)
                setLiveData(data);
            } catch (error) {
                console.log("error", error)
                setLiveData([]);
            }
        }

        const fetchHistoryData = async () => {
            try {
                const response = await fetch(`${history_url}`);
                const data = await response.json();
                console.log(data)
                setHistory(data);
            } catch (error) {
                console.log("error", error)
                setHistory([]);
            }
        }

        fetchLiveData();
        fetchHistoryData();

        const interval = setInterval(() => {
            fetchLiveData();
            fetchHistoryData();
        }, 5000); // Fetch data every 5 seconds
    }, [live_url, history_url]);

    return (
        <>
            <div style={{ padding: '20px' }}>
                <h2>Live Table</h2>
                <table border={1} cellPadding={5}>
                    <thead>
                        <tr>
                            <th>Store ID</th>
                            <th>In</th>
                            <th>Out</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {liveData?.map((row, idx) => (
                            <tr key={idx}>
                                <td>{row.store_id}</td>
                                <td>{row.customers_in}</td>
                                <td>{row.customers_out}</td>
                                <td>{row.time_stamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h2 style={{ marginTop: '40px' }}>History Table</h2>
                <table border={1} cellPadding={5}>
                    <thead>
                        <tr>
                            <th>Hour</th>
                            <th>In</th>
                            <th>Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history &&
                            history.map((data, idx) => (
                                <tr key={idx}>
                                    <td>{data.hour}</td>
                                    <td>{data.in}</td>
                                    <td>{data.out}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default App;

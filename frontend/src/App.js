import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/')  
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        const arrivals = data?.ctatt?.eta || [];
        setTrains(arrivals);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>CTA Train Arrivals</h1>
        {loading && <p>Loading CTA data...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <div className="train-list">
          {trains.map((train, index) => (
            <div key={index} className="train-card">
              <p><strong>Line:</strong> {train.rt}</p>
              <p><strong>Destination:</strong> {train.destNm}</p>
              <p><strong>Arrival:</strong> {new Date(train.arrT).toLocaleTimeString()}</p>
              <p><strong>Scheduled:</strong> {train.isSch === "1" ? "Yes" : "No"}</p>
              <p><strong>Approaching:</strong> {train.isApp === "1" ? "Yes" : "No"}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;

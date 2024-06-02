import React, { useEffect, useState } from 'react';
import AlertCountsOverTime from './components/AlertCountsOverTime';
import TopAlertCategories from './components/TopAlertCategories';
import AlertsBySourceIP from './components/AlertsBySourceIP';
import AlertsByDestinationPort from './components/AlertsByDestinationPort';
import './App.css';
import { eve } from './eve.json';

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function App() {
  const [data, setData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch(data)
      .then(response => response.json())
      .then(data => {
        const parsedData = data.map(event => ({
          timestamp: new Date(event.timestamp),
          category: event.alert?.category || 'Unknown',
          signature: event.alert?.signature || 'Unknown',
          src_ip: event.src_ip,
          dest_ip: event.dest_ip,
          dest_port: event.dest_port,
        }));
        setData(parsedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Network Alerts Dashboard</h1>
      <button onClick={toggleDarkMode}>
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>
      <AlertCountsOverTime data={data} darkMode={darkMode} />
      <TopAlertCategories data={data} darkMode={darkMode} />
      <AlertsBySourceIP data={data} darkMode={darkMode} />
      <AlertsByDestinationPort data={data} darkMode={darkMode} />
    </div>
  );
}

export default App;

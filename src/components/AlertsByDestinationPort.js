import React from 'react';
import { Bar } from 'react-chartjs-2';
import data from '../eve.json'
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const AlertsByDestinationPort = ({ data }) => {
  const destPortCounts = data.reduce((acc, { dest_port }) => {
    acc[dest_port] = (acc[dest_port] || 0) + 1;
    return acc;
  }, {});

  const sortedDestPorts = Object.entries(destPortCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

  const chartData = {
    labels: sortedDestPorts.map(([dest_port]) => dest_port),
    datasets: [
      {
        label: 'Number of Alerts',
        data: sortedDestPorts.map(([data, count]) => count),
        backgroundColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default AlertsByDestinationPort;

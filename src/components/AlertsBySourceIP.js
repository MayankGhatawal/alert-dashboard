import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const AlertsBySourceIP = ({ data }) => {
  const srcIpCounts = data.reduce((acc, { src_ip }) => {
    acc[src_ip] = (acc[src_ip] || 0) + 1;
    return acc;
  }, {});

  const sortedSrcIps = Object.entries(srcIpCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

  const chartData = {
    labels: sortedSrcIps.map(([src_ip]) => src_ip),
    datasets: [
      {
        label: 'Number of Alerts',
        data: sortedSrcIps.map(([, count]) => count),
        backgroundColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default AlertsBySourceIP;

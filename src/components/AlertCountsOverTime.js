import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import data from '../eve.json';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
const AlertCountsOverTime = ({ data, darkMode }) => {
  const counts = data.reduce((acc, { timestamp }) => {
    const date = timestamp.toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(counts),
    datasets: [
      {
        label: 'Alert Counts',
        data: Object.values(counts),
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: { color: darkMode ? '#ffffff' : '#000000' },
      },
      y: {
        ticks: { color: darkMode ? '#ffffff' : '#000000' },
      },
    },
    plugins: {
      legend: {
        labels: { color: darkMode ? '#ffffff' : '#000000' },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default AlertCountsOverTime;

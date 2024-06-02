import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);


const TopAlertCategories = ({ data }) => {
  const categoryCounts = data.reduce((acc, { category }) => {
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

  const chartData = {
    labels: sortedCategories.map(([category]) => category),
    datasets: [
      {
        label: 'Number of Alerts',
        data: sortedCategories.map(([, count]) => count),
        backgroundColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default TopAlertCategories;

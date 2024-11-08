import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

function SignalChart({ encodedSignal, encodingType, binaryData }) {
  const data = {
    labels: binaryData.split(''),
    datasets: [
      {
        label: `Encoding: ${encodingType}`,
        data: encodedSignal,
        fill: false,
        borderColor: '#007bff',
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: '#007bff',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Binary Data',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Signal Level',
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default SignalChart;

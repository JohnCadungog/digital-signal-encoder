import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css'; // Assuming you have a CSS file for custom styling

// Dummy data for the digital signal (NRZI encoding or similar)
// Modify this data array to match your actual signal data
const data = [
  { bit: 0, signal: 1 },
  { bit: 1, signal: 1 },
  { bit: 2, signal: -1 },
  { bit: 3, signal: -1 },
  { bit: 4, signal: 1 },
  { bit: 5, signal: 1 },
  { bit: 6, signal: -1 },
  { bit: 7, signal: -1 },
  { bit: 8, signal: 1 },
  { bit: 9, signal: 1 },
];

function DigitalSignalChart() {
  return (
    <div className="chart-container">
      <h2 className="chart-title">Digital Signal (NRZI Encoding)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4A4A4A" />
          <XAxis 
            dataKey="bit" 
            tick={{ fill: '#CCCCCC' }} 
            label={{ value: 'Bit', position: 'insideBottom', fill: '#CCCCCC', dy: 10 }}
          />
          <YAxis 
            domain={[-1, 1]} 
            tick={{ fill: '#CCCCCC' }}
            label={{ value: 'Signal', angle: -90, position: 'insideLeft', fill: '#CCCCCC', dx: -10 }}
          />
          <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#666' }} />
          <Line 
            type="stepAfter" 
            dataKey="signal" 
            stroke="#a366ff" 
            strokeWidth={2} 
            dot={false} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DigitalSignalChart;

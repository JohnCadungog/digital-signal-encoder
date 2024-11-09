import React, { useState, useEffect } from 'react';
import { Line } from 'recharts';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { 
  Switch, 
  FormControlLabel, 
  TextField, 
  Button,
  Paper,
  Typography,
  Alert
} from '@mui/material';

const DigitalSignalEncoder = () => {
  const [binaryInput, setBinaryInput] = useState('01001110');
  const [encodedData, setEncodedData] = useState({});
  const [startHigh, setStartHigh] = useState({
    manchester: false,
    diffManchester: false,
  });
  const [error, setError] = useState('');

  // Encoding functions remain the same...
  const nrzL = (data) => {
    const encoded = data.map((bit) => ({ value: bit === 1 ? 1 : -1, bit }));
    encoded.push({ value: encoded[encoded.length - 1].value, bit: null });
    return encoded;
  };

  const nrzI = (data) => {
    let current = -1;
    const encoded = data.map((bit) => {
      if (bit === 1) {
        current *= -1;
      }
      return { value: current, bit };
    });
    encoded.push({ value: current, bit: null });
    return encoded;
  };

  const bipolarAMI = (data) => {
    let lastPolarity = -1;
    const encoded = data.map((bit) => {
      if (bit === 0) {
        return { value: 0, bit };
      }
      lastPolarity *= -1;
      return { value: lastPolarity, bit };
    });
    encoded.push({ value: encoded[encoded.length - 1].value, bit: null });
    return encoded;
  };

  const pseudoternary = (data) => {
    let lastPolarity = -1;
    const encoded = data.map((bit) => {
      if (bit === 1) {
        return { value: 0, bit };
      }
      lastPolarity *= -1;
      return { value: lastPolarity, bit };
    });
    encoded.push({ value: encoded[encoded.length - 1].value, bit: null });
    return encoded;
  };

  const manchester = (data) => {
    const initialPolarity = startHigh.manchester ? 1 : -1;
    const encoded = data.flatMap((bit) => {
      const firstValue = bit === 0 ? initialPolarity : -initialPolarity;
      return [
        { value: firstValue, bit, half: 'first' },
        { value: -firstValue, bit, half: 'second' },
      ];
    });
    encoded.push({ value: encoded[encoded.length - 1].value, bit: null });
    return encoded;
  };

  const differentialManchester = (data) => {
    let current = startHigh.diffManchester ? 1 : -1;
    const encoded = data.flatMap((bit) => {
      let firstHalf, secondHalf;

      if (bit === 0) {
        current *= -1;
      }

      firstHalf = current;
      secondHalf = -current;
      current = secondHalf;

      return [
        { value: firstHalf, bit, half: 'first' },
        { value: secondHalf, bit, half: 'second' },
      ];
    });
    encoded.push({ value: encoded[encoded.length - 1].value, bit: null });
    return encoded;
  };

  const handleEncode = () => {
    if (!binaryInput) {
      setError('Input field cannot be empty');
      return;
    }

    setError('');
    const binaryArray = binaryInput.split('').map(Number);
    const encodings = {
      'NRZ-L (0=low, 1=high)': nrzL(binaryArray),
      'NRZ-I (1=transition)': nrzI(binaryArray),
      'Bipolar AMI (1=alternate +/-)': bipolarAMI(binaryArray),
      'Pseudoternary (0=alternate +/-)': pseudoternary(binaryArray),
      'Manchester (0→1 for 0, 1→0 for 1)': manchester(binaryArray),
      'Differential Manchester (transition@center, 0=edge transition)': differentialManchester(binaryArray),
    };
    setEncodedData(encodings);
  };

  // Add useEffect to handle startHigh changes
  useEffect(() => {
    handleEncode();
  }, [startHigh, binaryInput]);

  const renderChart = (title, data) => {
    const chartData = data.map((point, index) => ({
      index,
      signal: point.value,
      bit: point.bit,
    }));

    const isManchester = title.toLowerCase().includes('manchester');

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h6">{title}</Typography>
          {isManchester && (
            <FormControlLabel
              control={
                <Switch
                  checked={title.includes('Differential') ? startHigh.diffManchester : startHigh.manchester}
                  onChange={(e) => {
                    setStartHigh(prev => ({
                      ...prev,
                      [title.includes('Differential') ? 'diffManchester' : 'manchester']: e.target.checked
                    }));
                  }}
                />
              }
              label="Start High"
            />
          )}
        </div>
        <div className="w-full h-48">
          <LineChart
            width={800}
            height={180}
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
  dataKey="index"
  ticks={Array.from({ length: binaryInput.length * (isManchester ? 2 : 1) }, (_, i) => i)}
  tickFormatter={(value) => {
    if (isManchester) {
      // For Manchester and Differential Manchester encoding, display the binary value at the center of each pair of steps.
      return value % 2 === 0 ? binaryInput[Math.floor(value / 2)] : '';
    }
    return binaryInput[value] || '';
  }}
  tick={{ dy: 10, dx: 44 }} // Adjust `dx` to move the label to the center
/>

            <YAxis domain={[-1.5, 1.5]} ticks={[-1, 0, 1]} />
            <ReferenceLine y={0} stroke="#666" />
            <Line
              type="stepAfter"
              dataKey="signal"
              stroke="#FFD700"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </div>
      </div>
    );
  };

  return (
    <Paper elevation={3} className="w-full max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <Typography variant="h3" align="center" gutterBottom>
          Digital Signal Encoding Techniques
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
          Digital Signal Encoding Visualization
        </Typography>

        <div className="flex flex-col gap-4 mb-8">
          <TextField
            fullWidth
            value={binaryInput}
            onChange={(e) => {
              const newValue = e.target.value.replace(/[^01]/g, '');
              setBinaryInput(newValue);
            }}
            label="Enter binary sequence (0s and 1s)"
            variant="outlined"
            InputProps={{
              style: {
                fontFamily: 'monospace',
                fontSize: '1.1rem',
              },
            }}
          />
          <Button 
            onClick={handleEncode}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={!binaryInput}
          >
            Generate Signals
          </Button>
        </div>

        {error && <Alert severity="error">{error}</Alert>}

        <div className="space-y-8">
          {Object.entries(encodedData).map(([encoding, data]) => (
            <Paper key={encoding} elevation={1} className="p-6">
              {renderChart(encoding, data)}
            </Paper>
          ))}
        </div>
      </div>
    </Paper>
  );
};

export default DigitalSignalEncoder;

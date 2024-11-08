// src/components/SignalDisplay.js
import React from 'react';
import SignalChart from './SignalChart';
import { Typography } from '@mui/material';

function SignalDisplay({ encodedSignal, encodingType, binaryData }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Encoded Signal Output
      </Typography>
      {encodedSignal.length > 0 ? (
        <SignalChart encodedSignal={encodedSignal} encodingType={encodingType} binaryData={binaryData} />
      ) : (
        <Typography variant="body1">No signal to display</Typography>
      )}
    </div>
  );
}

export default SignalDisplay;

import React, { useState } from 'react';
import InputForm from './components/InputForm';
import EncodingButtons from './components/EncodingButtons';
import SignalDisplay from './components/SignalDisplay';
import {
  encodeNRZL,
  encodeNRZI,
  encodeBipolarAMI,
  encodePseudoternary,
  encodeManchester,
  encodeDifferentialManchester
} from './encodingFunctions';
import { Container, Typography } from '@mui/material';

function App() {
  const [binaryData, setBinaryData] = useState('');
  const [encodingType, setEncodingType] = useState(null);
  const [encodedSignal, setEncodedSignal] = useState([]);

  const handleEncode = () => {
    switch (encodingType) {
      case 'NRZ-L':
        setEncodedSignal(encodeNRZL(binaryData));
        break;
      case 'NRZ-I':
        setEncodedSignal(encodeNRZI(binaryData));
        break;
      case 'Bipolar AMI':
        setEncodedSignal(encodeBipolarAMI(binaryData));
        break;
      case 'Pseudoternary':
        setEncodedSignal(encodePseudoternary(binaryData));
        break;
      case 'Manchester':
        setEncodedSignal(encodeManchester(binaryData));
        break;
      case 'Differential Manchester':
        setEncodedSignal(encodeDifferentialManchester(binaryData));
        break;
      default:
        setEncodedSignal([]);
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Digital Signal Encoder
      </Typography>
      <InputForm binaryData={binaryData} setBinaryData={setBinaryData} />
      <EncodingButtons setEncodingType={setEncodingType} handleEncode={handleEncode} />
      <SignalDisplay encodedSignal={encodedSignal} encodingType={encodingType} binaryData={binaryData} />
    </Container>
  );
}

export default App;

// src/components/EncodingButtons.js
import React from 'react';
import { Button, Stack } from '@mui/material';

const encodingTypes = [
  'NRZ-L', 'NRZ-I', 'Bipolar AMI', 'Pseudoternary', 'Manchester', 'Differential Manchester'
];

function EncodingButtons({ setEncodingType, handleEncode }) {
  return (
    <Stack direction="row" spacing={1} justifyContent="center" marginBottom={2}>
      {encodingTypes.map((type) => (
        <Button
          key={type}
          variant="contained"
          onClick={() => {
            setEncodingType(type);
            handleEncode();
          }}
        >
          {type}
        </Button>
      ))}
    </Stack>
  );
}

export default EncodingButtons;

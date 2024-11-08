import React from 'react';
import { Button, Stack } from '@mui/material';

const encodingTypes = [
  'NRZ-L', 'NRZ-I', 'Bipolar AMI', 'Pseudoternary', 'Manchester', 'Differential Manchester'
];

function EncodingButtons({ setEncodingType, handleEncode }) {
  return (
    <Stack direction="row" spacing={2} justifyContent="center" marginBottom={2} flexWrap="wrap">
      {encodingTypes.map((type) => (
        <Button
          key={type}
          variant="contained"
          onClick={() => {
            setEncodingType(type);
            handleEncode();
          }}
          style={{
            minWidth: '120px', // Ensure button is wide enough
            marginBottom: '10px',
            wordWrap: 'break-word', // Allow long words to wrap
          }}
        >
          {type}
        </Button>
      ))}
    </Stack>
  );
}

export default EncodingButtons;

// src/components/InputForm.js
import React from 'react';
import { TextField } from '@mui/material';

function InputForm({ binaryData, setBinaryData }) {
  return (
    <TextField
      fullWidth
      label="Binary Data"
      variant="outlined"
      value={binaryData}
      onChange={(e) => setBinaryData(e.target.value)}
      placeholder="Enter binary data (e.g., 101010)"
      margin="normal"
    />
  );
}

export default InputForm;

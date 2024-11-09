// App.js
import React from 'react';
import { CssBaseline, Container, Typography, Paper, ThemeProvider, createTheme } from '@mui/material';
import DigitalSignalChart from './DigitalSignalChart';
import BinaryEncoder from './BinaryEncoder'; 

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
    },
    primary: {
      main: '#a366ff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom color="primary">
            Digital Signal (NRZI Encoding)
          </Typography>
          <BinaryEncoder />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;

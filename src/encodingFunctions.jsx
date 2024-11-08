// src/encodingFunctions.js

export function encodeNRZL(data) {
    return data.split('').map(bit => (bit === '1' ? 1 : -1));
  }
  
  export function encodeNRZI(data) {
    let lastSignal = -1;
    return data.split('').map(bit => {
      if (bit === '1') lastSignal = -lastSignal;
      return lastSignal;
    });
  }
  
  export function encodeBipolarAMI(data) {
    let polarity = 1;
    return data.split('').map(bit => {
      if (bit === '1') {
        polarity = -polarity;
        return polarity;
      }
      return 0;
    });
  }
  
  export function encodePseudoternary(data) {
    let polarity = 1;
    return data.split('').map(bit => {
      if (bit === '0') {
        polarity = -polarity;
        return polarity;
      }
      return 0;
    });
  }
  
  export function encodeManchester(data) {
    return data.split('').flatMap(bit => (bit === '1' ? [1, -1] : [-1, 1]));
  }
  
  export function encodeDifferentialManchester(data) {
    let lastSignal = 1;
    return data.split('').flatMap(bit => {
      lastSignal = bit === '1' ? -lastSignal : lastSignal;
      return [lastSignal, -lastSignal];
    });
  }
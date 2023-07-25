import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LegacyCOW from './LegacyCOW';
import reportWebVitals from './reportWebVitals';
import PaymentBrick from './PaymentBrick';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <LegacyCOW />
    <PaymentBrick />
  </React.StrictMode>
);

reportWebVitals();

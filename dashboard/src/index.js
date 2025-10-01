import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App'; // Import the new App component
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
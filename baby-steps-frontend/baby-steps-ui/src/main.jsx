/* eslint-disable no-unused-vars */
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const rootElement = document.getElementById('root'); // Get the root element

if (rootElement) {
  const root = createRoot(rootElement); // Create a root
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error('Root element with id "root" not found.');
}
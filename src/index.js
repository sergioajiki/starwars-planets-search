import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PlanetContextProvider from './context/PlanetContextProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <PlanetContextProvider>
      <App />
    </PlanetContextProvider>,

  );

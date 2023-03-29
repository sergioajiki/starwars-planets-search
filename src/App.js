import React, { useContext } from 'react';
// import React, { useEffect, useState } from 'react';
// import PlanetContext from './context/PlanetsContext';
import Table from './components/Table';
// import { getInfoFromAPI } from './services/Apis';
import './App.css';
import { PlanetContext } from './context/PlanetContextProvider';

function App() {
  const { isLoading } = useContext(PlanetContext);
  return (
    <div>
      {
        isLoading
          ? <h1>Loading...</h1>
          : <Table />
      }

    </div>
  );
}

export default App;

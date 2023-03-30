import React, { useContext } from 'react';
import { PlanetContext } from './context/PlanetContextProvider';
// import React, { useEffect, useState } from 'react';
// import PlanetContext from './context/PlanetsContext';
import Table from './components/Table';
import Filters from './components/Filters';
// import { getInfoFromAPI } from './services/Apis';
import './App.css';

function App() {
  const { isLoading } = useContext(PlanetContext);
  return (
    <div className="appContainer">
      <Filters />
      <hr />
      {
        isLoading
          ? <h1>Loading...</h1>
          : (
            <Table />
          )
      }

    </div>
  );
}

export default App;

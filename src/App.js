import React, { useEffect, useState } from 'react';

import PlanetContext from './context/PlanetsContext';
import Table from './components/Table';
import { getInfoFromAPI } from './services/Apis';
import './App.css';

function App() {
  const [planetsList, setPlanetsList] = useState([]);

  const getPlanetsInfos = async () => {
    const response = await getInfoFromAPI();
    response.forEach((element) => {
      delete element.residents;
    });
    // console.log('original', response);
    setPlanetsList(response);
  };

  useEffect(() => {
    getPlanetsInfos();
  }, []);
  console.log(planetsList);
  return (
    <PlanetContext.Provider value={ planetsList }>
      <Table />
    </PlanetContext.Provider>

  );
}

export default App;

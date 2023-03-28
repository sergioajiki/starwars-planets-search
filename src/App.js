import React, { useEffect } from 'react';

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
    console.log('original', response);

  };

  useEffect(() => {
    getPlanetsInfos();
  }, []);
  return (
    <>
    <PlanetContext.Provider value={[]}></PlanetContext.Provider>
      <span>Hello, App! Projeto Star Wars Trybe</span>
      <Table />
      </PlanetContext.Provider>
    </>

  );
}

export default App;

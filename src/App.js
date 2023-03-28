import React, { useEffect, useState } from 'react';

// import PlanetContext from './context/PlanetsContext';
import Table from './components/Table';
import { getInfoFromAPI } from './services/Apis';
import './App.css';

function App() {
  const [planetsList, setPlanetsList] = useState([]);

  const getPlanetsInfos = async () => {
    const response = await getInfoFromAPI();
    console.log(response);
  };

  useEffect(() => {
    getPlanetsInfos();
  }, []);
  return (
    <>
      <span>Hello, App! Projeto Star Wars Trybe</span>
      <Table />
    </>

  );
}

export default App;

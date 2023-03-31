import React from 'react';
import PlanetContextProvider from './context/PlanetContextProvider';
import Table from './components/Table';
import Filters from './components/Filters';
import './App.css';

function App() {
  // const { isLoading } = useContext(PlanetContext);
  return (
    <div className="appContainer">
      <PlanetContextProvider>
        <Filters />
        <hr />
        <Table />
        {/* {
          isLoading
            ? <h1>Loading...</h1>
            : (
              <Table />
            )
        } */}
      </PlanetContextProvider>
    </div>
  );
}

export default App;

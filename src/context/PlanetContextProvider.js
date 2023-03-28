import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getInfoFromAPI } from '../services/Apis';

export const PlanetContext = createContext();

function PlanetContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [planetsList, setPlanetsList] = useState([]);

  const getPlanetsInfos = async () => {
    setIsLoading(true);
    const response = await getInfoFromAPI();
    response.forEach((element) => {
      delete element.residents;
    });
    console.log('original', response);
    setPlanetsList(response);
    setIsLoading(false);
  };

  const values = {
    isLoading,
    planetsList,
  };

  useEffect(() => {
    getPlanetsInfos();
  }, []);
  return (
    <PlanetContext.Provider value={ values }>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetContextProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default PlanetContextProvider;

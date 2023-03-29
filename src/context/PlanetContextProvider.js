import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getInfoFromAPI } from '../services/Apis';

export const PlanetContext = createContext();

function PlanetContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [planetsList, setPlanetsList] = useState([]);
  const [originalPlanetsList, setOriginalPlanetList] = useState([]);
  const [filteredListPlanet, setFilteredListPlanet] = useState(planetsList);
  const [formData, setFormData] = useState({
    inputSearch: '',
    selectColumn: 'population',
    selectOperator: 'maior que',
    selectComparisonValue: 0,
  });

  const getPlanetsInfos = async () => {
    setIsLoading(true);
    const response = await getInfoFromAPI();
    response.forEach((element) => {
      delete element.residents;
    });
    console.log('original', response);
    setPlanetsList(response);
    setOriginalPlanetList(response);
    setFilteredListPlanet(response);
    setIsLoading(false);
  };

  function handleInputChange({ target }) {
    // setFormData(target.value);
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const filterSearchByName = useCallback(() => {
    // console.log(formData);
    const filteredList = planetsList
      .filter((planet) => planet.name.includes(formData.inputSearch));
    setFilteredListPlanet(filteredList);
  }, [formData, planetsList]);

  const filterByNumericValue = () => {
    if (formData.selectOperator === 'maior que') {
      const filteredList = planetsList
        .filter((elem) => parseInt(elem[formData.selectColumn], 10)
       > parseInt(formData.selectComparisonValue, 10));
      console.log(formData.selectColumn, filteredList);
      console.log(typeof (formData.selectComparisonValue));
      setFilteredListPlanet(filteredList);
    }
    if (formData.selectOperator === 'igual a') {
      const filteredList = planetsList
        .filter((elem) => parseInt(elem[formData.selectColumn], 10)
       === parseInt(formData.selectComparisonValue, 10));
      console.log(formData.selectColumn, filteredList);
      console.log(typeof (formData.selectComparisonValue));
      setFilteredListPlanet(filteredList);
    }

    if (formData.selectOperator === 'menor que') {
      const filteredList = planetsList
        .filter((elem) => parseInt(elem[formData.selectColumn], 10)
      < parseInt(formData.selectComparisonValue, 10));
      console.log(formData.selectColumn, filteredList);
      console.log(typeof (formData.selectComparisonValue));
      setFilteredListPlanet(filteredList);
    }
  };

  const values = {
    isLoading,
    planetsList,
    originalPlanetsList,
    handleInputChange,
    formData,
    filteredListPlanet,
    filterByNumericValue,
  };

  useEffect(() => {
    getPlanetsInfos();
  }, []);

  useEffect(() => {
    filterSearchByName();
  }, [filterSearchByName]);

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

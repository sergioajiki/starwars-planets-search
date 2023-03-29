import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getInfoFromAPI } from '../services/Apis';

export const PlanetContext = createContext();

function PlanetContextProvider({ children }) {
  const tagListValues = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [planetsList, setPlanetsList] = useState([]);
  const [originalPlanetsList, setOriginalPlanetList] = useState([]);
  const [filteredListPlanet, setFilteredListPlanet] = useState(originalPlanetsList);
  const [tagList, setTagList] = useState(tagListValues);
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

  const removeTag = () => {
    console.log(formData.selectColumn);
    const newTagList = tagList.filter((tag) => tag !== formData.selectColumn);
    setFormData({
      ...formData,
      selectColumn: `${newTagList[0]}`,
    });
    setTagList(newTagList);
    console.log('depois de atualizar', formData.selectColumn);
    console.log(newTagList[0]);
  };

  const filterSearchByName = useCallback(() => {
    // console.log(formData);
    // const filteredList = filteredListPlanet
    const filteredList = planetsList
      .filter((planet) => planet.name.toLowerCase()
        .includes(formData.inputSearch.toLowerCase()));
    setFilteredListPlanet(filteredList);
  }, [formData, planetsList]);

  const filterByNumericValue = () => {
    if (formData.selectOperator === 'maior que') {
      const filteredList = planetsList
        .filter((elem) => parseInt(elem[formData.selectColumn], 10)
       > parseInt(formData.selectComparisonValue, 10));
      // console.log(formData.selectColumn, filteredList);
      // console.log(typeof (formData.selectComparisonValue));
      setPlanetsList(filteredList);
      removeTag();
    }
    if (formData.selectOperator === 'igual a') {
      const filteredList = planetsList
        .filter((elem) => parseInt(elem[formData.selectColumn], 10)
       === parseInt(formData.selectComparisonValue, 10));
      // console.log(formData.selectColumn, filteredList);
      // console.log(typeof (formData.selectComparisonValue));
      setPlanetsList(filteredList);
      removeTag();
    }

    if (formData.selectOperator === 'menor que') {
      const filteredList = planetsList
        .filter((elem) => parseInt(elem[formData.selectColumn], 10)
      < parseInt(formData.selectComparisonValue, 10));
      // console.log(formData.selectColumn, filteredList);
      // console.log(typeof (formData.selectComparisonValue));
      setPlanetsList(filteredList);
      removeTag();
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
    tagList,
  };

  useEffect(() => {
    getPlanetsInfos();
  }, []);

  useEffect(() => {
    filterSearchByName();
  }, [filterSearchByName]);

  // useEffect(() => {
  //   removeTag();
  // }, [removeTag]);

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

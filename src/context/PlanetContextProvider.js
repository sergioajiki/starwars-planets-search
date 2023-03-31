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
  const [filtersRemoved, setFiltersRemoved] = useState([]);
  const [order, setOrderList] = useState({
    column: 'population',
    sort: 'ASC',
  });
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

    setPlanetsList(response);
    setOriginalPlanetList(response);
    setFilteredListPlanet(response);
    setIsLoading(false);
  };

  function handleInputOrder({ target }) {
    const { name, value } = target;
    setOrderList({
      ...order,
      [name]: value,
    });
  }

  function handleInputChange({ target }) {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const recoverFilter = (selectColumn, previousList) => {
    const newFiltersRemoved = filtersRemoved
      .filter((elem) => elem.selectColumn !== selectColumn);
    setTagList([
      ...tagList,
      selectColumn,
    ]);
    setFilteredListPlanet(previousList);
    setFiltersRemoved(newFiltersRemoved);
  };

  const removeTag = () => {
    const newTagList = tagList.filter((tag) => tag !== formData.selectColumn);
    const infosRemovedFilters = {
      selectColumn: formData.selectColumn,
      selectOperator: formData.selectOperator,
      selectComparisonValue: formData.selectComparisonValue,
      previousList: filteredListPlanet,
    };

    setFormData({
      ...formData,
      selectColumn: newTagList[0],
    });
    setTagList(newTagList);

    setFiltersRemoved([
      ...filtersRemoved,
      infosRemovedFilters,
    ]);
  };

  const resetTags = () => {
    setTagList(tagListValues);
    setFilteredListPlanet(originalPlanetsList);
    setFiltersRemoved([]);
  };

  const filterSearchByName = useCallback(() => {
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
      setPlanetsList(filteredList);
      removeTag();
    }
    if (formData.selectOperator === 'igual a') {
      const filteredList = planetsList
        .filter((elem) => parseInt(elem[formData.selectColumn], 10)
       === parseInt(formData.selectComparisonValue, 10));
      setPlanetsList(filteredList);
      removeTag();
    }
    if (formData.selectOperator === 'menor que') {
      const filteredList = planetsList
        .filter((elem) => parseInt(elem[formData.selectColumn], 10)
      < parseInt(formData.selectComparisonValue, 10));
      setPlanetsList(filteredList);
      removeTag();
    }
  };

  const sortPlanetList = useCallback((column, sort) => {
    const MINUSONE = -1;
    if (sort === 'ASC') {
      const sortedList = filteredListPlanet
        .sort((a, b) => {
          if (b[column] === 'unknown') return MINUSONE;
          return parseInt(a[column], 10) - parseInt(b[column], 10);
        });
      setFilteredListPlanet(sortedList);
      setPlanetsList(sortedList);
    }

    if (sort === 'DESC') {
      const sortedList = filteredListPlanet
        .sort((a, b) => {
          if (b[column] === 'unknown') return MINUSONE;
          return parseInt(b[column], 10) - parseInt(a[column], 10);
        });
      setFilteredListPlanet(sortedList);
      setPlanetsList(sortedList);
    }
  }, [filteredListPlanet]);

  useEffect(() => {
    getPlanetsInfos();
  }, []);

  useEffect(() => {
    filterSearchByName();
  }, [filterSearchByName]);

  useEffect(() => {
    sortPlanetList();
  }, [sortPlanetList]);

  const values = {
    isLoading,
    planetsList,
    originalPlanetsList,
    handleInputChange,
    handleInputOrder,
    formData,
    filteredListPlanet,
    filterByNumericValue,
    tagList,
    filtersRemoved,
    recoverFilter,
    resetTags,
    tagListValues,
    order,
    sortPlanetList,
  };

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

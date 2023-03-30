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
    console.log('original', response);
    setPlanetsList(response);
    setOriginalPlanetList(response);
    setFilteredListPlanet(response);
    setIsLoading(false);
  };

  function handleInputOrder({ target }) {
    // setFormData(target.value);
    const { name, value } = target;
    setOrderList({
      ...order,
      [name]: value,
    });
  }

  function handleInputChange({ target }) {
    // setFormData(target.value);
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const recoverFilter = (selectColumn, previousList) => {
    console.log(previousList);
    console.log(filtersRemoved);
    const newFiltersRemoved = filtersRemoved
      .filter((elem) => elem.selectColumn !== selectColumn);
    setTagList([
      ...tagList,
      selectColumn,
    ]);
    setFilteredListPlanet(previousList);

    console.log(newFiltersRemoved);
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

  const sortPlanetList = useCallback(() => {
    console.log('vai ordenar', filteredListPlanet);
    console.log(order.column);
    if (order.sort === 'ASC') {
      const sortedList = filteredListPlanet
        .sort((a, b) => parseInt(a[order.column], 10) - parseInt(b[order.column], 10));
      console.log(sortedList);
      setFilteredListPlanet(sortedList);
    }
    if (order.sort === 'DESC') {
      const sortedList = filteredListPlanet
        .sort((a, b) => parseInt(b[order.column], 10) - parseInt(a[order.column], 10));
      console.log(sortedList);
      setFilteredListPlanet(sortedList);
    }
  }, [filteredListPlanet, order.column, order.sort]);
  // }, [filteredListPlanet, order.column, order.sort]);

  useEffect(() => {
    getPlanetsInfos();
  }, []);

  useEffect(() => {
    filterSearchByName();
  });

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

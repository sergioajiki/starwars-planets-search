import React, { useContext } from 'react';
import { PlanetContext } from '../context/PlanetContextProvider';

function Filters() {
  const {
    // planetsList,
    // filteredListPlanet,
    // originalPlanetsList,
    formData,
    handleInputChange,
    filterByNumericValue,
    tagList,
    filtersRemoved,
    recoverFilter,
    resetTags,
    tagListValues,
    // selectColumn,
    // selectOperator,
    // selectComparisonValue,
  } = useContext(PlanetContext);
  return (
    <div>
      Filters
      <input
        data-testid="name-filter"
        placeholder="Type your serach"
        name="inputSearch"
        value={ formData.inputSearch }
        onChange={ handleInputChange }
      />
      <br />
      <select
        data-testid="column-filter"
        name="selectColumn"
        value={ formData.selectColumn }
        onChange={ handleInputChange }
      >
        {
          tagList.map((tag, index) => (
            <option
              key={ index }
              value={ [tag] }
            >
              {[tag]}
            </option>
          ))
        }
      </select>
      <select
        data-testid="comparison-filter"
        name="selectOperator"
        value={ formData.selectOperator }
        onChange={ handleInputChange }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="selectComparisonValue"
        value={ formData.selectComparisonValue }
        onChange={ handleInputChange }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ filterByNumericValue }
      >
        Filtrar
      </button>
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ resetTags }
      >
        Remover todas filtragens
      </button>
      <select
        data-testid="column-sort"
        name="orderColumn"
        value={ formData.orderColumn }
        onChange={ handleInputChange }
      >
        {
          tagListValues.map((tag, index) => (
            <option
              key={ index }
              value={ [tag] }
            >
              {[tag]}
            </option>
          ))
        }
      </select>

      <label htmlFor="ascendente">
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          id="ascendente"
          name="order"
          value="ASC"
        />
        Ascendente
      </label>
      <label htmlFor="descendente">
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          id="descendente"
          name="order"
          value="DESC"
        />
        Descendente
      </label>
      <button
        data-testid="column-sort-button"
      >
        Ordenar
      </button>
      <br />
      {
        filtersRemoved.length === 0
          ? <h3>No filter</h3>
          : filtersRemoved.map((element, index) => (

            <span
              key={ index }
              data-testid="filter"
            >
              {element.selectColumn}
              {element.selectOperator}
              {element.selectComparisonValue}

              <button
                type="button"
                onClick={
                  () => recoverFilter(element.selectColumn, element.previousList)
                }
              >
                X
              </button>
              <br />
            </span>
          ))
      }

    </div>
  );
}

export default Filters;

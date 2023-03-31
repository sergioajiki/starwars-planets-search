import React, { useContext } from 'react';
import { PlanetContext } from '../context/PlanetContextProvider';
import '../styles/Filters.css';

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
    handleInputOrder,
    order,
    sortPlanetList,
    // selectColumn,
    // selectOperator,
    // selectComparisonValue,
  } = useContext(PlanetContext);
  return (
    <div>
      <input
        data-testid="name-filter"
        placeholder="Type your search"
        name="inputSearch"
        value={ formData.inputSearch }
        onChange={ handleInputChange }
        className="inputSearch"
      />
      <span className="numericFilter">
        <label htmlFor="selectColumn">
          Coluna
          <select
            data-testid="column-filter"
            name="selectColumn"
            value={ formData.selectColumn }
            onChange={ handleInputChange }
            id="selectColumn"
          >
            {
              tagList.map((tag, index) => (
                <option
                  key={ index }
                  value={ [tag] }
                  data-testid="column-tag-num"
                >
                  {[tag]}
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="selectOperator">
          Operador
          <select
            data-testid="comparison-filter"
            name="selectOperator"
            value={ formData.selectOperator }
            onChange={ handleInputChange }
            id="selectOperator"
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <input
          type="number"
          data-testid="value-filter"
          name="selectComparisonValue"
          value={ formData.selectComparisonValue }
          onChange={ handleInputChange }
          className="valor"
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
      </span>
      <span className="orderFilter">
        <select
          data-testid="column-sort"
          name="column"
          value={ order.column }
          onChange={ handleInputOrder }
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
        <span className="upDown">
          <label htmlFor="ascendente" className="ascendente">
            <input
              data-testid="column-sort-input-asc"
              type="radio"
              id="ascendente"
              name="sort"
              value="ASC"
              onChange={ handleInputOrder }
              defaultChecked
            />
            Ascendente
          </label>
          <label htmlFor="descendente" className="descendente">
            <input
              data-testid="column-sort-input-desc"
              type="radio"
              id="descendente"
              name="sort"
              value="DESC"
              onChange={ handleInputOrder }
            />
            Descendente
          </label>
        </span>
        <button
          data-testid="column-sort-button"
          onClick={ () => sortPlanetList(order.column, order.sort) }
        >
          Ordenar
        </button>
      </span>
      {
        filtersRemoved.length === 0
          ? <h3>No filter</h3>
          : filtersRemoved.map((element, index) => (

            <span
              key={ index }
              data-testid="filter"
            >
              {element.selectColumn}
              {' '}
              {element.selectOperator}
              {' '}
              {element.selectComparisonValue}
              {' '}
              <button
                type="button"
                onClick={
                  () => recoverFilter(element.selectColumn, element.previousList)
                }
                className="killButton"
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

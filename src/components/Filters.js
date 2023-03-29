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
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
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
    </div>
  );
}

export default Filters;

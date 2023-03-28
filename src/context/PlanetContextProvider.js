import React from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetsContext';

function PlanetContextProvider({ children }) {
  return (
    <PlanetContext.Provider>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetContextProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default PlanetContextProvider;

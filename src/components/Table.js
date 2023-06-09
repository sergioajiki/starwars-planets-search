import React, { useContext } from 'react';
import { PlanetContext } from '../context/PlanetContextProvider';
import '../styles/Table.css';

function Table() {
  const {
    filteredListPlanet,
  } = useContext(PlanetContext);

  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <th className="colName">Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th className="colFimls">Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredListPlanet.map((planet, index) => (
              <tr
                key={ index }
              >
                <td
                  data-testid="planet-name"
                >
                  {planet.name}
                </td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>

  );
}

export default Table;

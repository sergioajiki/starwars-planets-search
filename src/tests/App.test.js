import React from 'react';
import { 
  getNodeText,
  render,
  screen,
  // waitFor,
  // waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlanetContextProvider from '../context/PlanetContextProvider';
import { planetsApiSim } from './Mocks/planetApi';
// import { act } from 'react-dom/test-utils';
import App from '../App';

// jest.setTimeout(10000);
// test('', () => {});
// await waitFor( async () => {}, { timeout: 5000 });
// beforeEach(() => {})
// act (() => {})

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(planetsApiSim)
  }) 
  render(<App />), {wrapper: PlanetContextProvider};  
// render(
//   <PlanetContextProvider>
//      <App />
//   </PlanetContextProvider>
//  ) 
// act (() => {
//  render(<App />), {wrapper: PlanetContextProvider};   
// }) 
// await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))
})

afterEach(() => {
  jest.resetAllMocks();
})
 
describe('testa a renderização do componente Table', () => {
  test('verifica se as colunas são renderizadas corretamente', () => {
    const tableHeader = screen.getAllByRole('columnheader').map(getNodeText);
    // console.log(tableHeader); 
    expect(tableHeader).toHaveLength(13)

    tableHeader.forEach((title) => {
      const titleTableHeader = screen.getByRole(
        'columnheader',
        { name: `${title}` },
      );
      expect(titleTableHeader).toBeInTheDocument();
    });
  });

  test('verifica se a API é chamada', async () => {    
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
  });
});

describe('testa a renderização do componente Filter', () => {
  test('verifica se os seletores de filtro são renderizados', () => {
    const inputSearch = screen.getByTestId('name-filter');
    expect(inputSearch).toBeInTheDocument();
    const columnFilter = screen.getByTestId('column-filter');
    expect(columnFilter).toBeInTheDocument();
    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(comparisonFilter).toBeInTheDocument();
    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
    const buttonRemoveFilters = screen.getByTestId('button-remove-filters');
    expect(buttonRemoveFilters).toBeInTheDocument();
    const columnSort = screen.getByTestId('column-sort');
    expect(columnSort).toBeInTheDocument();
    const columnSortInputAsc = screen.getByTestId('column-sort-input-asc');
    expect(columnSortInputAsc).toBeInTheDocument();
    const columnSortInputDesc = screen.getByTestId('column-sort-input-desc');
    expect(columnSortInputDesc).toBeInTheDocument();
    const columnSortButton = screen.getByTestId('column-sort-button');
    expect(columnSortButton).toBeInTheDocument();
  });

  test('Verifica os seletores de coluna filtros numericos', () => {    
    const optionsColumnTagNum = screen.getAllByTestId('column-tag-num').map(getNodeText);
    // console.log(optionsColumnTagNum);
    expect(optionsColumnTagNum).toHaveLength(5);
    expect(optionsColumnTagNum[0]).toBe('population')

    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.click(buttonFilter)
    userEvent.click(buttonFilter) 

    const newOptionsColumnTagNum = screen.getAllByTestId('column-tag-num').map(getNodeText);
    expect(newOptionsColumnTagNum).toHaveLength(3);
    expect(newOptionsColumnTagNum[0]).toBe('diameter')

    const appliedFilter = screen.getAllByTestId('filter').map(getNodeText);
    expect(appliedFilter).toHaveLength(2)

    const killButton = screen.getAllByRole('button', {name: 'X'});
    // console.log(killButton);
    expect(killButton).toHaveLength(2);

    userEvent.click(killButton[1]);
    const recoveryOptionsColumnTagNum = screen.getAllByTestId('column-tag-num').map(getNodeText);
    expect(recoveryOptionsColumnTagNum).toHaveLength(4);
  
    const buttonRemoveFilters = screen.getByTestId('button-remove-filters');
    userEvent.click(buttonRemoveFilters);

    const resetOptionsColumnTagNum = screen.getAllByTestId('column-tag-num').map(getNodeText);
    expect(resetOptionsColumnTagNum).toHaveLength(5);
    expect(resetOptionsColumnTagNum[0]).toBe('population')    
  });
});

describe('testa filtragem da tabela', () => {
  test('testa busca por nome', async () => {
    // await waitFor( async() => {
    const tableHeaderName =  await screen.findAllByTestId('planet-name');
    // console.log(tableHeaderName.length);
    expect(tableHeaderName).toHaveLength(10);
    const inputSearch = screen.getByTestId('name-filter');
    userEvent.type(inputSearch, 'oo')

    const newTableHeaderName = await screen.findAllByTestId('planet-name');
    expect(newTableHeaderName).toHaveLength(2);     
    // }, { timeout: 2000 });
  });  

  test('testa busca por nome 2', async() => {
    // await waitFor( async () => {
    const inputSearch = screen.getByTestId('name-filter');
    userEvent.type(inputSearch, 'Tatooine');
    const planetTatooine = await screen.findByText('Tatooine');
    expect(planetTatooine).toBeInTheDocument();
    // }, { timeout: 2000 });
  });

  test('testa filtro numerico "maior que" selecionando diameter', async () => {
    // await waitFor( async () => {
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
  
    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '15000'); 
    userEvent.click(buttonFilter);
  
    const planetBespin = await screen.findByText('Bespin');
    expect(planetBespin).toBeInTheDocument();
    const TableHeaderName = await screen.findAllByTestId('planet-name');
    expect(TableHeaderName).toHaveLength(2);     
    // }, { timeout: 2000 });
  });

  test('teste filtro numerico "igual a" selecionando orbital_period', async () => {
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '402'); 
    userEvent.click(buttonFilter);

    const planetBespin = await screen.findByText('Endor');
    expect(planetBespin).toBeInTheDocument();
    const TableHeaderName = await screen.findAllByTestId('planet-name');
    expect(TableHeaderName).toHaveLength(1);  
  });

  test('teste filtro numerico "menor que" selecionando surface_water', async () => {
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'surface_water');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '12'); 
    userEvent.click(buttonFilter);

    const TableHeaderName = await screen.findAllByTestId('planet-name');
    expect(TableHeaderName).toHaveLength(5);  
  });

  test('testa a classificação', async () => {
    // await waitFor( async () => {
    const columnSortButton = screen.getByTestId('column-sort-button');
    const buttonRadioAsc = screen.getByTestId('column-sort-input-asc');
    const buttonRadioDesc = screen.getByTestId('column-sort-input-desc');
    userEvent.click(buttonRadioDesc);
    userEvent.click(columnSortButton);
    const DescTableHeaderName = await screen.findAllByTestId('planet-name');
    expect(DescTableHeaderName).toHaveLength(10);
    userEvent.click(buttonRadioAsc);
    userEvent.click(columnSortButton);
    const AscTableHeaderName = await screen.findAllByTestId('planet-name');
    expect(AscTableHeaderName).toHaveLength(10);
    // }, { timeout: 2000 });
  });
});
  
// test('', () => {});

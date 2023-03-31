import React from 'react';
import { getNodeText, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

// test('', () => {});

describe('testa o componente Table', () => {
  test('verifica se as colunas são renderizadas corretamente', () => {
    render(<App />);

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
});

describe('testa componente Filter', () => {
  test('verifica se os seletores de filtro são renderizados', () => {
    render(<App />);
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
    render(<App />);
    const optionsColumnTagNum = screen.getAllByTestId('column-tag-num').map(getNodeText);
    console.log(optionsColumnTagNum);
    expect(optionsColumnTagNum).toHaveLength(5);
    expect(optionsColumnTagNum[0]).toBe('population')

    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.click(buttonFilter)
    
    const newOptionsColumnTagNum = screen.getAllByTestId('column-tag-num').map(getNodeText);
    expect(newOptionsColumnTagNum).toHaveLength(4);
    expect(newOptionsColumnTagNum[0]).toBe('orbital_period')

  });
});





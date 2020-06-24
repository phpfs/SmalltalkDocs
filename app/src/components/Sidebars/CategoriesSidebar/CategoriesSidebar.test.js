import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import CategoriesSidebar from './CategoriesSidebar';
import { cleanUpContainer, prepareContainer } from '../../../test-utils/test-helper';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = prepareContainer(container);
});

afterEach(() => {
  // cleanup on exiting
  container = cleanUpContainer(container);
});

describe('CategoriesSidebar', () => {
  it('should displayed buttons with fetched categories', async () => {
    const isOpen = true;
    const toggleIsOpen = () => {};

    const sampleCategoriesResponse = {
      categories: ['SmapratCore', 'SmapratAPI', 'SmapratApp'],
      count: 3
    };

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => sampleCategoriesResponse
      })
    );

    await act(async () => {
      render(
        <Router>
          <CategoriesSidebar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
        </Router>,
        container
      );
    });

    expect(container.querySelector('#openSidebarBox')).toBeInTheDocument();

    global.fetch.mockRestore();
  });
});
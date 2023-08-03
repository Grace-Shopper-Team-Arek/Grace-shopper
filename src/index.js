import React from 'react';
import { createRoot } from 'react-dom/client';
import Root from '../app/components/root';
import { Provider } from 'react-redux';
import store from '../app/store';
import { HashRouter } from 'react-router-dom';

const root = createRoot(document.querySelector('#root'));

root.render(
  <Provider store={ store }>
    <HashRouter>
      <Root />
    </HashRouter>
  </Provider>
);
